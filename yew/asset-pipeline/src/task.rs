use std::error::Error;
use std::fs;
use std::path::PathBuf;

use super::{Options, PipelineTask};

pub enum Task {
    CopyFile(CopyFile),
    WriteBytes(WriteBytes),
}

impl PipelineTask for Task {
    fn perform(&self, options: &Options) -> Result<(), Box<dyn Error>> {
        match self {
            Self::CopyFile(inner) => inner.perform(options),
            Self::WriteBytes(inner) => inner.perform(options),
        }
    }
}

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

pub struct WriteBytes {
    pub source: Vec<u8>,
    pub target: PathBuf,
}

impl PipelineTask for WriteBytes {
    fn perform(&self, options: &Options) -> Result<(), Box<dyn Error>> {
        let output_file = options.target_root.join(&self.target);

        let output_dir = output_file.clone();
        let output_dir = output_dir.parent().expect("Should be a directory");

        if !output_dir.exists() {
            fs::create_dir_all(output_dir)?;
        }

        fs::write(output_file, &self.source)?;

        Ok(())
    }
}

impl From<WriteBytes> for Task {
    fn from(input: WriteBytes) -> Self {
        Task::WriteBytes(input)
    }
}
