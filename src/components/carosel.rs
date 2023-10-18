use stylist::yew::use_style;
use yew::{
    classes, function_component, html, use_effect_with_deps, use_node_ref, Callback, Children,
    Classes, Html, Properties,
};
use yew_hooks::{use_swipe, UseSwipeDirection};

#[derive(Debug)]
pub enum SwipeDirection {
    Next,
    Prev,
}

#[derive(PartialEq, Properties)]
pub struct CaroselProps {
    #[prop_or_default]
    pub class: Classes,
    #[prop_or_default]
    pub inner_class: Classes,
    pub children: Children,
    pub current_page: usize,
    #[prop_or_default]
    pub on_swipe: Callback<(Option<SwipeDirection>, usize, usize)>,
}

#[function_component]
pub fn Carosel(props: &CaroselProps) -> Html {
    let style = use_style!(
        r#"
        overflow-x: hidden;
        "#
    );

    let inner_style = use_style!(
        r#"
        display: flex;
        transition: left 0.2s ease;
        position: relative;

        & > div {
            position: relative;
            flex-shrink: 0;
        }
        "#
    );

    let node = use_node_ref();
    let state = use_swipe(node.clone());

    {
        let node = node.clone();
        let current_page = props.current_page;
        let state = state.clone();
        let on_swipe = props.on_swipe.clone();
        use_effect_with_deps(
            move |direction| {
                let total_pages = node
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

                match **direction {
                    UseSwipeDirection::Right => {
                        on_swipe.emit((Some(SwipeDirection::Prev), current_page, total_pages))
                    }
                    UseSwipeDirection::Left => {
                        on_swipe.emit((Some(SwipeDirection::Next), current_page, total_pages))
                    }
                    _ => on_swipe.emit((None, current_page, total_pages)),
                }
            },
            state.direction,
        );
    }

    html!(
        <div class={classes!(props.class.clone(), style)} ref={node}>
             <div class={inner_style} style={format!("left: calc(100% * -{})", props.current_page)}>
                 { for props.children.iter() }
             </div>
        </div>
    )
}
