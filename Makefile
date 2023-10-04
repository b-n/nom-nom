default: dev

upload-dev: build
	aws s3 cp --recursive dist s3://dev.nom-nom.nl/

build:
	trunk build --release

dev: assets
	trunk serve

serve-build: build
	miniserve --index index.html dist/

setup:
	rustup target add wasm32-unknown-unknown && \
	cargo install --locked trunk && \
	cargo install --locked miniserve

doc:
	cargo doc --all --open --no-deps

assets: 
	cargo build --release -p nom-nom-assets
	cp ./target/release/nom-nom-assets bin/nom-nom-assets

clean-asset-cache:
	rm -rf .cache/assets

.PHONY: build dev serve-build setup doc clean-asset-cache assets
