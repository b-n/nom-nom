#[derive(PartialEq, Debug, Clone)]
pub struct RecipeStep {
    pub content: String,
    pub image: Option<String>,
}

#[derive(PartialEq, Debug, Clone)]
pub struct RecipeIngredient {
    pub quantity: Option<String>,
    pub unit: Option<String>,
    pub ingredient: String,
}

#[derive(Default, Debug, PartialEq, Clone)]
pub struct Recipe {
    pub name: String,
    pub locale: String,
    pub slug: String,
    pub image: String,
    pub ingredients: Vec<RecipeIngredient>,
    pub steps: Vec<RecipeStep>,
}

impl std::fmt::Display for Recipe {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> Result<(), std::fmt::Error> {
        write!(f, "{self:?}")
    }
}