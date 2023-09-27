//! A Generic asset build pipeline for building assets

// Setup Clippy
#![warn(clippy::all)]
#![warn(clippy::pedantic)]
#![warn(clippy::cargo)]
#![allow(unknown_lints)]
#![warn(missing_debug_implementation)]
#![warn(missing_copy_implementation)]
#![warn(rust_2018_idioms)]
#![warn(rust_2021_compatibility)]
#![warn(trivial_casts, trivial_numeric_casts)]
#![warn(unused_qualifications)]
#![warn(variant_size_difference)]

use std::error::Error;
use walkdir::WalkDir;

mod asset_map;
mod options;
pub mod task;
mod traits;

pub use asset_map::*;
pub use options::Options;
pub use task::Task;
pub use traits::*;

/// The root
pub struct Pipeline {
    options: Options,
    asset_map: AssetMap,
    processors: Vec<Box<dyn Processor>>,
}

impl Pipeline {
    /// Constructs a new pipeline based off the given `Option`s.
    #[must_use]
    pub fn with_options(options: Options) -> Self {
        Pipeline {
            processors: vec![],
            asset_map: AssetMap::new(),
            options,
        }
    }

    /// Adds a new processor into the asset pipeline chain. All Processors are
    /// required to implement `Processor`.
    pub fn add_processor<P: Processor + 'static>(&mut self, processor: P) {
        self.processors.push(Box::new(processor));
    }

    /// Run the pipeline.
    ///
    /// The pipeline runs in two phases:
    ///
    /// 1. Collect tasks from each registered `Processor`.
    /// 2. Run each of the generated tasks.
    ///
    /// ## Phase 1
    ///
    /// - Walk the paths provided by the `Processor::paths()` call.
    /// - Filter out directories and invalid paths
    /// - Pass each individual entry off to `Processor::parse()`.
    /// - Call `tasks()` to generate all required tasks
    ///
    /// ## Phase 2
    ///
    /// Run each task. See `task` for more info.
    ///
    /// `Task::asset_key()` is called on each task prior to invocation. If the
    /// returned key is already in the asset dictionary, processing of the task
    /// will be skipped.
    ///
    /// # Errors
    ///
    /// Returns a `std::error::Error` on any failures
    pub fn run(&mut self) -> Result<AssetMap, Box<dyn Error>> {
        let tasks = self.generate_tasks_from_processors()?;

        self.process_tasks(tasks)?;

        Ok(self.finalize())
    }

    fn generate_tasks_from_processors(&mut self) -> Result<Vec<Task>, Box<dyn Error>> {
        let mut tasks: Vec<Task> = vec![];

        for processor in &mut self.processors {
            // Hook: before_parse
            processor.before_parse();

            for path in processor
                .paths()
                .clone()
                .iter()
                .flat_map(|path| WalkDir::new(path).into_iter())
                .filter_map(Result::ok)
                .filter(|e| !e.file_type().is_dir())
            {
                let path = path.path();
                // Give the processer the ability to filter this path. Default
                // impl returns true for all paths.
                if processor.filter(path) {
                    processor.parse(path)?;
                }
            }

            // Hook: after_parse
            processor.after_parse();

            tasks.append(&mut processor.tasks()?);
        }

        Ok(tasks)
    }

    fn process_tasks(&mut self, tasks: Vec<Task>) -> Result<(), Box<dyn Error>> {
        for task in tasks {
            let key = task.asset_key();

            // No need to generate the same asset twice
            if self.asset_map.get(&key).is_some() {
                continue;
            }

            task.perform(&self.options)?;

            self.asset_map
                .insert(task.asset_key(), task.asset_value(&self.options));
        }
        Ok(())
    }

    fn finalize(&self) -> AssetMap {
        self.asset_map.clone()
    }
}
