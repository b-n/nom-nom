use stylist::yew::use_style;
use yew::{
    function_component, html, use_effect_with_deps, use_state, Callback, Children, Html, Properties,
};
use yew_hooks::{use_swipe_with_window, use_window_size, UseSwipeDirection};

use crate::components::{Button, Card, Carosel, CaroselItem};
use crate::pages::common::Layout;

use crate::utils::recipe_parser::{Recipe as ParsedRecipe, RecipeStep as ParsedRecipeStep};

#[derive(PartialEq, Properties)]
struct RecipeStepProps {
    pub width: f64,
    pub children: Children,
}

#[function_component]
fn RecipeStep(props: &RecipeStepProps) -> Html {
    let style = use_style!(
        r#"
        padding: 12px;
        "#
    );

    let card_style = use_style!(
        r#"
        padding: 15px;
        "#
    );

    let width = props.width;
    html!(
        <div class={style} style={format!("width: {width}%")}>
            <Card class={card_style}>
                { for props.children.iter() }
            </Card>
        </div>
    )
}

#[derive(PartialEq, Properties)]
struct RecipePageProps {
    page: usize,
    total_pages: usize,
    width: usize,
    steps_per_page: usize,
    on_page_change: Callback<PageDirection>,
    steps: Vec<ParsedRecipeStep>,
}

#[function_component]
fn RecipePage(props: &RecipePageProps) -> Html {
    let style = use_style!(
        r#"
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        margin: 0 auto;
        max-width: 1600px;
        "#
    );

    let actions_style = use_style!(
        r#"
        width: 100%;
        display: flex;
        padding: 15px;
        justify-content: space-between;
        "#
    );

    let step_width = 100f64 / props.steps_per_page as f64;
    let width = props.width;
    let page = props.page;
    let total_pages = props.total_pages;
    let prev_page = props.on_page_change.clone();
    let next_page = props.on_page_change.clone();

    let steps = props.steps.iter().map(|step| {
        html!(
            <RecipeStep width={step_width}>
                { Html::from_html_unchecked(step.content.clone().into()) }
            </RecipeStep>)
    });

    html!(
        <CaroselItem class={style.clone()} width={width}>
            { for steps }
            <div class={actions_style.clone()}>
                if page > 0 {
                    <Button onclick={move |_| prev_page.emit(PageDirection::Prev)}> { "Back" } </Button>
                } else {
                    <div />
                }
                if page < total_pages - 1 {
                    <Button onclick={move |_| next_page.emit(PageDirection::Next)}> { "Next" } </Button>
                } else {
                    <div />
                }
            </div>
        </CaroselItem>
    )
}

enum PageDirection {
    Next,
    Prev,
}

#[derive(PartialEq, Properties)]
pub struct RecipeProps {
    pub recipe: ParsedRecipe,
}

#[function_component]
pub fn Recipe(props: &RecipeProps) -> Html {
    let current_page = use_state(|| 0);
    let change_page = {
        let current_page = current_page.clone();
        Callback::from(move |direction: PageDirection| match direction {
            PageDirection::Next => current_page.set(*current_page + 1),
            PageDirection::Prev => current_page.set(*current_page - 1),
        })
    };

    let (window_width, _) = use_window_size();
    let window_width = window_width as usize;

    let chunk_size = match window_width {
        0..=575 => 1,
        576..=1024 => 2,
        _ => 3,
    };

    // Can be replaced by div_ceil when int_roundings are in stable
    let mut total_pages = props.recipe.steps.len() / chunk_size;
    let remainder = props.recipe.steps.len() % chunk_size;
    if remainder > 0 {
        total_pages += 1;
    }

    // Setup swipe handler
    let state = use_swipe_with_window();
    {
        let state = state.clone();
        let current_page = current_page.clone();
        use_effect_with_deps(
            move |direction| match **direction {
                UseSwipeDirection::Right if *current_page > 0 => {
                    current_page.set(*current_page - 1)
                }
                UseSwipeDirection::Left if *current_page < total_pages - 1 => {
                    current_page.set(*current_page + 1)
                }
                _ => (),
            },
            state.direction,
        );
    }

    let steps = props
        .recipe
        .steps
        .chunks(chunk_size)
        .enumerate()
        .map(|(index, steps)| {
            html!(
            <RecipePage
                key={index}
                page={index}
                steps_per_page={chunk_size}
                steps={steps.to_vec()}
                width={window_width}
                on_page_change={change_page.clone()}
                total_pages={total_pages}
            />
            )
        });

    html!(
        <Layout title={props.recipe.name.clone()}>
            <Carosel width={window_width} total_pages={total_pages} current_page={*current_page}>
                { for steps }
            </Carosel>
        </Layout>
    )
}
