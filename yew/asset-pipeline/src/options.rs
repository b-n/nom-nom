use std::path::PathBuf;

#[derive(Default)]
pub struct Options {
    pub target_root: PathBuf,
}

impl Options {
    #[must_use]
    pub fn new(target_root: PathBuf) -> Self {
        Self { target_root }
    }
}
