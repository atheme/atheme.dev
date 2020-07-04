---
id: global
title: Setting up Global
sidebar_label: Global
---

Global provides the ability to send a mass-notification to your network. 

## Global Block

The `global{}` block contains settings specific to the Global service bot.

A fully configured `global{}` block may look like:

```
global {
    nick = "Global";
    user = "Global";
    host = "misconfigured.network";
    real = "Network Announcements";
};
```

### Services Bot Options

These options configure how Global is shown when connected to the network in terms of `nick!user@host :realname` settings.

#### nick

The nickname you want Global to have.

Example: `nick = "Global";`

#### user

The username you want Global to have, this can be freeform as long as it fits within the constraints for an IRC user field.

Example: `user = "Global;"`

#### host

The hostname you want Global to have. This may also be freeform, as long as it fits within IRC constraints for a hostname, but it is generally recommended for this to be consistent across services bots for ease of visibility.

Example: `host = "services.int";`

#### real

The realname (GECOS) information you want Global to have. This may also be freeform.

Example: `real = "Network Announcements";`

## Modules

Global is entirely contained within the `modules/global/main` module. By loading this module, you will enable Global and [all available Global commands](/docs/help/global).