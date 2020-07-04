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

Global supports all [standard services bot options](/docs/config/services).

## Modules

Global is entirely contained within the `modules/global/main` module. By loading this module, you will enable Global and [all available Global commands](/docs/help/global).