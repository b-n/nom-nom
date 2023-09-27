use yew::{function_component, html, use_effect_with_deps, use_state, Callback, Html, Properties};
use yew_hooks::{use_swipe_with_window, use_window_size, UseSwipeDirection};

use super::page::{Page, PageDirection};
use crate::components as c;
use crate::models::recipe::Recipe as RecipeModel;

#[derive(PartialEq, Properties)]
pub struct ContainerProps {
    pub recipe: RecipeModel,
}

#[function_component]
pub fn Container(props: &ContainerProps) -> Html {
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
            <Page
                key={index}
                page={index}
                steps_per_page={chunk_size}
                steps={steps.to_vec()}
                width={window_width}
                on_page_change={&change_page}
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
