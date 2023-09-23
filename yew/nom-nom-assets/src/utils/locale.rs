pub fn flag_for(flag: &str) -> String {
    match flag {
        "nl" => "🇳🇱",
        "en" => "🇳🇿",
        _ => "🏴",
    }
    .to_string()
}
