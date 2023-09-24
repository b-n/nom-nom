use std::error::Error;
use std::fs;
use std::path::PathBuf;

use super::{Options, PipelineTask, Task};
use crate::{AssetKey, AssetValue};

pub struct CopyFile {
    pub source: PathBuf,
    pub target: PathBuf,
}

impl PipelineTask for CopyFile {
    fn asset_key(&self) -> AssetKey {
        let source = &self.source;
        source.into()
    }

    fn asset_value(&self, _options: &Options) -> AssetValue {
        PathBuf::from("/").join(&self.target).into()
    }

    fn perform(&self, options: &Options) -> Result<(), Box<dyn Error>> {
        let target = options.target_root.join(&self.target);

        Self::ensure_dir(&target)?;

        fs::copy(&self.source, &target)?;

        Ok(())
    }
}

impl From<CopyFile> for Task {
    fn from(input: CopyFile) -> Self {
        Task::CopyFile(input)
    }
}
