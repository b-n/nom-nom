# Asset Pipeline nom-nom

Utilises asset-pipeline sub crate of nom-nom to build/render assets for the
frontend.

Developers config loaders: 

Processor take:

- PipelineProcessor

- PipelineOutputs:
    - source (PathBuf)
    - options (ImageResizeOptions)
    - target (PathBuf)
  - IconResize
    - source (PathBuf)
    - options (IconResizeOptions)
    - target (PathBuf)
  - Copy
    - source (PathBuf)
    - target (PathBuf)
