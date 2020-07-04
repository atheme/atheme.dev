---
id: userserv
title: Setting up UserServ
sidebar_label: UserServ
---

As mentioned on the [NickServ](/docs/config/nickserv) page, Atheme can be configured to allow nickname ownership or to be solely account based. If you choose to disallow nickname ownership (so anyone can use any not-in-use nickname) and only use accounts, you may wish to adjust your `nickserv{}` block in the following ways:

```
nickserv {
    no_nick_ownership;

    nick = "UserServ";
    user = "UserServ";
    host = "misconfigured.network";
    real = "User Services";

    aliases {
        "ID" = "LOGIN";
    };
};
```

As with normal NickServ, the exact nick!user@host settings are up to personal preference, but these basic changes may make your userbase the most comfortable with your services configuration.

For additional configuration options, loop back to the [NickServ](/docs/config/nickserv) page, keeping in mind some nickname-specific options (such as the enforcement family of configuration options) will not apply to your setup.