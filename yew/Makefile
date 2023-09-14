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
