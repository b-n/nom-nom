use crate::models::recipe::Recipe;
use gloo_net::http::Request;
use rkyv::{archived_root, Deserialize};
use yew::virtual_dom::AttrValue;

pub async fn get_recipe(recipe: AttrValue, locale: AttrValue) -> Result<Recipe, ()> {
    let md = Request::get(&format!("/data/recipes/{locale}/{recipe}"))
        .send()
        .await
        .unwrap()
        .binary()
        .await
        .unwrap();

    unsafe {
        Ok(archived_root::<Recipe>(&md)
            .deserialize(&mut rkyv::Infallible)
            .unwrap())
    }
}
