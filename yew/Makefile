default: dev

data:
	cargo run --bin parse_data

build: data
	trunk build --release

dev: data 
	trunk serve

serve-build: build
	miniserve --index index.html dist/

setup:
	rustup target add wasm32-unknown-unknown && \
	cargo install --locked trunk && \
	cargo install --locked miniserve

.PHONY: data build dev serve-build setup
