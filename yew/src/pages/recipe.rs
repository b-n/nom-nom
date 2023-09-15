use yew::{
    function_component, html, use_effect_with_deps, use_state, virtual_dom::AttrValue, Callback,
    Html, Properties,
};
use yew_hooks::{use_swipe_with_window, use_window_size, UseSwipeDirection};

use super::common::{recipe, Layout};
use crate::components as c;
use crate::utils::recipe::get_recipe;

#[derive(PartialEq, Properties)]
pub struct RecipeProps {
    pub locale: AttrValue,
    pub recipe: AttrValue,
}

#[function_component]
pub fn Recipe(props: &RecipeProps) -> Html {
    rust_i18n::set_locale(&props.locale);

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

    let recipe = get_recipe(props.recipe.clone(), props.locale.clone());

    // Can be replaced by div_ceil when int_roundings are in stable
    let mut total_pages = recipe.steps.len() / chunk_size;
    let remainder = recipe.steps.len() % chunk_size;
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

    let steps = recipe
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
        <Layout title={recipe.name.clone()}>
            <c::Carosel width={window_width} total_pages={total_pages} current_page={*current_page}>
                { for steps }
            </c::Carosel>
        </Layout>
    )
}
