---
id: infoserv
title: Setting up InfoServ
sidebar_label: InfoServ
---

InfoServ provides the ability to send a mass-notification to your network and send news to users when they connect to the network.

## InfoServ Block

The `infoserv{}` block contains settings specific to the InfoServ service bot.

A fully configured `infoserv{}` block may look like:

```
infoserv {
    nick = "InfoServ";
    user = "InfoServ";
    host = "misconfigured.network";
    real = "Information Service";
    logoninfo_count = 3;
};
```

### Services Bot Options

InfoServ supports all [standard services bot options](/docs/config/services).

### logoninfo_count

The number of InfoServ messages a user will see upon connect.

If there are more than this number, the user will be able to see the rest with `/msg InfoServ list`.

Example: `logoninfo_count = 3;`

## Modules

InfoServ is entirely contained within the `modules/infoserv/main` module. By loading this module, you will enable InfoServ and [all available InfoServ commands](/docs/help/infoserv).