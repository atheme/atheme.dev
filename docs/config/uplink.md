---
id: uplink
title: Connecting to Your IRCd
sidebar_label: Uplink
---

A vital component of your Atheme configuration is, obviously, the settings
needed to connect Atheme Services to your IRCd. This is comprised of
choosing the correct protocol module for your IRCd and selecting any
needed mixins, depending on how your IRC server is configured. Some
servers may have additional requirements within the
[general](/config/general) component of Atheme's configuration. If your
IRCd does require additional settings, it will be noted below.

## Uplink Block

The `uplink{}` block defines connections to your IRC server.
Multiple `uplink{}` blocks may be defined, but Atheme will only connect
to **one** at a time. Atheme does not currently support linking to the
IRCd over SSL; to securely link Atheme to your IRC server, please
connect Atheme to an IRCd ran locally (on the same server) and connect
that IRC server to your network over SSL.

**The `uplink{}` block itself takes one argument** when defining the block,
which is the name of the server it is connecting to. This should be the
same as whatever you have named your IRC server -- e.g., if your server is
named `server1.example.tld` in your IRCd's config, your Atheme connect
block should be formatted like: `uplink "server1.example.tld" {}`.

A completed `uplink{}` block would look like:

```
uplink "irc.example.tld" {
  host = "127.0.0.1";
  send_password = "athemepassword";
  receive_password = "ircdpassword";
  port = 6667;
};
```

### host

The `host` field defines what address Atheme should connect to. This may
be either an IP address, either IPv4 or IPv6, or it may be a DNS
resolvable hostname. _This value does not have to be the same as your
IRCd's server name_.

**Examples:**
* **IPv4:** `host = "127.0.0.1;"`
* **IPv6:** `host = "::1";`
* **DNS:** `host = "irc.example.tld";`

### vhost

This value defines the source IP address to connect from. If you are
running Atheme from a machine with multiple IP addresses and are 
connecting to a remote server, you may need to define this value.

The `vhost` field will accept either an IPv4 or IPv6 address.

**Example:** `vhost = "192.0.2.5";`

### password

Atheme supports two options for setting the link password for connecting
with your IRCd.

#### Different Send and Receive Passwords

If the password being sent to Atheme and the password Atheme should send
are different, this may be defined via the `send_password` option,
which specifies the password Atheme should sent, and the 
`receive_password` option, which specifies the password Atheme should 
expect to receive from the upstream IRCd.

**Example:**
```
send_password = "mypassword";
receive_password = "theirpassword";
```

#### The Same Password

If both passwords are the same, you can simplify your `uplink{}` block by
using the `password` option instead of two separate options.

**Example:** `password = "ourpassword";`

## Protocol Modules

