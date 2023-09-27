use std::error::Error;
use std::fs;
use std::path::PathBuf;

use super::{Options, PipelineTask, Task};
use crate::{AssetKey, AssetValue};

pub struct WriteBytes {
    pub id: String,
    pub source: Vec<u8>,
    pub target: PathBuf,
}

impl PipelineTask for WriteBytes {
    fn asset_key(&self) -> AssetKey {
        (&self.id).into()
    }

    fn asset_value(&self, _options: &Options) -> AssetValue {
        PathBuf::from("/").join(&self.target).into()
    }

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
