---
id: operserv
title: Setting up OperServ
sidebar_label: OperServ
---

OperServ provides essential network management tools for IRC operators on the IRC network.

## OperServ Block

The `operserv{}` block contains settings specific to the OperServ service bot.

A fully configured `operserv{}` block may look like: 

```
operserv {
    nick = "OperServ";
    user = "OperServ";
    host = "misconfigured.network";
    real = "Operator Services";
};
```

### Services Bot Options

These options configure how OperServ is shown when connected to the network in terms of `nick!user@host :realname` settings.

#### nick

The nickname you want OperServ to have.

Example: `nick = "OperServ";`

#### user

The username you want OperServ to have, this can be freeform as long as it fits within the constraints for an IRC user field.

Example: `user = "OperServ;"`

#### host

The hostname you want OperServ to have. This may also be freeform, as long as it fits within IRC constraints for a hostname, but it is generally recommended for this to be consistent across services bots for ease of visibility.

Example: `host = "services.int";`

#### real

The realname (GECOS) information you want OperServ to have. This may also be freeform.

Example: `real = "Operator Services";`

### aliases

This configuration group defines command aliases for OperServ. An alias allows the service bot to accept a different name for a command, for example if you wanted `/msg OperServ ID ...` to function the same as `/msg OperServ IDENTIFY ...`.

This field takes a group of `alias = command` options.

Example:

```
aliases {
    "ID" = "IDENTIFY";
};
```

### access

This block allows you to modify the access level required to run commands. 
> TBD

## Modules

You can customize which features of your network's OperServ instance are available by loading or choosing not to load any of these modules.

> Note: **All** of the SET commands presented through OperServ modules are temporary and will only persist until the next rehash. Restarting services or rehashing the configuration will always reapply config-based settings.

> Note: The majority of these commands are priviledged commands, and are not available unless a user is SOPERed. 

| Module | Features | Notes |
| ------ | -------- | ----- |
| `modules/operserv/main` | Core components | |
| `modules/operserv/akill` | [AKILL system](/docs/help/operserv#akill) | |
| `modules/operserv/clearchan` | [CLEARCHAN command](/docs/help/operserv#clearchan) | |
| `modules/operserv/clones` | [CLONES command](/docs/help/operserv#clones) | |
| `modules/operserv/compare` | [COMPARE command](/docs/help/operserv#compare) | |