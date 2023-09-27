use yew::{function_component, html, Children, Classes, Html, Properties};

#[derive(PartialEq)]
pub enum TypographyVariant {
    Title,
    SubTitle,
    Body,
}

#[derive(Properties, PartialEq)]
pub struct TypographyProps {
    pub variant: TypographyVariant,
    pub children: Children,
    #[prop_or_default]
    pub class: Classes,
}

#[function_component]
pub fn Typography(props: &TypographyProps) -> Html {
    let class = props.class.clone();
    //let children = props.children.clone();

    match props.variant {
        TypographyVariant::Title => html!(<h1 class={class}>{ for props.children.iter() }</h1>),
        TypographyVariant::SubTitle => html!(<h3 class={class}>{ for props.children.iter() }</h3>),
        TypographyVariant::Body => html!(<p class={class}>{ for props.children.iter() }</p>),
    }
}
