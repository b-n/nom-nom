use pulldown_cmark::{html, Event, HeadingLevel, Parser, Tag};

use nom_nom::models::recipe;

#[derive(Clone)]
struct RecipeStep(recipe::RecipeStep);

impl TryFrom<&Vec<Event<'_>>> for RecipeStep {
    type Error = RecipeParserError;

    fn try_from(events: &Vec<Event<'_>>) -> Result<Self, Self::Error> {
        let mut html_buf = String::new();
        html::push_html(&mut html_buf, events.iter().cloned());
        let step = RecipeStep(recipe::RecipeStep {
            content: html_buf,
            image: None,
        });
        Ok(step)
    }
}

#[derive(Clone)]
struct RecipeIngredient(recipe::RecipeIngredient);

impl TryFrom<&str> for RecipeIngredient {
    type Error = RecipeParserError;

    fn try_from(s: &str) -> Result<Self, Self::Error> {
        Ok(RecipeIngredient(recipe::RecipeIngredient {
            quantity: None,
            unit: None,
            ingredient: s.to_string(),
        }))
    }
}

#[derive(Debug)]
enum RecipeParserState {
    Start,
    Frontmatter,
    Ingredients,
    Recipe,
}

impl Default for RecipeParserState {
    fn default() -> RecipeParserState {
        Self::Start
    }
}

#[derive(Debug)]
pub enum RecipeParserError {
    FrontmatterRequired,
    FrontmatterError(String),
    IngredientError(String),
}

impl std::error::Error for RecipeParserError {}

impl std::fmt::Display for RecipeParserError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> Result<(), std::fmt::Error> {
        match self {
            RecipeParserError::FrontmatterRequired => write!(f, "FrontmatterRequired"),
            RecipeParserError::FrontmatterError(m) => write!(f, "FrontmatterError: {m}"),
            RecipeParserError::IngredientError(m) => write!(f, "IngredientError: {m}"),
        }
    }
}

#[derive(Default)]
pub struct RecipeParser {
    state: RecipeParserState,
    recipe: recipe::Recipe,
}

impl RecipeParser {
    pub fn parse(mut self, input: &str) -> Result<recipe::Recipe, RecipeParserError> {
        let parser = Parser::new(input);

        let mut buf = vec![];

        for event in parser {
            match &self.state {
                RecipeParserState::Start => match event {
                    Event::Rule => self.state = RecipeParserState::Frontmatter,
                    _ => return Err(RecipeParserError::FrontmatterRequired),
                },
                RecipeParserState::Frontmatter => match event {
                    Event::Start(Tag::Heading(HeadingLevel::H2, _, _)) | Event::SoftBreak => {
                        // Do nothing, just let's us know we're in collecting frontmatter
                    }
                    Event::Text(_) => buf.push(event),
                    Event::End(Tag::Heading(HeadingLevel::H2, _, _)) => {
                        self.parse_frontmatter(&buf)?;
                        buf.clear();

                        self.state = RecipeParserState::Ingredients
                    }
                    _ => {
                        return Err(RecipeParserError::FrontmatterError(
                            "Invalid frontmatter".into(),
                        ))
                    }
                },
                RecipeParserState::Ingredients => match event {
                    Event::Rule => {
                        self.parse_ingredients(&buf)?;

                        // Add ingredients as a step for display purposes
                        self.recipe.steps.push(RecipeStep::try_from(&buf)?.0);
                        buf.clear();

                        self.state = RecipeParserState::Recipe
                    }
                    _ => buf.push(event),
                },
                RecipeParserState::Recipe => match event {
                    Event::Rule => {
                        self.recipe.steps.push(RecipeStep::try_from(&buf)?.0);
                        buf.clear();
                    }
                    _ => buf.push(event),
                },
            }
        }

        // There is no requirement for an empty rule at the end, thus we should parse it
        if !buf.is_empty() {
            self.recipe.steps.push(RecipeStep::try_from(&buf)?.0);
            buf.clear();
        }

        Ok(self.recipe)
    }

    fn parse_frontmatter(&mut self, data: &[Event<'_>]) -> Result<(), RecipeParserError> {
        for d in data {
            match d {
                Event::Text(s) => match s.split_once(": ") {
                    Some((k, "")) => {
                        return Err(RecipeParserError::FrontmatterError(format!(
                            "empty key '{k}'"
                        )))
                    }
                    Some(("id", v)) => self.recipe.id = v.to_string(),
                    Some(("locale", v)) => self.recipe.locale = v.to_string(),
                    Some(("slug", v)) => self.recipe.slug = v.to_string(),
                    Some(("image", v)) => self.recipe.image = v.to_string(),
                    Some(("name", v)) => self.recipe.name = v.to_string(),
                    Some((k, v)) => {
                        return Err(RecipeParserError::FrontmatterError(format!(
                            "invalid key '{k}' with value '{v}'"
                        )))
                    }
                    None => {
                        return Err(RecipeParserError::FrontmatterError(
                            "Invalid frontmatter format, requires `key: value`".into(),
                        ))
                    }
                },
                // We only push Event::Text<_>
                _ => unreachable!(),
            }
        }
        Ok(())
    }

    fn parse_ingredients(&mut self, data: &[Event<'_>]) -> Result<(), RecipeParserError> {
        let mut collecting_item = false;

        for event in data {
            match event {
                Event::End(Tag::List(_)) => {
                    // At the end of the first list, we break the loop, any subsequent list is not
                    // ingredients
                    break;
                }
                Event::Start(Tag::Item) => {
                    collecting_item = true;
                }
                Event::Text(s) if collecting_item => {
                    let s: &str = s;
                    self.recipe
                        .ingredients
                        .push(RecipeIngredient::try_from(s)?.0);
                }
                Event::End(Tag::Item) => {
                    collecting_item = false;
                }
                e if collecting_item => {
                    return Err(RecipeParserError::IngredientError(format!(
                        "Invalid ingredient, must be plain text. Received '{e:?}'"
                    )))
                }
                _ => {}
            }
        }
        Ok(())
    }
}
