use std::error::Error;
use std::fs;
use std::path::PathBuf;

use super::{Options, PipelineTask, Task};

pub struct WriteBytes {
    pub source: Vec<u8>,
    pub target: PathBuf,
}

impl PipelineTask for WriteBytes {
    fn perform(&self, options: &Options) -> Result<(), Box<dyn Error>> {
        let output_path = options.target_root.join(&self.target);

        Self::ensure_dir(&output_path)?;

        fs::write(&output_path, &self.source)?;

        Ok(())
    }
}

impl From<WriteBytes> for Task {
    fn from(input: WriteBytes) -> Self {
        Task::WriteBytes(input)
    }
}
