use super::i18n::LocalisedLink;
use rkyv::{Archive, Deserialize, Serialize};

#[derive(PartialEq, Debug, Clone, Archive, Serialize, Deserialize)]
pub struct RecipeStep {
    pub content: String,
    pub image: Option<String>,
}

#[derive(PartialEq, Debug, Clone, Archive, Serialize, Deserialize)]
pub struct RecipeIngredient {
    pub quantity: Option<String>,
    pub unit: Option<String>,
    pub ingredient: String,
}

#[derive(Default, Debug, PartialEq, Clone, Archive, Serialize, Deserialize)]
pub struct Recipe {
    pub id: String,
    pub name: String,
    pub locale: String,
    pub slug: String,
    pub image: String,
    pub ingredients: Vec<RecipeIngredient>,
    pub steps: Vec<RecipeStep>,
    pub alternate_locales: Vec<LocalisedLink>,
}

impl std::fmt::Display for Recipe {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> Result<(), std::fmt::Error> {
        write!(f, "{self:?}")
    }
}
