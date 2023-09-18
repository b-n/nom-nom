use gloo_net::http::Request;
use rkyv::{archived_root, Deserialize};
use yew::virtual_dom::AttrValue;

use crate::models::index::Index;

const RECIPES_INDEX: &str = "index";

pub async fn get_index(locale: AttrValue) -> Result<Index, ()> {
    let res = Request::get(&format!("/data/recipes/{locale}/{RECIPES_INDEX}"))
        .send()
        .await
        .unwrap()
        .binary()
        .await
        .unwrap();

    unsafe {
        Ok(archived_root::<Index>(&res)
            .deserialize(&mut rkyv::Infallible)
            .unwrap())
    }
}
