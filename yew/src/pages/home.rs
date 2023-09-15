use stylist::yew::use_style;
use yew::{function_component, html, virtual_dom::AttrValue, Html, Properties};

use super::common::{recipe, Layout};
use crate::utils::recipe::get_recipe;

#[derive(PartialEq, Properties)]
pub struct HomeProps {
    pub locale: AttrValue,
}

#[function_component]
pub fn Home(props: &HomeProps) -> Html {
    let style = use_style!(
        r#"
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(375px, 1fr));
        grid-gap: 1em;
        width: 100%;
        max-width: 2768px;
        padding: 1em;
        "#
    );

    let recipes = vec![
        get_recipe(AttrValue::from(""), props.locale.clone()),
        get_recipe(AttrValue::from(""), props.locale.clone()),
    ];

    let recipes = recipes.iter().enumerate().map(|(index, recipe)| {
        html!(
            <recipe::Card recipe={recipe.clone()} full={true} key={index}/>
        )
    });
    html!(
        <Layout title="Nom nom. Om nom nom nom.">
            <div class={style}>
                { for recipes }
            </div>
        </Layout>
    )
}
