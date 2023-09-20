use yew::{
    function_component, html, use_effect_with_deps, use_state, virtual_dom::AttrValue, Callback,
    Html, Properties,
};
use yew_hooks::{use_async, use_swipe_with_window, use_window_size, UseSwipeDirection};

use super::common::{recipe, Layout};
use crate::components as c;
use crate::hooks::i18n::{use_locale_context, LocaleConfig, LocaleConfigAction};
use crate::models::recipe::Recipe as RecipeModel;
use crate::services::recipe::get_recipe;

#[derive(PartialEq, Properties)]
pub struct PageProps {
    pub locale: AttrValue,
    pub recipe: AttrValue,
}

#[function_component]
pub fn Recipe(props: &PageProps) -> Html {
    rust_i18n::set_locale(&props.locale);

    let locale_context = use_locale_context();

    let recipe_info = {
        let recipe = props.recipe.clone();
        let locale = props.locale.clone();
        use_async(async move { get_recipe(recipe, locale).await })
    };

    {
        // Re-fetch if the locale changes
        let recipe_info = recipe_info.clone();
        use_effect_with_deps(
            move |_| {
                recipe_info.run();
            },
            props.locale.clone(),
        );
    }

    let (title, content) = if let Some(recipe) = &recipe_info.data {
        locale_context.dispatch(LocaleConfigAction::Set {
            config: LocaleConfig::from(recipe),
        });

        (
            recipe.name.clone(),
            html!(<Content recipe={recipe.clone()} />),
        )
    } else {
        ("...".to_string(), html!({ "Loading" }))
    };

    html!(
        <Layout title={title}>
            {content}
        </Layout>
    )
}

#[derive(PartialEq, Properties)]
struct RecipeProps {
    recipe: RecipeModel,
}

#[function_component]
fn Content(props: &RecipeProps) -> Html {
    let current_page = use_state(|| 0);
    let change_page = {
        let current_page = current_page.clone();
        Callback::from(move |direction: recipe::PageDirection| match direction {
            recipe::PageDirection::Next => current_page.set(*current_page + 1),
            recipe::PageDirection::Prev => current_page.set(*current_page - 1),
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
            <recipe::Page
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
        <c::Carosel width={window_width} total_pages={total_pages} current_page={*current_page}>
            { for steps }
        </c::Carosel>
    )
}
