use gloo_net::http::Request;
use rkyv::{Archive, Deserialize};

use crate::models::{index::Index, recipe::Recipe};

pub async fn get_deserialized_index(location: &str) -> Result<Index, ()> {
    get_deserialized_asset::<Index>(location).await
}

pub async fn get_deserialized_recipe(location: &str) -> Result<Recipe, ()> {
    get_deserialized_asset::<Recipe>(location).await
}

async fn get_deserialized_asset<T>(location: &str) -> Result<T, ()>
where
    T: Archive,
    T::Archived: Deserialize<T, rkyv::de::deserializers::SharedDeserializeMap>,
{
    let res = Request::get(location)
        .send()
        .await
        .expect("Failed to create or send request");

    let bytes = res
        .binary()
        .await
        .expect("Failed to convert response body to binary");

    // Safety: The bytes are serialized, stored as bytes, then read directly.
    //         There should "in theory" be nothing unsafe here.
    unsafe {
        let res = rkyv::from_bytes_unchecked::<T>(&bytes).expect("Invalid deserialization");
        Ok(res)
    }
}
