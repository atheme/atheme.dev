---
id: serverinfo
title: Setting Info About Your Atheme Instance
sidebar_label: Server Info
---

## Server Info

The `serverinfo{}` block defines how Atheme Services will appear on your IRC network.
This configuration segment also will define how your Athem instance will handle specific
components of user registration. 

All configuration options will be within the `serverinfo{}` block.

A fully configured `serverinfo{}` block may look like:

```
serverinfo {
	name = "services.example.tld";
	desc = "Atheme IRC Services";
    netname = "example irc network";
	numeric = "00A";
	recontime = 10;
	hidehostsuffix = "users.example";
	adminname = "example admin";
	adminemail = "admin@example.tld";
	registeremail = "noreply@example.tld";
	#hidden;
	mta = "/usr/sbin/sendmail";
	loglevel = { error; info; admin; network; wallops; };
	maxlogins = 5;
	maxusers = 5;
	mdlimit = 30;
	emaillimit = 10;
	emailtime = 300;
	auth = none;
	casemapping = rfc1459;
};
```

### name

The `name` option defines the server name Atheme Services will use on your IRC network.
This is the name you will need to use in your IRCd's link blocks -- when you're ready,
visit the [uplink configuration page](/docs/config/uplink) for more information on link
blocks.

The `name` value must be unique on your IRC network and must contain at least one dot, but
it does not have to be a valid DNS name.

**Example:** `name = "services.int";`

### desc

The `desc` option defines the _server comment_, or _server name_, Atheme will send
to the IRC network. This value may be set to any string you prefer, and will generally
appear when a user performs a `/whois` on one of the Atheme bots (e.g. NickServ).

**Example:** `desc = "Atheme IRC Services";`

### netname

The `netname` option defines the name of your network to Atheme. Although this value is
not required to be the same as your IRCd's `netname`-equivalent value, it is recommended
to use the same name for user consistency.

This value is displayed when a users runs `/admin` on your Atheme Services server.

**Example:** `netname = "misconfigured network";`

### numeric

Some IRCd protocols (Such as Charybdis, ircd-ratbox, P10, IRCNet, etc.) require a server
id, also known as a _numeric_. Please consult your IRCd's documentation or review our
general summary on the [uplink configuration page](/docs/config/uplink) for more
information on if your server requires a numeric. 

When required, the `numeric` option defines what server id to send to your uplink IRCd.
__Note:__ The numeric must follow your IRCd's formatting and must be unique to this
server, no two servers can share the same numeric.

**Example:** `numeric = "00A";`

### recontime

The `recontime` value specifies the time, in seconds, to wait before reconnecting to
the uplink server if Atheme is disconnected.

**Example:** `recontime = 10;`

### hidehostsuffix

On P10-based IRCds (Asuka, Snircd, Nefarious), user mode +x gives
`<account>.<hidehostsuffix>`. If using +x on any of these IRCds, Atheme's
`hidehostsuffix` value must agree with `F:HIDDEN_HOST`.

**Example:** `hidehostsuffix = "users.misconfigured";`

### adminname

The `adminname` option displays the name of the person running your Atheme instance when
a user runs `/admin` against your Atheme Services instance. This field is freeform and may
be filled however you prefer.

**Example:** `adminname = "misconfigured admin";`

### adminemail

The `adminemail` option displays an email address for the person running this service.
This field is also freeform and may contain an email, a web URL, or any other text you 
would prefer.

**Example:** `adminemail = "misconfigured@admin.tld";`

### registeremail

The `registeremail` option defines the email address any outgoing emails will originate
from; this is used if email authentication is required for account registration, for
emailed password resets, and so forth. If this value is not set, it will default to
`noreply.$adminemail`. This value should formatted as a valid email address, although an
actual account/inbox for this address may not be required.

**Example:** `registeremail = "noreply@admin.tld";`

### hidden

If the `hidden` value is enabled, Atheme will indicate to the uplink IRCd that the Atheme
server should not be included in `/links` output. This feature is only supported on the following IRCds: charybdis, ircd-seven, ratbox.

This option has no value, it is either enabled by being uncommented or disabled by being commented.

**Example (enabled):** `hidden;` 

### mta

The `mta` option defines the full path to your mail transfer agent. This is the 
application used for email authorizations and password retrieval. If this value is 
commented out, sending email will be disabled.

**Warning:** Sending email can disclose the IP address of your services instance unless
you take additional precautions (not discussed here further).

**Example:** `mta = "/usr/sbin/sendmail";`

### loglevel

This value takes a selection of the following keywords to define the default categories
of logging information to record in Atheme's master logfile, usually located in
`var/atheme.log`. You may use any combination of the following keywords.

Your `loglevel` value may be formatted as follows:

```
loglevel = { keyword; another; };
```

Unlike most freeform values, such as the admin* options, you will not need quotation marks
around the keywords within the `loglevel` component.

| Keyword | Information Provided |
| ---- | -------------------- |
| _Meta-Keywords_ | _These keywords provide various bundled categories_ |
| debug | meta-keyword for all possible categories |
| all | alternative name for debug | 
| trace | meta-keyword for a little bit of info |
| misc | like trace, but with some more miscellaneous info |
| notice | meta-keyword for notice-like information |
| _Individual Keywords_ | _These keywords provide specific information_ |
| error | critical errors |
| info | miscellaneous log notices |
| verbose | A bit more verbose than info, not quite as spammy as debug |
| commands | all command use |
| admin | administrative command use | 
| register | account and channel registrations |
| set | changes of account or channel settings |
| request | user requests (currently only vhosts) | 
| network | log notices related to network status |
| rawdata | log raw data sent and received by services |
| wallops | _not yet used_ |

**Example:** `loglevel = { error; info; admin; network; wallops; };`

### maxlogins

The `maxlogins` option specifies the maximum number of sessions allowed to log into a 
singular account. Once a user has reached this number of simultaneous logins, they will
not be able to login on additional clients until a current session is logged out.

**Example:** `maxlogins = 5;`

### maxusers

The `maxusers` option defines the maximum amount of accounts which can be registered to a
single email address. Setting this option to 0 will disable this check, and allow an 
uncapped amount of registrations per email.

**Example:** `maxusers = 5;`

### mdlimit

This value defines how many metadata entries may be added to an object, such as a channel
or a user account. 

This value defaults to 30 and generally does not need adjusted, but may be increased or 
decreased as you see fit. _Note:_ Increasing this value excessively may cause slowness in
situations where metadata is abused.

**Example:** `mdlimit = 30;`

### emaillimit, emailtime

These two values are paired together as their values are combined to ensure proper network
maintanence. `emaillimit` defines the maximum amount of emails to be sent in `emailtime` time (in seconds). If this is exceeded, up to one wallop per minute will be sent to alert
network operators.

**Example:**
```
emaillimit = 10;
emailtime = 300;
```

### auth

The `auth` value defines what type of user registration authorization you want for your 
network. 

* If `email`, Atheme will send a confirmation email to the address to ensure it's 
    valid. If registration is not completed within one day, the username will expire.
* If `none`, no message will be sent and the username will be fully registered.

Valid options for this value are: `email`, `none`.

**Example:** `auth = none;`

### casemapping

This value specifies which casemapping to use. 

* The majority of IRCds will use the  `rfc1459` casemapping.
* Bahamut, Unreal and other _Dalnet_-style IRCds will use `ascii` casemapping.

Valid options for this value are: `rfc1459`, `ascii`.

**Example:** `casemapping = rfc1459;`