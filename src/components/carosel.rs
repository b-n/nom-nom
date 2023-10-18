use stylist::yew::use_style;
use yew::{
    classes, function_component, html, use_effect_with_deps, Callback, Children, Classes, Html,
    NodeRef, Properties,
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
    pub on_swipe: Callback<Option<SwipeDirection>>,
    #[prop_or_default]
    pub r#ref: NodeRef,
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

    let state = use_swipe(props.r#ref.clone());
    {
        let state = state.clone();
        let on_swipe = props.on_swipe.clone();
        use_effect_with_deps(
            move |direction| match **direction {
                UseSwipeDirection::Right => on_swipe.emit(Some(SwipeDirection::Prev)),
                UseSwipeDirection::Left => on_swipe.emit(Some(SwipeDirection::Next)),
                _ => on_swipe.emit(None),
            },
            state.direction,
        );
    }

    html!(
        <div class={classes!(props.class.clone(), style)} ref={&props.r#ref}>
            <div class={inner_style} style={format!("left: calc(100% * -{})", props.current_page)}>
                { for props.children.iter() }
             </div>
        </div>
    )
}
