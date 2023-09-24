use std::error::Error;

use super::{Options, PipelineTask};

mod copy_file;
mod write_bytes;

pub use copy_file::CopyFile;
pub use write_bytes::WriteBytes;

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
