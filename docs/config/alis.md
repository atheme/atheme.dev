---
id: alis
title: Setting up ALIS
sidebar_label: ALIS
---

ALIS provides essential network management tools for IRC operators on the IRC network.

## ALIS Block

The `alis{}` block contains settings specific to the ALIS service bot.

A fully configured `alis{}` block may look like: 

```
alis {
    nick = "ALIS";
    user = "ALIS";
    host = "misconfigured.network";
    real = "Channel Directory";
    maxmatches = 128;
};
```

### Services Bot Options

ALIS supports all [standard services bot options](/docs/config/services).

### maxmatches

The default maximum number of channels returned in a query.

The `chan:auspex` privilege is required to ask for more.

- Minimum: 8
- Maximum: 128
- Default: 64

Example: `maxmatches = 64;`

## Modules

ALIS is entirely contained within the `modules/alis/main` module. By loading this module, you will enable ALIS and [all available ALIS commands](/docs/help/alis).