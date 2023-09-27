use std::error::Error;

use super::{Options, PipelineTask};
use crate::{AssetKey, AssetValue};

mod copy_file;
mod resize_image;
mod write_bytes;

pub use copy_file::CopyFile;
pub use resize_image::{ResizeImage, ResizeOptions};
pub use write_bytes::WriteBytes;

pub enum Task {
    CopyFile(CopyFile),
    WriteBytes(WriteBytes),
    ResizeImage(ResizeImage),
}

impl PipelineTask for Task {
    fn asset_key(&self) -> AssetKey {
        match self {
            Self::CopyFile(inner) => inner.asset_key(),
            Self::WriteBytes(inner) => inner.asset_key(),
            Self::ResizeImage(inner) => inner.asset_key(),
        }
    }

    fn asset_value(&self, options: &Options) -> AssetValue {
        match self {
            Self::CopyFile(inner) => inner.asset_value(options),
            Self::WriteBytes(inner) => inner.asset_value(options),
            Self::ResizeImage(inner) => inner.asset_value(options),
        }
    }

    fn perform(&self, options: &Options) -> Result<(), Box<dyn Error>> {
        match self {
            Self::CopyFile(inner) => inner.perform(options),
            Self::WriteBytes(inner) => inner.perform(options),
            Self::ResizeImage(inner) => inner.perform(options),
        }
    }
}