Different IRC servers use different server-to-server protocols. Below is a listing of the IRCds directly supported by Atheme; if your IRCd is not in this list and does not use an existing protocol, please [file a bug report on the Atheme GitHub](https://github.com/atheme/atheme/issues).

An example of a completed protocol section for _InspIRCd_ would be as follows:
```
loadmodule "modules/protocol/inspircd";
```

If additionally, you wished to load InspIRCd and disable half-op support, you could use the following:
```
loadmodule "modules/protocol/inspircd";
loadmodule "modules/protocol/mixin_nohalfops";
```

For your configuration file, **you will need to select one protocol module**, the following is a list of our primarily supported platforms:

* `modules/protocol/bahamut`: [Bahamut](https://www.dal.net/?page=Bahamut) is a UNIX-based IRCd built by DALnet. This module is targeted to the 2.1.x line, the current release, but is backwards compatible through 1.8.x.
* `modules/protocol/charybdis`: [Charybdis](https://github.com/charybdis-ircd/charybdis) is an ircd-ratbox variant built for better services support. This module supports both the 3.x and 4 lines.
* `modules/protocol/chatircd1.1`: [ChatIRCd](https://www.chatlounge.net/w/index.php/Software) is a fork of Charybdis built by ChatLounge. This module supports the 1.1.x lines.
* `modules/protocol/inspircd`: [InspIRCd](https://www.inspircd.org/) is a modular IRCd available for Linux, BSD, Windows and macOS systems. This module supports both the 2.x and 3.x lines.
* `modules/protocol/ratbox`: [ircd-ratbox](https://www.ratbox.org/) is a traditional IRCd, and the primary IRCd used on EFNet. This module supports the 3.x line.
* `modules/protocol/ircnet`: [ircd 2.11](http://www.irc.org/ftp/irc/server/) is the original IRCd and the primary IRCd used on IRCNet. This module supports the 2.11.x line.
* `modules/protocol/ircd-seven`: [ircd-seven](https://github.com/freenode/ircd-seven) is a fork of Charybdis, built for the freenode IRC network. This module supports the 1.x line.
* `modules/protocol/nefarious`: [Nefarious](https://github.com/evilnet/nefarious2) is a fork of IRCu by the AfterNet IRC network. _Supported versions of this IRCd is currently in review._
* `modules/protocol/ngircd`: [ngIRCd](https://ngircd.barton.de/) is a lightweight IRCd. _This module is experimental and has had limited in-production testing_. This module supports the 20.x line.
* `modules/protocol/unreal4`: [UnrealIRCd](https://www.unrealircd.org/) is a configurable and popular IRCd. This module support the 4.x line.

### Legacy Protocol Modules

Atheme additionally provides legacy support for a number of older IRC daemons which still see production use. Although these IRC daemons are not recommended, these modules are included in the base Atheme distribution and are fully supported by Atheme Services.

* `modules/protocol/asuka`: Asuka is an ircu-based IRCd formerly used by QuakeNet, although it has been replaced by snircd. This module supports versions 1.2.1 and later.
* `modules/protocol/dreamforge`: DreamForge is an IRCd formerly used by DALnet, although it has been replaced by Bahamut. This module supports versions 4.6.7 and later.
* `modules/protocol/unreal`: UnrealIRCd's 3.2.x line is incompatible withe the `unreal4` protocol module. This module supports the 3.2.x line, although production networks are recommended to migrate to the currently supported 4.x line.

### Protocol Mixins

These mixins allow you to disable specific feature support if you do not have/want features which your IRCd normally has available. These modules only adjust feature support within Atheme; you will need to review your IRCd's configuration to disable them on the server side as well.

_Note: If you do not know what these mean, you most likely **do not** want to enable these modules._

* `modules/protocol/mixin_nohalfops`: Disable **half-op** status mode
* `modules/protocol/mixin_noprotect`: Disable **protected** (Also known as **admin**) status mode
* `modules/protocol/mixin_noowner`: Disable **owner** status mode
* `modules/protocol/mixin_noholdnick`: Specify that `NickServ/GHOST` and `NickServ/RELEASE` should use enforcer clients instead of the IRCd-specific nickname reservation functions.

## Example IRCd Configurations

### Bahamut

### Charybdis

The majority of Charybdis' configuration for Atheme is the same as a
standard server link. Charybdis does not require any specific additional
modules to be loaded, however some networks may find value in some
Charybdis modules which add more thorough integration with Services,
such as:
* `extensions/extb_account` which provides the $a extban, allowing for
bans/exempts/invite exceptions, etc. based on account name) or
* `extensions/no_kill_services` which prevents operators from `/kill`ing 
Services. (Atheme will introduce its clients back immediately, but this
module may cut down on spam for networks with rather bored operators)

For full integration with Atheme, you will want to ensure:
* `connect:hub_mask` is set to `"*"`. This allows Atheme to jupe any
servers which need temporarily removed from the network.
* `service:name` is set to the name of your Atheme instance. Services are
given special permissions above what standard IRC servers can do, but
only the server listed within Charybdis' `service` block may qualify
as a Services server to the IRCd.
* `general:sasl_service` is set to the name of your Atheme instance's
[SaslServ](/config/saslserv). This field defaults to "SaslServ", but
you will need to ensure it is updated if you choose to rename your 
Service.

```
connect "services.example.tld" {
  host = "127.0.0.1";
  send_password = "ircdpassword";
  accept_password = "servicespassword";
  port = 6667;
  hub_mask = "*";
  class = "server";
  flags = topicburst;
};

service {
  name = "services.example.tld";
};

cluster {
  name = "*";
  flags = kline, tkline, unkline, xline, txline, unxline, resv, tresv, unresv;
};

general {
  ...
  sasl_service = "SaslServ";
}
```

### ChatIRCd

See [Charybdis](#charybdis)

### InspIRCd

By default, InspIRCd separates its configuration files into a number of
smaller, more specific component files. This example corresponds to each
of the default provided InspIRCd configuration files.

#### inspircd.conf

InspIRCd separates ports into client and server ports, due to this you
must ensure you have a **plaintext** port available and designated for
servers if you wish to connect Atheme to your InspIRCd instance.

You may want to personalize InspIRCd's `atheme.conf.example` file,
which contains a number of configurations for InspIRCd's `alias` module
(See `modules.conf` below) to allow users slightly terser command options
for connecting with Services.

```
<bind address="" port="7000,7001" type="servers">
...
<include file="examples/services/atheme.conf.example">
```

#### modules.conf

A number of modules are available to enhance your experience when using
Atheme Services with InspIRCd.

* The `spanningtree` module implements server-to-server linking. **This
module is required for Atheme, or any server, to connect to your InspIRCd
instance.**
* The `alias` module allows for command aliases (such as `/NS`, which
traditionally is a shortcut for `/msg NickServ ...`)
* The `chghost` module allows for hostname changes. **This is required**
if you wish to use `NickServ/VHOST` or any HostServ functionality.
* The `mlock` module allows for IRCd-side enforcement of 
ChanServ/SET/MLOCK. Although without this module loaded, ChanServ will
always manually reset modes when needed, server-side MLOCK allows for less
potential channel spam and a more consistently enforced mode setting.
* The `sasl` module is **required** for SASL authentication support. You
will also need to ensure the `sasl` block is defined with the `target=`
component set to the name of your Atheme Services instance.
* The `servprotect` module adds functionality which prevents your Services
bots from being kicked from channels, killed, etc. Although Atheme has
internal checks to automatically rejoin channels or reconnect clients in
these situations, this functionality can help reduce spam from bored
channel or network operators.
* The `services_account` module adds a number of services related 
functionality:
    * User modes +R (), +M () and +r ().
    * R: extban (Format: `+b R:$username`) for matching based on account 
name
    * U: extban (Format: `+b U:n!u@a`) for matching _only_ unauthenticated
users
* The `topiclock` module implements IRCd-side topic locking, which 
provides similar benefits as the `mlock` module.

```
<module name="spanningtree">
<module name="alias">
<module name="chghost">
<module name="mlock">
<module name="sasl">
<sasl target="services.example.tld">
<module name="servprotect"> 
<module name="services_account">
<module name="topiclock">
```

#### links.conf

Configuring InspIRCd to support Atheme is simply a `<link>` block
configured to accept the name and password of your Atheme instance, 
and a `<uline>` block set to your Atheme instance's server name. 

```
<link name="services.example.tld"
      ipaddr="localhost"
      port="7000"
      allowmask="127.0.0.0/8"
      sendpass="ircdpassword"
      recvpass="servicespassword">

<uline server="services.example.tld" silent="yes">
```