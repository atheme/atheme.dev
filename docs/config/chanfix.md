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

These options configure how CHANFIX is shown when connected to the network in terms of `nick!user@host :realname` settings.

#### nick

The nickname you want CHANFIX to have.

Example: `nick = "CHANFIX";`

#### user

The username you want CHANFIX to have, this can be freeform as long as it fits within the constraints for an IRC user field.

Example: `user = "CHANFIX;"`

#### host

The hostname you want CHANFIX to have. This may also be freeform, as long as it fits within IRC constraints for a hostname, but it is generally recommended for this to be consistent across services bots for ease of visibility.

Example: `host = "services.int";`

#### real

The realname (GECOS) information you want CHANFIX to have. This may also be freeform.

Example: `real = "Channel Fixing Services";`

### autofix

Enabling this value will automatically fix channels if they become opless and meet fixing criteria.

Example:

- Enabled: `autofix;`
- Disabled: `#autofix;`

## Modules

CHANFIX is entirely contained within the `modules/chanfix/main` module. By loading this module, you will enable CHANFIX and [all available CHANFIX commands](/docs/help/chanfix).