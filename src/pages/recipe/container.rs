use stylist::yew::use_style;
use yew::{function_component, html, use_state, Callback, Children, Html, Properties};

use crate::components as c;

#[derive(PartialEq, Properties, Debug)]
pub struct ContainerProps {
    pub children: Children,
}

#[function_component]
pub fn Container(props: &ContainerProps) -> Html {
    let current_page = use_state(|| 0);

    let style = use_style!(
        r#"
        width: 100%;
        max-width: 1600px;
        "#
    );

    let on_swipe_handler = {
        let current_page = current_page.clone();
        Callback::from(move |(direction, page, total_pages)| match direction {
            c::SwipeDirection::Next if page < total_pages - 1 => {
                current_page.set(*current_page + 1);
            }
            c::SwipeDirection::Prev if page > 0 => {
                current_page.set(*current_page - 1);
            }
            c::SwipeDirection::Next | c::SwipeDirection::Prev if page >= total_pages => {
                current_page.set(0);
            }
            _ => {}
        })
    };

    html!(
        <c::Carosel class={style} on_swipe={on_swipe_handler} current_page={*current_page}>
            { for props.children.iter() }
        </c::Carosel>
    )
}
