use std::error::Error;
use std::path::PathBuf;

use super::{Options, PipelineTask, Task};

pub struct CopyFile {
    pub source: PathBuf,
    pub target: PathBuf,
}

impl PipelineTask for CopyFile {
    fn perform(&self, _options: &Options) -> Result<(), Box<dyn Error>> {
        todo!()
    }
}

impl From<CopyFile> for Task {
    fn from(input: CopyFile) -> Self {
        Task::CopyFile(input)
    }
}
