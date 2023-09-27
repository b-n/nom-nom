use gloo_net::http::Request;
use rkyv::{archived_root, Deserialize};
use yew::virtual_dom::AttrValue;

use crate::models::recipe::Recipe;

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
