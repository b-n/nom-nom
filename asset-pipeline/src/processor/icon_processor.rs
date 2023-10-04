use std::error::Error;
use std::path::{Path, PathBuf};

use crate::{Processor, Task};

pub struct IconProcessor {
    paths: Vec<PathBuf>,
}

impl Processor for IconProcessor {
    fn paths(&self) -> &Vec<PathBuf> {
        &self.paths
    }

    fn parse(&mut self, _path: &Path) -> Result<(), Box<dyn Error>> {
        Ok(())
    }

    fn tasks(&self) -> Result<Vec<Task>, Box<dyn Error>> {
        Ok(vec![])
    }
}
