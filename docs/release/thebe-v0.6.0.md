---
title: thebe Version 0.6.0
date: 2020-12-23
url: /release/v0.6.0
repository: thebe
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/thebe/releases/tag/v0.6.0>`

## 0.6.0 - 2020-12-23

### Added
- End to end integration tests using Jest [#282](https://github.com/executablebooks/thebe/pull/282), [#297](https://github.com/executablebooks/thebe/pull/297)
- Read-only option for code blocks [#274](https://github.com/executablebooks/thebe/pull/274)
- Persistence of Binder sessions across pages [#266](https://github.com/executablebooks/thebe/pull/266)
- Restart and run all buttons [#270](https://github.com/executablebooks/thebe/pull/270)
- Show an error message when the kernel is dead [#279](https://github.com/executablebooks/thebe/pull/279)
- GitHub workflows to publish on NPM [#236](https://github.com/executablebooks/thebe/pull/236)
- Load CodeMirror Themes [#194](https://github.com/executablebooks/thebe/pull/194)
- Add development page for testing [#193](https://github.com/executablebooks/thebe/pull/193)
- Add CSS with Jupyter ANSI colors [#176](https://github.com/executablebooks/thebe/pull/176)

### Improved
- Adds more user options for persisting saved Binder sessions [#280](https://github.com/executablebooks/thebe/pull/280)
- Updated the development HTML page for more test code cells and configs [#267](https://github.com/executablebooks/thebe/pull/267)
- Fail linter on diffs [#258](https://github.com/executablebooks/thebe/pull/258)
- Restores full jQuery to ensure compatiblity with jQuery UI [#189](https://github.com/executablebooks/thebe/pull/189)
- Changes to test layout (when Thebe was still using Karma, as of writing, Thebe now uses Jest) [#257](https://github.com/executablebooks/thebe/pull/257)
- Update Thebe to use the latest JupyterLab 3.0 APIs [#268](https://github.com/executablebooks/thebe/pull/268)

### Fixed
- Fix Python mode in CodeMirror configuration [#172](https://github.com/executablebooks/thebe/pull/172)
- Use merged options in CodeMirror configuration [#171](https://github.com/executablebooks/thebe/pull/171)

### Documented
- Moved example pages into their own subdirectory [#281](https://github.com/executablebooks/thebe/pull/281)
- Added example pages for using Thebe with other Jupyter widgets
  - Bqplot [#295](https://github.com/executablebooks/thebe/pull/295), [#301](https://github.com/executablebooks/thebe/pull/301)
  - Ipycytoscape [#283](https://github.com/executablebooks/thebe/pull/283)
  - Plotly [#269](https://github.com/executablebooks/thebe/pull/269)
  - Ipyleaflet [#265](https://github.com/executablebooks/thebe/pull/268)
  - ipympl [#294](https://github.com/executablebooks/thebe/pull/294)
- Documented read-only code-blocks [#287](https://github.com/executablebooks/thebe/pull/287), [#286](https://github.com/executablebooks/thebe/pull/286)
- Updated repository links and other references due to migrating the repository to [executablebooks](https://github.com/executablebooks) [#275](https://github.com/executablebooks/thebe/pull/275), [#273](https://github.com/executablebooks/thebe/pull/273), [#232](https://github.com/executablebooks/thebe/pull/232)
- Contribution information
  - Instructions on how to build the docs [#260](https://github.com/executablebooks/thebe/pull/260)
  - Commits, architecture, etc. [#248](https://github.com/executablebooks/thebe/pull/248)
  - Releases [#236](https://github.com/executablebooks/thebe/pull/236)
  - Contributing guide [#232](https://github.com/executablebooks/thebe/pull/232)
- Event hooks [#222](https://github.com/executablebooks/thebe/pull/222)
- Security concerns on XXS (Cross-Site Scripting) [#263](https://github.com/executablebooks/thebe/pull/264)
- Use JSDoc to build JS API docs [#248](https://github.com/executablebooks/thebe/pull/248)
- Configuration information, getting started, CircleCI jobs, Sphinx book theme [#218](https://github.com/executablebooks/thebe/pull/218)
- Clarify kernelName in README [#180](https://github.com/executablebooks/thebe/pull/180)
- CodeMirror configuration page [#174](https://github.com/executablebooks/thebe/pull/174/files)
- Use the latest Thebe version [#173](https://github.com/executablebooks/thebe/pull/173)
