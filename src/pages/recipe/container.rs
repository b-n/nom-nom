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
    let total_pages = use_state(|| 0);

    let style = use_style!(
        r#"
        width: 100%;
        max-width: 1600px;
        "#
    );

    let on_swipe_handler = {
        let current_page = current_page.clone();
        let total_pages = total_pages.clone();
        Callback::from(move |(direction, page, total)| {
            total_pages.set(total);
            match direction {
                Some(c::SwipeDirection::Next) if page < total - 1 => {
                    current_page.set(*current_page + 1);
                }
                Some(c::SwipeDirection::Prev) if page > 0 => {
                    current_page.set(*current_page - 1);
                }
                Some(c::SwipeDirection::Next) | Some(c::SwipeDirection::Prev) if page >= total => {
                    current_page.set(0);
                }
                None => {
                    current_page.set(page);
                }
                _ => {}
            }
        })
    };

    let triangle = use_style!(
        r#"
        width: 4rem;
        height: 4rem;
        position: fixed;
        font-size: 2rem;
        user-select: none;
        bottom: 0;
        color: #faf9fc;
        filter: drop-shadow(0px 0px 5px rgba(0,0,0,80%));

        & > div { 
            background-color: rgba(0, 0, 255, 40%);
            transition: background-color 0.5s ease-out;
            display: flex;
            width: 100%;
            height: 100%;
            align-items: flex-end;
        }

        &:hover > div {
            background-color: rgba(0, 0, 255, 100%);
        }
        "#
    );

    let triange_left = use_style!(
        r#"
        padding-left: 5px;
        clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
        "#
    );

    let triange_right = use_style!(
        r#"
        padding-right: 5px;
        clip-path: polygon(100% 0%, 100% 100%, 0% 100%);
        justify-content: flex-end;
        "#
    );

    let left_handler = {
        let current_page = current_page.clone();
        let total_pages = total_pages.clone();
        let handler = on_swipe_handler.clone();
        Callback::from(move |_| {
            handler.emit((Some(c::SwipeDirection::Prev), *current_page, *total_pages))
        })
    };
    let right_handler = {
        let current_page = current_page.clone();
        let total_pages = total_pages.clone();
        let handler = on_swipe_handler.clone();
        Callback::from(move |_| {
            handler.emit((Some(c::SwipeDirection::Next), *current_page, *total_pages))
        })
    };

    html!(
    <>
        <c::Carosel class={style} on_swipe={on_swipe_handler} current_page={*current_page}>
            { for props.children.iter() }
        </c::Carosel>
        <section>
            <div class={triangle.clone()} style={"left: 0;"}>
                <div class={triange_left} onclick={left_handler}>{"↜"}</div>
            </div>
            <div class={triangle.clone()} style={"right: 0;"}>
                <div class={triange_right} onclick={right_handler}>{"↝"}</div>
            </div>
        </section>
    </>
    )
}
