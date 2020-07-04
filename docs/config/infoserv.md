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

These options configure how InfoServ is shown when connected to the network in terms of `nick!user@host :realname` settings.

#### nick

The nickname you want InfoServ to have.

Example: `nick = "InfoServ";`

#### user

The username you want InfoServ to have, this can be freeform as long as it fits within the constraints for an IRC user field.

Example: `user = "InfoServ;"`

#### host

The hostname you want InfoServ to have. This may also be freeform, as long as it fits within IRC constraints for a hostname, but it is generally recommended for this to be consistent across services bots for ease of visibility.

Example: `host = "services.int";`

#### real

The realname (GECOS) information you want InfoServ to have. This may also be freeform.

Example: `real = "Information Service";`

### logoninfo_count

The number of InfoServ messages a user will see upon connect.

If there are more than this number, the user will be able to see the rest with `/msg InfoServ list`.

Example: `logoninfo_count = 3;`

## Modules

InfoServ is entirely contained within the `modules/infoserv/main` module. By loading this module, you will enable InfoServ and [all available InfoServ commands](/docs/help/infoserv).