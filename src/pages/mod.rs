// common elements that can be used across all pages
pub mod common;

// pages
mod home;
mod inspiration;
mod recipe;
mod root;

pub use home::Home;
pub use inspiration::Inspiration;
pub use recipe::Recipe;
