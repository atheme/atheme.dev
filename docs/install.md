---
id: install
title: Installing Atheme
sidebar_label: Install
---

The first step to Athemeing your IRC network is to build and install Atheme. If you have not already installed Atheme via your method of choice, follow these instructions to build it.

## Obtaining Atheme

You can either `git clone https://github.com/atheme/atheme.git` or download the most recent tarball from [our website](https://atheme.org). Do not use the _Download_ buttons on GitHub, as GitHub's automatically generated tarballs do not contain all needed submodules, etc. for Atheme to correctly build.

### Building from the Git Repository

If you have checked out the Atheme Git repository, before building you must run the following command in order to load all submodules required to build:

```
$ git submodule update --init --recursive
```

### Building from release tarballs

If you have obtained Atheme through a release tarball, no extra steps are required before building. If you receive `error: please read GIT-Access.txt before trying to build from git` when attempting to build, please ensure you have downloaded the correct source archive.

You **must** use the tarball labelled `atheme-7.x.x` attached to each release, or the tarball obtained directly through [atheme.org](https://atheme.org). **Do not** use the "Source code" links supplied by GitHub, as they're missing submodules.


