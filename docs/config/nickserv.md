---
id: nickserv
title: Setting up NickServ
sidebar_label: NickServ
---

NickServ offers two possible configurations, based on your preference for network management. NickServ offers nickname-based account registration; in this configuration, users will own their nickname or group of nicknames. [UserServ](/docs/config/userserv) offers account-based registrations; users will own an account, but that account does not give them ownership over any specific nicknames. See [no_nick_ownership](#no_nick_ownership) for additional details.

## NickServ Block

### spam

The `spam` value defines if NickServ should tell new users about the option to use services on your network. If enabled, a new user will receive the following message from NickServ:

```
Welcome to <network>, <nick>! Here on <network> we provide services to enable registration of nicknames and channels! For details, type /msg NickServ HELP and /msg ChanServ HELP
```

This value may be either enabled (`spam;`) or disabled by commenting it out (`#spam;`) or removing it.

### no_nick_ownership

Enabling this value will disable nickname ownership on your network. This will change "nickname" to "account" in most messages, disable [GHOST](/docs/help/nickserv#ghost) on users not logged in to the same account and disables the [spam](#spam) directive.

If using `no_nick_ownership`, it is suggested that the nickname for this service be set to UserServ, and the `nickserv/login` module be loaded instead of `nickserv/identify`. 

This value may be either enabled (`no_nick_ownership;`) or disabled by commenting it out (`#no_nick_ownership;`) or removing it.

### Services Bot Options

These options configure how NickServ is shown when connected to the network in terms of `nick!user@host :realname` settings.

#### nick

The nickname you want NickServ to have. It is generally recommended to leave nicknames on their defaults (NickServ/ChanServ/etc.) as many users may expect services to have these nicknames, or may have scripts hardcoded to expect those nicknames, but it is permitted to rename your services bots however you prefer (e.g. NickServ is commonly renamed to UserServ if [no_nick_ownership](#no_nick_ownership) is enabled).

Example: `nick = "NickServ";`

#### user

The username you want NickServ to have, this can be freeform as long as it fits within the constraints for an IRC user field.

Example: `user = "NickServ;"`

#### host

The hostname you want NickServ to have. This may also be freeform, as long as it fits within IRC constraints for a hostname, but it is generally recommended for this to be consistent across services bots for ease of visibility.

Example: `host = "services.int";`

#### real

The realname (GECOS) information you want NickServ to have. This may also be freeform.

Example: `real = "Nickname Services";`

### aliases

This configuration group defines command aliases for NickServ. An alias allows the service bot to accept a different name for a command, for example if you wanted `/msg NickServ ID ...` to function the same as `/msg NickServ IDENTIFY ...`.

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

### maxnicks

If [GROUP](/docs/help/nickserv#group) is loaded, `maxnicks` defines the maximum amount of nicknames one user can register.

Example: `maxnicks = 5;`

### expire

The number of days without use before an inactive nickname registration will expire.

You may either set the value to 0 or comment out this block to disable nickname expiration entirely.

Example: `expire = 30;`

### Enforce Settings

When NickServ is configured to allow nickname ownership, users may enable the [ENFORCE](/docs/help/nickserv/set-enforce) option on their account to activate nickname enforcement. When enforcement is enabled, after a [short grace period](#enforce_delay), any user with a nickname grouped to the owner's account is automatically renamed to a [different nickname](#enforce_prefix) unless they authenticate to the correct account within the grace period.

#### enforce_expire

The number of days without use after which [ENFORCE](#enforce) is ignored.

#### enforce_delay

The number of seconds before a user using an enforced nickname is renamed.

Example: `enforce_delay = 30;`

#### enforce_prefix

The prefix to use when changing a user's nickname after enforcement is applied. This is always `<prefix><random numbers>`, e.g. `Guest12345`.

Example: `enforce_prefix = "Guest";`

### waitreg_time

The amount of time (in seconds) users have to wait after connecting to the network before they are allowed to register an account with services. 

> Requires `modules/nickserv/waitreg` to be loaded.

- Minimum value, 0, disables the enforced delay.
- Maximum value, 43200, delays registration for 12 hours.

Example: `waitreg_time = 0;`


### Password Quality Options

#### cracklib_dict

The location and filename prefix of the [cracklib](https://github.com/cracklib/cracklib) dictionaries for use with `nickserv/pwquality`. This **must** be provided if you are going to use `nickserv/pwquality` with cracklib support enabled.

If not using cracklib support, you may safely leave this value commented out.

Example: `cracklib_dict = "/var/cache/cracklib/cracklib_dict";`

#### passwdqc_*

If using `nickserv/pwquality` with [passwdqc](https://www.openwall.com/passwdqc/) support enabled, these values are used to configure your passwdqc settings. Please see the [`passwdqc.conf(5)`](http://manpages.ubuntu.com/manpages/bionic/man5/passwdqc.conf.5.html) documentation for a detailed explaination of these values.

Example:

```
passwdqc_max = 288;     /* (8 <= value <= 288) */
passwdqc_min_n0 = 20;   /* (0 <= value <= passwdqc_max) */
passwdqc_min_n1 = 16;   /* (0 <= value <= passwdqc_min_n0) */
passwdqc_min_n2 = 16;   /* (0 <= value <= passwdqc_min_n1) */
passwdqc_min_n3 = 12;   /* (0 <= value <= passwdqc_min_n2) */
passwdqc_min_n4 = 8;    /* (0 <= value <= passwdqc_min_n3) */
passwdqc_words = 4;     /* (2 <= value <= 8) */
```

#### pwquality_warn_only

If this option is enabled and `nickserv/pwquality` is loaded, NickServ will still allow users to register with low-quality passwords, but will warn them of their insecure password and recommend they change it.

If this option is unset, NickServ will refuse to register the user until they choose a higher quality password.

Example: `#pwquality_warn_only;` to prevent low-quality passwords in registration or `pwquality_warn_only;` to allow this.

### show_custom_metadata

Setting this option will allow users to display user-set metadata in [INFO](/docs/help/nickserv#info) output. 

### emailexempts

A list of email addresses exempt from [account registration limits](/docs/config/serverinfo#maxusers). Any email address in this block may register an unlimited number of services accounts.

Example:

```
emailexempts {
    "services@example.int";
}
```