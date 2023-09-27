use std::path::{Path, PathBuf};

const IMAGE_ROOT: &str = "images";

/// Options for the Pipeline.
///
/// Requires a user provided `target_root`. `image_root` defaults to `images/`.
#[derive(Default)]
pub struct Options {
    pub target_root: PathBuf,
    pub image_root: PathBuf,
}

impl Options {
    #[must_use]
    pub fn new(target_root: &Path) -> Self {
        let mut image_root = PathBuf::new();
        image_root.push(IMAGE_ROOT);

        Self {
            target_root: target_root.to_owned(),
            image_root,
        }
    }

    pub fn with_image_root(&mut self, image_root: &Path) {
        self.image_root = image_root.to_owned();
    }
}
