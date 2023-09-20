use std::error::Error;
use std::path::PathBuf;

pub trait Processor {
    fn parse(&mut self) -> Result<(), Box<dyn Error>>;
    fn tasks(&self) -> Result<Vec<Box<dyn PipelineTask>>, Box<dyn Error>>;
}

pub trait PipelineTask {
    fn run(&self, options: &PipelineOptions) -> Result<(), Box<dyn Error>>;
}

#[derive(Default)]
pub struct PipelineOptions {
    pub target_root: PathBuf,
}

impl PipelineOptions {
    pub fn new(target_root: PathBuf) -> Self {
        Self { target_root }
    }
}

pub struct Pipeline {
    options: PipelineOptions,
    processors: Vec<Box<dyn Processor>>,
}

impl Pipeline {
    pub fn with_options(options: PipelineOptions) -> Self {
        Pipeline {
            processors: vec![],
            options,
        }
    }

    pub fn add_processor<T: Processor + 'static>(&mut self, processor: Box<T>) {
        self.processors.push(processor);
    }

    pub fn run(&mut self) -> Result<(), Box<dyn Error>> {
        let mut all_tasks: Vec<Box<dyn PipelineTask>> = vec![];

        for processor in &mut self.processors {
            processor.parse()?;

            let mut tasks = processor.tasks()?;

            all_tasks.append(&mut tasks);
        }

        for task in all_tasks {
            task.run(&self.options)?;
        }

        Ok(())
    }
}
