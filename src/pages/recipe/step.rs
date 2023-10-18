use stylist::yew::use_style;
use yew::{function_component, html, Html, Properties};

use crate::components as c;
use crate::models::recipe::RecipeStep;

#[derive(PartialEq, Properties)]
pub struct StepProps {
    pub recipe_step: RecipeStep,
}

#[function_component]
pub fn Step(props: &StepProps) -> Html {
    let style = use_style!(
        r#"
        padding: 12px;

        width: 100%;

        @media (min-width: 768px) {
          width: 50%;
        }

        @media (min-width: 1366px) {
          width: 33.33%;
        }
        "#
    );

    let card_style = use_style!(
        r#"
        padding: 15px;
        "#
    );

    html!(
        <div class={style}>
            <c::Card class={card_style}>
                { Html::from_html_unchecked(props.recipe_step.content.clone().into()) }
            </c::Card>
        </div>
    )
}
