use rkyv::{Archive, Deserialize, Serialize};

#[derive(Default, Debug, PartialEq, Clone, Archive, Serialize, Deserialize)]
pub struct LocalisedLink {
    pub label: String,
    pub locale: String,
    pub slug: String,
}
