use super::{i18n::LocalisedLink, recipe::Recipe};
use rkyv::{Archive, Deserialize, Serialize};

#[derive(Debug, PartialEq, Clone, Archive, Serialize, Deserialize)]
pub struct Index {
    pub alternate_locales: Vec<LocalisedLink>,
    pub locale: String,
    pub recipes: Vec<Recipe>,
}
