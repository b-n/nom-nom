use stylist::yew::use_style;
use yew::{function_component, html, Callback, Html, Properties};

use crate::components as c;

use super::Step;

use crate::utils::recipe_parser::RecipeStep;

pub enum PageDirection {
    Next,
    Prev,
}

#[derive(PartialEq, Properties)]
pub struct PageProps {
    pub page: usize,
    pub total_pages: usize,
    pub width: usize,
    pub steps_per_page: usize,
    pub on_page_change: Callback<PageDirection>,
    pub steps: Vec<RecipeStep>,
}

#[function_component]
pub fn Page(props: &PageProps) -> Html {
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
            <Step width={step_width}>
                { Html::from_html_unchecked(step.content.clone().into()) }
            </Step>)
    });

    html!(
        <c::CaroselItem class={style.clone()} width={width}>
            { for steps }
            <div class={actions_style.clone()}>
                if page > 0 {
                    <c::Button onclick={move |_| prev_page.emit(PageDirection::Prev)}> { "Back" } </c::Button>
                } else {
                    <div />
                }
                if page < total_pages - 1 {
                    <c::Button onclick={move |_| next_page.emit(PageDirection::Next)}> { "Next" } </c::Button>
                } else {
                    <div />
                }
            </div>
        </c::CaroselItem>
    )
}
