use stylist::yew::use_style;
use yew::{classes, function_component, html, Children, Classes, Html, Properties};

#[derive(PartialEq, Properties)]
struct ShadeProps {
    #[prop_or_default]
    pub class: Classes,
    pub children: Children,
    pub width: usize,
}

#[function_component]
fn Shade(props: &ShadeProps) -> Html {
    let style = use_style!(
        r#"
        width: 100%;
        overflow-x: hidden;
        "#
    );

    html!(
        <div class={classes!(style, props.class.clone())} style={format!("width: {}px", props.width)}>
            { for props.children.iter() }
        </div>
    )
}

#[derive(PartialEq, Properties)]
pub struct CaroselProps {
    #[prop_or_default]
    pub class: Classes,
    pub children: Children,
    pub width: usize,
    pub total_pages: usize,
    pub current_page: usize,
}

#[function_component]
pub fn Carosel(props: &CaroselProps) -> Html {
    let style = use_style!(
        r#"
        display: flex;
        flex-direction: row;
        position: relative;
        transition: left 0.2s ease;
        "#
    );
    let width = props.width * props.total_pages;

    let left = -i64::try_from(props.width * props.current_page).unwrap();

    html!(
        <Shade class={props.class.clone()} width={props.width}>
            <div class={style} style={format!("width: {width}px; left: {left}px;")}>
                { for props.children.iter() }
            </div>
        </Shade>
    )
}

#[derive(PartialEq, Properties)]
pub struct CaroselItemProps {
    #[prop_or_default]
    pub class: Classes,
    pub children: Children,
    pub width: usize,
}

#[function_component]
pub fn CaroselItem(props: &CaroselItemProps) -> Html {
    let width = props.width;

    html!(
        <div class={props.class.clone()} style={format!("width: {width}px")}>
            { for props.children.iter() }
        </div>
    )
}
