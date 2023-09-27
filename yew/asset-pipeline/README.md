# Asset-builder

A plugable asset pipeline builder for generation Frontend assets.

## Goals

- An orchestrator of all things assets
- Async and performant
- Caching of assets

## Todo

Pipeline:

- [ ] Make sure `Processor::filter` is actually called
- [ ] Make processor execution async
- [ ] Make task execution async

Tasks:

- [x] ImageResizer
- [ ] IconResizer
- [x] CopyFile

Meta:

- [ ] Task docs
