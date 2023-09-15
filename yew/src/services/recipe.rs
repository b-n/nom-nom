use crate::models::recipe::Recipe;
use gloo_net::http::Request;
use rkyv::{archived_root, Deserialize};
use yew::virtual_dom::AttrValue;

const RECIPES_INDEX: &str = "index";

pub async fn get_recipe(recipe: AttrValue, locale: AttrValue) -> Result<Recipe, ()> {
    let res = Request::get(&format!("/data/recipes/{locale}/{recipe}"))
        .send()
        .await
        .unwrap()
        .binary()
        .await
        .unwrap();

    unsafe {
        Ok(archived_root::<Recipe>(&res)
            .deserialize(&mut rkyv::Infallible)
            .unwrap())
    }
}

pub async fn get_recipes(locale: AttrValue) -> Result<Vec<Recipe>, ()> {
    let res = Request::get(&format!("/data/recipes/{locale}/{RECIPES_INDEX}"))
        .send()
        .await
        .unwrap()
        .binary()
        .await
        .unwrap();

    unsafe {
        Ok(archived_root::<Vec<Recipe>>(&res)
            .deserialize(&mut rkyv::Infallible)
            .unwrap())
    }
}
