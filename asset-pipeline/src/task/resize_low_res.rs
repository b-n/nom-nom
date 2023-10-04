use base64::{engine::general_purpose, Engine};
use image::io::Reader as ImageReader;
use std::error::Error;
use std::hash::{Hash, Hasher};
use std::path::{Path, PathBuf};

use super::{Options, PipelineTask, Task};
use crate::{AssetKey, AssetValue};

#[derive(Clone, Debug)]
pub struct ResizeLowRes {
    pub width: u32,
    pub height: u32,
    pub source: PathBuf,
    pub target: String,
}

impl Hash for ResizeLowRes {
    fn hash<T: Hasher>(&self, state: &mut T) {
        // We do not need to hash target since that changes
        self.width.hash(state);
        self.height.hash(state);
        self.source.hash(state);
    }
}

impl ResizeLowRes {
    #[must_use]
    pub fn new(path: &Path, width: u32, height: u32) -> Self {
        ResizeLowRes {
            width,
            height,
            source: path.to_owned(),
            target: String::new(),
        }
    }
}

impl PipelineTask for ResizeLowRes {
    fn asset_key(&self) -> AssetKey {
        format!("{}-low-res", &self.source.display()).into()
    }

    fn asset_value(&self, _options: &Options) -> AssetValue {
        self.target.clone().into()
    }

    #[allow(clippy::cast_possible_truncation, clippy::cast_sign_loss)]
    fn perform(&mut self, options: &Options) -> Result<(), Box<dyn Error>> {
        // Restore from cache if possible
        let cache_path = self.cache_path(options);
        if options.use_cache && cache_path.exists() {
            println!("Using cache: {}", self.source.display());
            self.target = std::fs::read_to_string(&cache_path)?;
            return Ok(());
        }

        // Read the image and perform resizing
        let image_reader = ImageReader::open(&self.source)?;
        let format = image_reader
            .format()
            .expect("Could not determine image format");
        let image = image_reader.decode()?;

        println!("Resizing LowRes: {}", self.source.display());
        // The actual work resizing
        let image = image
            .resize(
                self.width,
                self.height,
                image::imageops::FilterType::Nearest,
            )
            .blur(0.5f32);

        // render the image to a byte buffer
        let mut buf: Vec<u8> = vec![];
        image
            .write_to(&mut std::io::Cursor::new(&mut buf), format)
            .unwrap();

        // Encode as base64 so it can be rendered in an image data url
        let base64_data = general_purpose::STANDARD.encode(buf);
        let target = format!("data:{};base64,{}", format.to_mime_type(), base64_data);

        self.target = target.clone();

        // Save the image to the cache if we are using a cache
        if options.use_cache {
            let cache_path = self.cache_path(options);
            Self::ensure_dir(&cache_path)?;
            std::fs::write(cache_path, &target)?;
        }

        Ok(())
    }
}

impl From<ResizeLowRes> for Task {
    fn from(input: ResizeLowRes) -> Self {
        Task::ResizeLowRes(input)
    }
}
