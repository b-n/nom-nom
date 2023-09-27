use std::error::Error;
use std::fs::write;
use std::path::PathBuf;

use super::{Options, PipelineTask, Task};
use crate::{AssetKey, AssetValue};

#[derive(Hash)]
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
        let target = options.target_root.join(&self.target);
        Self::ensure_dir(&target)?;

        // Restore from cache if possible
        if self.restore_from_cache(&target, options)? {
            return Ok(());
        }

        write(&target, &self.source)?;

        // Write to cache if using cache
        if options.use_cache {
            let cache_path = self.cache_path(options);
            Self::ensure_dir(&cache_path)?;
            write(cache_path, &self.source)?;
        }
        Ok(())
    }
}

impl From<WriteBytes> for Task {
    fn from(input: WriteBytes) -> Self {
        Task::WriteBytes(input)
    }
}
