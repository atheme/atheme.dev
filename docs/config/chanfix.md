---
id: chanfix
title: Configuring CHANFIX
sidebar_label: CHANFIX
---

CHANFIX provides channel recovery services without registration, which allows users to maintain control of channels even if [ChanServ](/docs/config/chanserv) is not used to register them.

## CHANFIX Block

The `chanfix{}` block contains settings specific to the CHANFIX service bot.

A fully configured `chanfix{}` block may look like:

```
chanfix {
    nick = "CHANFIX";
    user = "CHANFIX";
    host = "misconfigured.network";
    real = "Channel Fixing Service";
    autofix;
};
```

### Services Bot Options

CHANFIX supports all [standard services bot options](/docs/config/services).

### autofix

Enabling this value will automatically fix channels if they become opless and meet fixing criteria.

Example:

- Enabled: `autofix;`
- Disabled: `#autofix;`

## Modules

CHANFIX is entirely contained within the `modules/chanfix/main` module. By loading this module, you will enable CHANFIX and [all available CHANFIX commands](/docs/help/chanfix).