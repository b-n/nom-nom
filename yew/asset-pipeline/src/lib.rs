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

mod options;
pub mod task;
mod traits;

pub use options::Options;
pub use task::Task;
pub use traits::*;

/// The root
pub struct Pipeline {
    options: Options,
    processors: Vec<Box<dyn Processor>>,
}

impl Pipeline {
    /// Constructs a new pipeline based off the given `Option`s.
    #[must_use]
    pub fn with_options(options: Options) -> Self {
        Pipeline {
            processors: vec![],
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
    /// # Errors
    ///
    /// Returns a `std::error::Error` on any failures
    pub fn run(&mut self) -> Result<(), Box<dyn Error>> {
        let tasks = self.generate_tasks_from_processors()?;

        self.process_tasks(tasks)?;

        Ok(())
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
                processor.parse(path.into_path())?;
            }

            // Hook: after_parse
            processor.after_parse();

            tasks.append(&mut processor.tasks()?);
        }

        Ok(tasks)
    }

    fn process_tasks(&self, tasks: Vec<Task>) -> Result<(), Box<dyn Error>> {
        for task in tasks {
            task.perform(&self.options)?;
        }
        Ok(())
    }
}
