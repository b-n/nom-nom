use std::collections::HashMap;
use std::path::{Path, PathBuf};

/// An `AssetMap` is used due to the possible modification of the input into its
/// target. For example, image filenames may contain a hash in their target
/// filename.
pub type AssetMap = HashMap<AssetKey, AssetValue>;

/// `AssetKey` is a Rust String (UTF-8 enforced).
///
/// Some `std::convert::from` traits are provided to make construction easier.
#[derive(PartialEq, Hash, Eq, Clone)]
pub struct AssetKey(String);

impl From<&str> for AssetKey {
    fn from(input: &str) -> Self {
        Self(input.to_string())
    }
}

impl From<String> for AssetKey {
    fn from(input: String) -> Self {
        Self(input)
    }
}

impl From<&String> for AssetKey {
    fn from(input: &String) -> Self {
        Self(input.clone())
    }
}

impl From<&Path> for AssetKey {
    fn from(path: &Path) -> Self {
        Self(path.to_str().expect("Should be a path").to_string())
    }
}

impl From<&PathBuf> for AssetKey {
    fn from(path: &PathBuf) -> Self {
        Self::from(path.as_path())
    }
}

// Allow conversion back to String
impl From<&AssetKey> for String {
    fn from(asset_key: &AssetKey) -> String {
        asset_key.0.clone()
    }
}

/// `AssetValue` is a Rust String (UTF-8 enforced).
///
/// If trying to access binary data that is not valid UTF-8, consider
/// converting into something UTF-8 safe such as Base64.
///
/// Some `std::convert::from` traits are provided to make construction easier.
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

impl From<&Path> for AssetValue {
    fn from(path: &Path) -> Self {
        Self(path.to_str().expect("Should be a path").to_string())
    }
}

impl From<&PathBuf> for AssetValue {
    fn from(path: &PathBuf) -> Self {
        Self::from(path.as_path())
    }
}

impl From<PathBuf> for AssetValue {
    fn from(path: PathBuf) -> Self {
        Self::from(&path)
    }
}

// Allow conversion back to String
impl From<&AssetValue> for String {
    fn from(asset_value: &AssetValue) -> String {
        asset_value.0.clone()
    }
}
