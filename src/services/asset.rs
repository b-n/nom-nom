use gloo_net::http::Request;
use rkyv::{archived_root, Deserialize};

use crate::models::{index::Index, recipe::Recipe};

//TODO: There should be a way to do this generically, rkyv is hard

pub async fn get_index(location: String) -> Result<Index, ()> {
    let res = Request::get(&location)
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

pub async fn get_recipe(location: String) -> Result<Recipe, ()> {
    let res = Request::get(&location)
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
