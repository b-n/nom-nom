use stylist::yew::use_style;
use yew::{
    function_component, html, use_effect_with_deps, use_node_ref, use_state, Callback, Children,
    Html, MouseEvent, Properties,
};
use yew_hooks::use_window_size;

use crate::components as c;

#[derive(PartialEq, Properties, Debug)]
pub struct ContainerProps {
    pub children: Children,
}

#[function_component]
pub fn Container(props: &ContainerProps) -> Html {
    let current_page = use_state(|| 0);
    let total_pages = use_state(|| 1);

    let style = use_style!(
        r#"
        width: 100%;
        max-width: 1600px;
        "#
    );

    let node = use_node_ref();

    let on_swipe_handler = {
        let current_page = current_page.clone();
        let total_pages = *total_pages;
        Callback::from(move |direction| match direction {
            Some(c::SwipeDirection::Next) if *current_page < total_pages - 1 => {
                current_page.set(*current_page + 1);
            }
            Some(c::SwipeDirection::Prev) if *current_page > 0 => {
                current_page.set(*current_page - 1);
            }
            Some(c::SwipeDirection::Next) | Some(c::SwipeDirection::Prev)
                if *current_page >= total_pages =>
            {
                current_page.set(0);
            }
            _ => {}
        })
    };

    let (window_width, _) = use_window_size();

    {
        let node = node.clone();
        let current_page = current_page.clone();
        let total_pages = total_pages.clone();
        use_effect_with_deps(
            move |_| {
                let total = node
                    .cast::<web_sys::HtmlElement>()
                    .map(|element| {
                        let content_width = element.scroll_width();
                        let display_width = element.offset_width();

                        let mut res = content_width / display_width;
                        if content_width % display_width > 0 {
                            res += 1;
                        }
                        res as usize

                        // This should work, but it doesn't, even thought toolchain 1.73.0
                        //content_width.div_ceil(display_width) as usize
                    })
                    .expect("Should have a swiped element");

                if total != *total_pages {
                    total_pages.set(total);
                    current_page.set(0);
                }
            },
            window_width,
        )
    }

    let left_handler = {
        let handler = on_swipe_handler.clone();
        Callback::from(move |_: MouseEvent| handler.emit(Some(c::SwipeDirection::Prev)))
    };
    let right_handler = {
        let handler = on_swipe_handler.clone();
        Callback::from(move |_: MouseEvent| handler.emit(Some(c::SwipeDirection::Next)))
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

    html!(
        <>
            <c::Carosel class={style} on_swipe={on_swipe_handler} current_page={*current_page} r#ref={&node}>
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
