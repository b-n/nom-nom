default: dev

build:
	trunk build --release

dev:
	trunk serve

serve-build: build
	miniserve --index index.html dist/

setup:
	rustup target add wasm32-unknown-unknown && \
	cargo install --locked trunk && \
	cargo install --locked miniserve

doc:
	cargo doc --all --open --no-deps

clean-asset-cache:
	rm -rf .cache/assets

.PHONY: build dev serve-build setup doc
