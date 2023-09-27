use image::io::Reader as ImageReader;
use image::GenericImageView;
use std::error::Error;
use std::path::PathBuf;

use super::{Options, PipelineTask, Task};
use crate::{AssetKey, AssetValue};

/// The options for resizing the image.
///
/// - `width` - the desired width
/// - `height` - the desired height
/// - `keep_aspect_ratio`* - do not squash the pixels
/// - `minimum_dimensions`* - ensures width and height are the minimum
///   dimensions when `keep_aspect_ratio` is set to `true`.
///
/// \* These options may change the output width/height.
#[derive(Clone, Debug, Hash)]
pub struct ResizeOptions {
    pub width: u32,
    pub height: u32,
    pub keep_aspect_ratio: bool,
    pub minimum_dimensions: bool,
}

#[derive(Clone, Debug, Hash)]
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

    #[allow(clippy::cast_possible_truncation, clippy::cast_sign_loss)]
    fn perform(&self, options: &Options) -> Result<(), Box<dyn Error>> {
        // Determine target path and ensure it exists
        let mut target = options.target_root.join(&options.image_root);
        target.push(&self.target);
        Self::ensure_dir(&target)?;

        // Restore from cache if possible
        if self.restore_from_cache(&target, options)? {
            return Ok(());
        }

        // Read the image and perform resizing
        let image_reader = ImageReader::open(&self.source)?;
        let format = image_reader
            .format()
            .expect("Could not determine image format");
        let image = image_reader.decode()?;

        let (s_width, s_height) = image.dimensions();

        let t_width = self.options.width;
        let t_height = self.options.height;

        let resized_image = if self.options.keep_aspect_ratio {
            let (width, height) = if self.options.minimum_dimensions {
                // target: 100, 100 (1)
                // given  50, 200 => 100, 400  (50/200 = .25)
                //      s_ratio < t_ratio
                //      width: t
                //      height: t / s_ratio
                // given 200, 200 => 100, 100  (200/200 = 1)
                //      s_ratio = t_ratio
                //      width: t
                //      height: t
                // given 200,  50 => 400, 100  (400,100 = 4)
                //      s_ratio > t_ratio
                //      width: t * t_ratio
                //      height: t
                let s_aspect_ratio = f64::from(s_width) / f64::from(s_height);
                let t_aspect_ratio = f64::from(t_width) / f64::from(t_height);
                let adjust_ratio = s_aspect_ratio / t_aspect_ratio;

                if s_aspect_ratio < t_aspect_ratio {
                    (t_width, (f64::from(t_height) / adjust_ratio) as u32)
                } else {
                    ((f64::from(t_width) * adjust_ratio) as u32, t_height)
                }
            } else {
                (t_width, t_height)
            };

            image.thumbnail(width, height)
        } else {
            image.thumbnail_exact(t_width, t_height)
        };

        // Save the resized image
        println!("Saving: {}", target.display());
        resized_image.save_with_format(&target, format)?;

        // Save the image to the cache if we are using a cache
        if options.use_cache {
            let cache_path = self.cache_path(options);
            Self::ensure_dir(&cache_path)?;
            resized_image.save_with_format(&cache_path, format)?;
        }

        Ok(())
    }
}

impl From<ResizeImage> for Task {
    fn from(input: ResizeImage) -> Self {
        Task::ResizeImage(input)
    }
}
