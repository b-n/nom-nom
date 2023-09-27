use std::collections::hash_map::DefaultHasher;
use std::error::Error;
use std::fs;
use std::hash::Hash;
use std::hash::Hasher;
use std::path::{Path, PathBuf};

use crate::{AssetKey, AssetValue, Options, Task};

/// Implemented by Processors in order to generate Tasks for the `Pipeline`.
///
/// Requires the impementation of the following:
/// - `paths()` - Used to extract the locations which will be searched.
/// - `parse()` - Called for each entry found from traversing `paths()`. This
///   gives the opportunity to set internal state in the processor for later
///   extraction of `PipelineTask`s.
/// - `fn tasks(&self) -> Result<Vec<PipelineTask>, Box<dyn Error>>` - Used to
///   take the internal state and generate `PipelineTask` which can be executed
///   in parallel.
pub trait Processor {
    /// Defines the array of paths that this processor is set to scan
    fn paths(&self) -> &Vec<PathBuf>;

    /// A function which can be used to filter out certain `PathBuf`s from this
    /// processor. This can be used when the paths from `paths()` contains files
    /// that should not be processed by this processor as the pipeline recurses
    /// all directories.
    fn filter(&self, _path: &Path) -> bool {
        true
    }

    /// A hook to prior to the parse method. If not provided, `before_parse`
    /// does nothing.
    fn before_parse(&mut self) {}

    /// The core functionality of the processor should be here. Any sort of
    /// pre-validation and/or additional processing can take place here.
    ///
    /// # Errors
    ///
    /// Any conforming `std::error::Error`
    fn parse(&mut self, path: &Path) -> Result<(), Box<dyn Error>>;

    /// A hook to prior to the parse method. If not provided, `after_parse`
    /// does nothing.
    fn after_parse(&mut self) {}

    /// Called at the end of the processor chain and should produce an array of
    /// tasks for the pipeline to execute. The tasks should be able to be
    /// executed in any order.
    ///
    /// # Examples
    ///
    /// ```
    /// use pipeline::{Processor, PipelineTask, tasks};
    ///
    /// pub struct MyProcessor {
    ///     paths: Vec<PathBuf>
    /// }
    ///
    /// impl Processor for MyProcessor {
    ///     fn tasks(&self) -> Result<Vec<PipelineTask>, Box<dyn Error>> {
    ///         self.paths
    ///           .iter()
    ///           .map(|p| tasks::CopyFile(p.clone()).into())
    ///           .collect()
    ///     }
    /// }
    /// ```
    ///
    /// # Errors
    ///
    /// Any conforming `std::error::Error`
    fn tasks(&self) -> Result<Vec<Task>, Box<dyn Error>>;
}

/// A task which can be performed by the `Pipeline` in parallel.
pub trait PipelineTask: Hash {
    /// The key to reference this asset by.
    fn asset_key(&self) -> AssetKey;

    /// The value to refernce this asset by.
    fn asset_value(&self, options: &Options) -> AssetValue;

    /// The work to be done on the task. This is called from `Pipeline`.
    ///
    /// The result `PipelineDictionaryItem` is used to identify the asset as
    /// paths and outputs may change during task processing (e.g. images names
    /// could contain a hash for cache busting).
    ///
    /// # Errors
    ///
    /// Any conforming `std::error::Error`
    fn perform(&self, options: &Options) -> Result<(), Box<dyn Error>>;

    /// A helper to ensure an output path exists
    ///
    /// # Errors
    ///
    /// Will error with `std::io::Error` if directory creation fails
    ///
    /// # Panics
    ///
    /// Will panic if parsing a file but the parent directory cannot be derived
    fn ensure_dir(path: &Path) -> Result<(), std::io::Error> {
        let output_dir = if path.is_dir() {
            path
        } else {
            path.parent().expect("Should be a directory")
        };

        fs::create_dir_all(output_dir)
    }

    fn cache_key(&self) -> u64 {
        let mut hasher = DefaultHasher::new();
        self.hash(&mut hasher);
        hasher.finish()
    }

    fn cache_path(&self, options: &Options) -> PathBuf {
        options
            .cache_path
            .clone()
            .join(format!("{:x}", self.cache_key()))
    }

    /// Retrieve a file from cache and write to the target if it exists.
    ///
    /// Returns true if a file was read and written from cache.
    ///
    /// # Errors
    ///
    /// returns `std::io::Error` if copy or target directory creation fails.
    fn restore_from_cache(&self, target: &Path, options: &Options) -> Result<bool, std::io::Error> {
        let cache_path = self.cache_path(options);
        if options.use_cache && cache_path.exists() {
            println!("Using cache: {}", target.display());
            fs::copy(&cache_path, target)?;
            Ok(true)
        } else {
            Ok(false)
        }
    }
}
