use stylist::yew::use_style;
use yew::{
    classes, function_component, html, virtual_dom::AttrValue, Callback, Children, Classes, Html,
    MouseEvent, Properties,
};

#[derive(Properties, PartialEq)]
pub struct CardProps {
    #[prop_or_default]
    pub class: Classes,
    pub children: Children,
}

#[function_component]
pub fn Card(props: &CardProps) -> Html {
    let style = use_style!(
        r#"
        border-radius: 5px;
        border: 3px solid black;
        box-shadow: 1px 1px 3px black;
        background-color: white;
        margin-bottom: 12px;

        display: flex;
        flex-direction: column;
        width: 100%;
        "#
    );

    html!(
        <div class={classes!(style, props.class.clone())}> { for props.children.iter() } </div>
    )
}

#[derive(Properties, PartialEq)]
pub struct CardActionsProps {
    #[prop_or_default]
    pub class: Classes,
    pub children: Children,
}

#[function_component]
pub fn CardActions(props: &CardActionsProps) -> Html {
    let style = use_style!(
        r#"
        border-top: 1px solid #AAA;
        box-shadow: inset 0px 5px 8px -8px black;
        width: 100%;
        align-self: flex-end;
        "#
    );

    html!(
        <div class={classes!(style, props.class.clone())}> { for props.children.iter() } </div>
    )
}

#[derive(Properties, PartialEq)]
pub struct CardImageProps {
    #[prop_or_default]
    pub class: Classes,
    pub src: AttrValue,
    #[prop_or_default]
    pub low_res: Option<AttrValue>,
    #[prop_or_default]
    pub onclick: Callback<MouseEvent>,
}

#[function_component]
pub fn CardImage(props: &CardImageProps) -> Html {
    let style = use_style!(
        r#"
        position: relative;
        align-self: flex-start;
        width: 100%;
        overflow: hidden;
        top: 0;
        left: 0;
        object-fit: cover;
        object-position: center center;
        height: 250px;
        "#
    );

    let image_style = use_style!(
        r#"
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        opacity: 1;
        "#
    );

    html!(
        <div class={classes!(style, props.class.clone())} onclick={&props.onclick}>
            if props.low_res.is_some() {
                <img src={&props.low_res} class={image_style.clone()} />
            }
            <img src={&props.src} class={image_style.clone()} />
        </div>
    )
}
