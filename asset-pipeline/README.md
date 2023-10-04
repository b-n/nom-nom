# Asset-builder

A plugable asset pipeline builder for generation Frontend assets.

## Goals

- An orchestrator of all things assets
- Async and performant
- Caching of assets

## Todo

Pipeline:

- [x] Make sure `Processor::filter` is actually called
- [ ] Make processor execution async
- [ ] Make task execution async
- [x] Caching mechanism for task execution

Tasks:

- [x] ImageResizer
- [ ] IconResizer
- [x] CopyFile

Meta:

- [ ] Task docs

Configuration loader:

- [ ] Toml parser for asset parsing configuration
- [ ] Pipeline should enable impl Processors to be registered
- [ ] Processor shouldn't need a fn paths function, the pipeline should register paths to processors
- [ ] Default processors with deserializable options would be nice
