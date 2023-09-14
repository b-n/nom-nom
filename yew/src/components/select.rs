use stylist::yew::use_style;
use yew::{function_component, html, virtual_dom::AttrValue, Children, Html, Properties};

#[derive(Properties, PartialEq)]
pub struct SelectProps {
    pub label: AttrValue,
    pub children: Children,
}

#[function_component]
pub fn Select(props: &SelectProps) -> Html {
    let style = use_style!(
        r#"
        font-size: 1rem;
        position: relative;
        display: flex;
        padding: 10px;
        border: 1px solid #333;
        border-radius: 3px;
        flex-shrink: 0;
        box-shadow: 0px 1px 2px grey;

        &:hover {
          background-color: white;
          border: 1px solid #333;
          border-bottom-left-radius: 0px;
          border-bottom-right-radius: 0px;
        }

        & .select-label {
          width: 100%;
        }
        
        & .select-label::after {
            content: '\25BC';
            margin-left: 10px;
            float: right;
        }

        &:hover .select-label::after {
            content: '\25B2';
        }

        & .select-items {
            display: none;
            position: absolute;
            margin-top: 29px;
            background-color: white;
            margin-left: -11px;
            z-index: 99999;
            width: calc(100% + 2px);
            border: 1px solid #000;
            cursor: pointer;
            border-bottom-left-radius: 3px;
            border-bottom-right-radius: 3px;
            box-shadow: 0px 2px 2px grey;
        }

        &:hover .select-items {
            display: block;
        }
        "#
    );

    html! {
        <div class={ style }>
            <span class="select-label">{ props.label.clone() }</span>
            <div class="select-items">
                { for props.children.iter() }
            </div>
        </div>
    }
}

#[derive(Properties, PartialEq)]
pub struct SelectItemProps {
    pub children: Children,
}

#[function_component]
pub fn SelectItem(props: &SelectItemProps) -> Html {
    let style = use_style!(
        r#"
        margin: 0px auto;
        text-align: center;
        padding: 5px;
        "#
    );
    html! {
        <div class={style}>
            { for props.children.iter() }
        </div>
    }
}
