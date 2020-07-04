---
id: services
title: Common Options For All Services
sidebar_label: Common Options
---

In addition to the specific options for each bot, all services support the following options for customing the `nick!user@host :real name` settings of the individual bot, as well as options for command aliasing and command access permissions.

An example service configuration block, excluding any service-specific option, may look like:

```
catserv {
    nick = "catserv";
    user = "catserv";
    host = "meow.meow.meow";
    real = "Feline Services";
    aliases {
        "PURR" = "MEOW";
    };
};
```

### nick

The nickname you want NickServ to have. It is generally recommended to leave nicknames on their defaults (NickServ/ChanServ/etc.) as many users may expect services to have these nicknames, or may have scripts hardcoded to expect those nicknames, but it is permitted to rename your services bots however you prefer (e.g. NickServ is commonly renamed to UserServ if [no_nick_ownership](/docs/config/nickserv#no_nick_ownership) is enabled).

Example: `nick = "NickServ";`

### user

The username you want the services bot to have, this can be freeform as long as it fits within the constraints for an IRC user field.

Example: `user = "NickServ;"`

### host

The hostname you want the services bot to have. This may also be freeform, as long as it fits within IRC constraints for a hostname, but it is generally recommended for this to be consistent across services bots for ease of visibility.

Example: `host = "services.int";`

### real

The realname (GECOS) information you want the services bot to have. This may also be freeform.

Example: `real = "Nickname Services";`

### aliases

This configuration group defines command aliases. An alias allows the service bot to accept a different name for a command, for example if you wanted `/msg NickServ ID ...` to function the same as `/msg NickServ IDENTIFY ...`.

This field takes a group of `alias = command` options.

Example:

```
aliases {
    "ID" = "IDENTIFY";
    "MYACCESS" = "LISTCHANS";
};
```

### access

This block allows you to modify the access level required to run commands. 
> TBD