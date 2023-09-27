use image::io::Reader as ImageReader;
use std::error::Error;
use std::path::PathBuf;

use super::{Options, PipelineTask, Task};
use crate::{AssetKey, AssetValue};

#[derive(Clone, Debug)]
pub struct ResizeOptions {
    pub width: u32,
    pub height: u32,
    pub keep_aspect_ratio: bool,
}

#[derive(Clone, Debug)]
pub struct ResizeImage {
    pub source: PathBuf,
    pub options: ResizeOptions,
    pub target: PathBuf,
}

impl PipelineTask for ResizeImage {
    fn asset_key(&self) -> AssetKey {
        (&self.source).into()
    }

    fn asset_value(&self, options: &Options) -> AssetValue {
        PathBuf::from("/")
            .join(&options.image_root)
            .join(&self.target)
            .into()
    }

    fn perform(&self, options: &Options) -> Result<(), Box<dyn Error>> {
        let mut target = options.target_root.join(&options.image_root);
        target.push(&self.target);

        Self::ensure_dir(&target)?;

        let image = ImageReader::open(&self.source)?.decode()?;

        let new_width = self.options.width;
        let new_height = self.options.height;

        let resized_image = if self.options.keep_aspect_ratio {
            image.thumbnail(new_width, new_height)
        } else {
            image.thumbnail_exact(new_width, new_height)
        };

        println!("Saving: {}", target.display());
        resized_image.save(target)?;

        Ok(())
    }
}

impl From<ResizeImage> for Task {
    fn from(input: ResizeImage) -> Self {
        Task::ResizeImage(input)
    }
}
