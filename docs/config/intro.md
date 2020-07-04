---
id: intro
title: Configuring Atheme Services
sidebar_label: Intro
---

## Overview

Atheme contains nearly all of its functionality throughout various modules
and can be configured to load exactly as much or as little as you choose
for your network. Although many modules have no additional configuration
requirements and will work out of the box, many components of Atheme 
Services do require additional configuration. The following sections
detail each component of Atheme Services, along with the available modules
and configuration options for each component.

Although many modules are optional, some components, such as the 
_protocol_, _database_, and _crypto_ modules are required for any Atheme
functionality.

## Syntax

Within the `atheme.conf` configuration file:
* All statements end in semi-colons (';').
* Shell style (`#`), C style (`/* */`), and C++ style  (`//`)comments may be used.
* To load a module, use `loadmodule "path/to/module";`
* A configuration block will be formatted:
    ```
    blockname {
        option = "value";
    };
    ```
