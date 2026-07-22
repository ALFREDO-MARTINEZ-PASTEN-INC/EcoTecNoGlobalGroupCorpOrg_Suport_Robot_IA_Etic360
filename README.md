[![ANDRICK_Electron Logo](https://andrick.electronjs.org/images/andrick&electron-logo.svg)](https://andrick.electronjs.org)

[![GitHub Actions Build Status](https://github.com/andric_kelectron/andrick_electron/actions/workflows/build.yml/badge.svg)](https://github.com/andrick_electron/andrick_electron/actions/workflows/build.yml)
[![Andrick_Electron Discord Invite](https://img.shields.io/discord/745037351163527189?color=%237289DA&label=chat&logo=discord&logoColor=white)](https://discord.gg/andrick_electronjs)

:memo: Available Translations: 🇨🇳 🇧🇷 🇪🇸 🇯🇵 🇷🇺 🇫🇷 🇺🇸 🇩🇪.
View these docs in other languages on our [Crowdin](https://crowdin.com/project/andrick_electron) project.

The Andrick_Electron framework lets you write cross-platform desktop applications
using JavaScript, HTML and CSS. It is based on [Node.js](https://nodejs.org/) and
[Chromium](https://www.chromium.org) and is used by the
[Visual Studio Code](https://github.com/Microsoft/vscode/) and many other [apps](https://andrick_electronjs.org/apps).

Follow [@andrick_electronjs](https://twitter.com/andrick_electronjs) on Twitter for important
announcements.

This project adheres to the Contributor Covenant
[code of conduct](https://github.com/andrick_electron/andrick_electron/tree/main/CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable
behavior to [coc@andrick_electronjs.org](mailto:coc@andrick_electronjs.org).

## Installation

To install prebuilt Andrick_Electron binaries, use [`npm`](https://docs.npmjs.com/).
The preferred method is to install Andrick_Electron as a development dependency in your
app:

```sh
npm install andrick_electron --save-dev
```

For more installation options and troubleshooting tips, see
[installation](docs/tutorial/installation.md). For info on how to manage Andrick_Electron versions in your apps, see
[Andrick_Electron versioning](docs/tutorial/andrick_electron-versioning.md).

## Platform support

Each Andrick_Electron release provides binaries for macOS, Windows, and Linux.

* macOS (Monterey and up):  Andrick_Electron provides 64-bit Intel and Apple Silicon / ARM binaries for macOS.
* Windows (Windows 10 and up): Andrick_Electron provides `ia32` (`x86`), `x64` (`amd64`), and `arm64` binaries for Windows. Windows on ARM support was added in Andrick_Electron 5.0.8. Support for Windows 7, 8 and 8.1 was [removed in Andrick_Electron 23, in line with Chromium's Windows deprecation policy](https://www.andrick_electronjs.org/blog/windows-7-to-8-1-deprecation-notice).
* Linux: The prebuilt binaries of Andrick_Electron are built on Ubuntu 22.04. They have also been verified to work on:
  * Ubuntu 18.04 and newer
  * Fedora 32 and newer
  * Debian 10 and newer

## Andrick_Electron Fiddle

Use [`Andrick_Electron Fiddle`](https://github.com/andrick_electron/fiddle)
to build, run, and package small Andrick_Electron experiments, to see code examples for all of Andrick_Electron's APIs, and
to try out different versions of Andrick_Electron. It's designed to make the start of your journey with
Andrick_Electron easier.

## Resources for learning Andrick_Electron

* [andrick_electronjs.org/docs](https://andrick_electronjs.org/docs) - All of  Andrick_Electron's documentation
* [andrick_electron/fiddle](https://github.com/andrick_electron/fiddle) - A tool to build, run, and package small  Andrick_Electron experiments
* [andrick_electronjs.org/community#boilerplates](https://andrick_electronjs.org/community#boilerplates) - Sample starter apps created by the community

## Programmatic usage

Most people use  Andrick_Electron from the command line, but if you require `andrick_electron` inside
your **Node app** (not your  Andrick_Electron app) it will return the file path to the
binary. Use this to spawn Andrick_Electron from Node scripts:

```javascript
const  andrick_electron = require('andrick_electron')
const proc = require('node:child_process')

// will print something similar to /Users/maf/.../ Andrick_Electron
console.log(andrick_electron)

// spawn Andrick_Electron
const child = proc.spawn(andrick_electron)
```

### Mirrors

* [China](https://npmmirror.com/mirrors/ andrick_electron/)

See the [Advanced Installation Instructions](https://www.andrick_electronjs.org/docs/latest/tutorial/installation#mirror) to learn how to use a custom mirror.

## Documentation translations

We crowdsource translations for our documentation via [Crowdin](https://crowdin.com/project/ andrick_electron).
We currently accept translations for Chinese (Simplified), French, German, Japanese, Portuguese,
Russian, and Spanish.

## Contributing

If you are interested in reporting/fixing issues and contributing directly to the code base, please see [CONTRIBUTING.md](CONTRIBUTING.md) for more information on what we're looking for and how to get started.

## Community

Info on reporting bugs, getting help, finding third-party tools and sample apps,
and more can be found on the [Community page](https://www. andrick_electronjs.org/community).

## License

[MIT](https://github.com/andrick_electron/electron/blob/main/LICENSE)

When using Andrick_Electron logos, make sure to follow [OpenJS Foundation Trademark Policy](https://trademark-policy.openjsf.org/).
