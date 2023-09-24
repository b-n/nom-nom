use std::error::Error;
use std::fs;
use std::path::PathBuf;

#[derive(PartialEq, Hash, Eq, Clone)]
pub struct AssetKey(String);

impl From<&str> for AssetKey {
    fn from(input: &str) -> Self {
        Self(input.to_string())
    }
}

impl From<&String> for AssetKey {
    fn from(input: &String) -> Self {
        Self(input.clone())
    }
}

impl From<&PathBuf> for AssetKey {
    fn from(path: &PathBuf) -> Self {
        Self(path.to_str().expect("Should be a path").to_string())
    }
}

// Allowed since we only want to allow conversion to HashMap<String, String>
#[allow(clippy::from_over_into)]
impl Into<String> for &AssetKey {
    fn into(self) -> String {
        self.clone().0
    }
}

#[derive(Clone)]
pub struct AssetValue(String);

impl From<String> for AssetValue {
    fn from(input: String) -> Self {
        Self(input)
    }
}

impl From<&str> for AssetValue {
    fn from(input: &str) -> Self {
        Self(input.to_string())
    }
}

impl From<&PathBuf> for AssetValue {
    fn from(path: &PathBuf) -> Self {
        Self(path.to_str().expect("Should be a path").to_string())
    }
}

impl From<PathBuf> for AssetValue {
    fn from(path: PathBuf) -> Self {
        Self(path.to_str().expect("Should be a path").to_string())
    }
}

// Allowed since we only want to allow conversion to HashMap<String, String>
#[allow(clippy::from_over_into)]
impl Into<String> for &AssetValue {
    fn into(self) -> String {
        self.clone().0
    }
}

use super::{Options, Task};

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
    fn filter(&self, _path: PathBuf) -> bool {
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
    fn parse(&mut self, path: PathBuf) -> Result<(), Box<dyn Error>>;

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
pub trait PipelineTask {
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
    fn ensure_dir(path: &PathBuf) -> Result<(), std::io::Error> {
        let output_dir = if path.is_dir() {
            path
        } else {
            path.parent().expect("Should be a directory")
        };

        fs::create_dir_all(output_dir)
    }
}
