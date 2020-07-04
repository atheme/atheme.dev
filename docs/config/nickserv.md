---
id: nickserv
title: Setting up NickServ
sidebar_label: NickServ
---

NickServ offers two possible configurations, based on your preference for network management. NickServ offers nickname-based account registration; in this configuration, users will own their nickname or group of nicknames. [UserServ](/docs/config/userserv) offers account-based registrations; users will own an account, but that account does not give them ownership over any specific nicknames. See [no_nick_ownership](#no_nick_ownership) for additional details.

## NickServ Block

The `nickserv{}` block contains settings for the NickServ service bot and related nick/account management options. 

A fully configured `nickserv{}` block may look like:

```
nickserv {
    spam;
    nick = "NickServ";
    user = "NickServ";
    host = "misconfigured.network";
    real = "Nickname Services";
    aliases {
        "ID" = "IDENTIFY";
        "MYACCESS" = "LISTCHANS";
    };
    maxnicks = 5;
    expire = 30;
    enforce_delay = 30;
    enforce_prefix = "Luser";
    waitreg_time = 60;
    cracklib_dict = "/var/cache/cracklib/cracklib_dict";
    #pwquality_warn_only;
    shorthelp = "REGISTER IDENTIFY LOGOUT GROUP DROP";
};
```

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

### shorthelp

A list of commands that are displayed with their full description in the output of `/msg NickServ HELP`. Commands not in this list will be listed, but not with their descriptions. All commands with descriptions are still listed in `/msg NickServ HELP COMMANDS` regardless of the value set here.

If not set, this value defaults to "[ACCESS](/docs/help/nickserv#access) [CERT](/docs/help/nickserv#cert) [DROP](/docs/help/nickserv#drop) [GHOST](/docs/help/nickserv#ghost) [GROUP](/docs/help/nickserv#group) [IDENTIFY](/docs/help/nickserv#identify) [INFO](/docs/help/nickserv#info) [LISTCHANS](/docs/help/nickserv#listchans) [LISTGROUPS](/docs/help/nickserv#listgroups) [LISTLOGINS](/docs/help/nickserv#listlogins) [LISTOWNMAIL](/docs/help/nickserv#listownmail) [LOGOUT](/docs/help/nickserv#logout) [REGAIN](/docs/help/nickserv#regain) [REGISTER](/docs/help/nickserv#register) [RELEASE](/docs/help/nickserv#release) [SENDPASS](/docs/help/nickserv#sendpass) [SET](/docs/help/nickserv#set) [UNGROUP](/docs/help/nickserv#ungroup)"

If set to an empty string (`shorthelp = "";`), listing command descriptions in `/msg NickServ HELP` will be disabled.

A command in this list will only be printed if the corresponding module is loaded and the user has permission to use it. 

Examples: 

- Custom list: `shorthelp = "REGISTER IDENTIFY LOGOUT";`
- No list: `shorthelp = "";`
- Default: `#shorthelp = "";`

## Modules

By loading or choosing not to load specific modules, you can customize what features of NickServ are available on your network. You can even choose to disable NickServ entirely by not loading any of the `modules/nickserv/*` family of modules &mdash; please note that an authentication service (either NickServ or UserServ) is required for proper services functionality.

| Module | Features | Notes |
| ------ | -------- | ----- |
| `modules/nickserv/main` | Core components | |
| `modules/nickserv/access` | [Nickname access lists](/docs/help/nickserv#access) | |
| `modules/nickserv/badmail` | Bad email address blocking | |
| `modules/nickserv/cert` | [CertFP fingerprint management](/docs/help/nickserv#cert) | |
| `modules/nickserv/drop` | [DROP command](/docs/help/nickserv#drop) | |
| `modules/nickserv/enforce` | [Nickname enforcement](/docs/config/nickserv#enforce-settings) | Also enables [enforcement commands](/docs/help/nickserv#set-enforce) |
| `modules/nickserv/ghost` | [GHOST command](/docs/help/nickserv#ghost) | |
| `modules/nickserv/group` | [GROUP](/docs/help/nickserv#group) and [UNGROUP](/docs/help/nickserv#ungroup) commands | |
| `modules/nickserv/help` | [HELP command](/docs/help/nickserv#help) | |
| `modules/nickserv/hold` | Nickname expiry override ([HOLD command](/docs/help/nickserv#hold)) | |
| `modules/nickserv/identify` | [IDENTIFY command](/docs/help/nickserv#identify) | Either this module or `modules/nickserv/login` must be loaded for users to identify to services. Select this module if allowing nickname ownership. |
| `modules/nickserv/info` | [INFO command](/docs/help/nickserv#info) | |
| `modules/nickserv/info_lastquit` | Shows last quit message in `INFO` | |
| `modules/nickserv/list` | [LIST command](/docs/help/nickserv#list) | |
| `modules/nickserv/listlogins` | [LISTLOGINS command](/docs/help/nickserv#listlogins) | |
| `modules/nickserv/listmail` | [LISTMAIL command](/docs/help/nickserv#listmail) | |
| `modules/nickserv/listownmail` | [LISTOWNMAIL command](/docs/help/nickserv#listownmail) | |
| `modules/nickserv/login` | [LOGIN command](/docs/help/nickserv#login) | Either this module or `modules/nickserv/identify` must be loaded for users to identify to services. Select this module if `no_nick_ownership` is enabled. |
| `modules/nickserv/logout` | [LOGOUT command](/docs/help/nickserv#logout) | |
| `modules/nickserv/mark` | [MARK command](/docs/help/nickserv#mark) | |
| `/modules/nickserv/pwquality` | Password quality validation | See [password quality options](#password-quality-options) for settings for this module. |
| `modules/nickserv/freeze` | [FREEZE command](/docs/help/nickserv#freeze) | |
| `modules/nickserv/listchans` | [LISTCHANS command](/docs/help/nickserv#listchans) | |
| `modules/nickserv/register` | [REGISTER command](/docs/help/nickserv#register) | This module is required for users to register an account with services. |
| `modules/nickserv/regnolimit` | Bypass registration limits ([REGNOLIMIT command](/docs/help/nickserv#regnolimit)) | |
| `modules/nickserv/resetpass` | Password reset ([RESETPASS command](/docs/help/nickserv#resetpass)) | |
| `modules/nickserv/restrict` | [RESTRICT command](/docs/help/nickserv#restrict) | |
| `modules/nickserv/return` | Password return ([RETURN command](/docs/help/nickserv#return)) | |
| `modules/nickserv/sendpass` | Password retrieval ([SENDPASS command](/docs/help/nickserv#sendpass)) | Requires a functional MTA to work properly. |
| `modules/nickserv/sendpass_user` | Password retrieval allowed to normal users ([SENDPASS command](/docs/help/nickserv#sendpass)) | Requires a functional MTA to work properly. |
| `modules/nickserv/set_accountname` | Allow a user to change their primary nickname ([SET ACCOUNTNAME command](/docs/help/nickserv#set-accountname)) | |
| `modules/nickserv/set_email` | [SET EMAIL command](/docs/help/nickserv#set-email) | |
| `modules/nickserv/set_emailmemos` | [SET EMAILMEMOS command](/docs/help/nickserv#set-emailmemos) | |
| `modules/nickserv/set_enforcetime` | [SET ENFORCETIME command](/docs/help/nickserv#set-enforcetime) | Only usable if `ENFORCE` is enabled. |
| `modules/nickserv/set_hidemail` | [SET HIDEMAIL command](/docs/help/nickserv#set-hidemail) | |
| `modules/nickserv/set_language` | [SET LANGUAGE command](/docs/help/nickserv#set-language) | |
| `modules/nickserv/set_nevergroup` | [SET NEVERGROUP command](/docs/help/nickserv#set-nevergroup) | Only usable if GroupServ is enabled. |
| `modules/nickserv/set_neverop` | [SET NEVEROP command](/docs/help/nickserv#set-neverop) | |
| `modules/nickserv/set_nogreet` | [SET NOGREET command](/docs/help/nickserv#set-nogreet) | |
| `modules/nickserv/set_nomemo` | [SET NOMEMO command](/docs/help/nickserv#set-nomemo) | |
| `modules/nickserv/set_noop` | [SET NOOP command](/docs/help/nickserv#set-noop) | |
| `modules/nickserv/set_nopassword` | [SET NOPASSWORD command](/docs/help/nickserv#set-nopassword) | |
| `modules/nickserv/set_password` | [SET PASSWORD command](/docs/help/nickserv#set-password) | |
| `modules/nickserv/set_privmsg` | PRIVMSG the user instead of NOTICE ([SET PRIVMSG command](/docs/help/nickserv#set-privmsg)) | |
| `modules/nickserv/set_private` | Account info hiding ([SET PRIVATE command](/docs/help/nickserv#set-private)) | |
| `modules/nickserv/set_property` | [SET PROPERTY command](/docs/help/nickserv#set-property) | |
| `modules/nickserv/set_pubkey` | [SET PUBKEY command](/docs/help/nickserv#set-pubkey) | |
| `modules/nickserv/set_quietchg` | [SET QUIETCHG command](/docs/help/nickserv#set-quietchg) | |
| `modules/nickserv/setpass` | Password retrieval uses code ([SETPASS command](/docs/help/nickserv#setpass)) | |
| `modules/nickserv/status` | [STATUS command](/docs/help/nickserv#status) | |
| `modules/nickserv/taxonomy` | Nickname metadata viewer ([TAXONOMY command](/docs/help/nickserv#taxonomy)) | |
| `modules/nickserv/vacation` | [VACATION command](/docs/help/nickserv#vacation) | |
| `modules/nickserv/verify` | [VERIFY command](/docs/help/nickserv#verify) | |
| `modules/nickserv/vhost` | [VHOST command](/docs/help/nickserv#vhost) | |
| `modules/nickserv/waitreg` | [Delay services account creation](#waitreg_time) | |

