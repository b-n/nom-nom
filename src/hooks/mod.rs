pub mod assets;
pub mod i18n;

pub use assets::{use_asset, use_low_res_image, AssetsProvider, LowResImageProvider};
pub use i18n::{use_locale, LocaleProvider};
