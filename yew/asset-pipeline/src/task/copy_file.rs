use std::error::Error;
use std::fs;
use std::path::PathBuf;

use super::{Options, PipelineTask, Task};

pub struct CopyFile {
    pub source: PathBuf,
    pub target: PathBuf,
}

impl PipelineTask for CopyFile {
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
