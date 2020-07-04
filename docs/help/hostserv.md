---
id: hostserv
title: HostServ
sidebar_label: HostServ
---

## Service Usage

## Commands

* [CANCEL](#cancel) -- Cancel your own pending help request.
* [HELPME](#helpme) -- Request help from network staff.
* [SERVICES](#services) -- List all services currently running on the network.

**Services Operator Commands**

* [CLOSE](#close) -- Close a users' help request.
* [LIST](#list) -- List users waiting for help.

### DROP 

Drops (unsets) the vHost assigned to the nick in use.
When you use this command, any user who performs a /whois
on your nick will see the original host given to you by the IRCd,
which may show your real IP address.

Syntax: `DROP`

Example: `/msg HostServ DROP`

### GROUP


This command will set the current nick's vHost as the
vHost for all the nicks in the group, including nicks
that will be added in the future.

Syntax: `GROUP`

Example: `/msg HostServ GROUP`

### OFF

Deactivates the vHost currently assigned to the nick in use.
When you use this command, any user who performs a /whois
on your nick will see your real IP address.

For permanent removal of your vHost, please see network staff.

Syntax: `OFF`

Example:
    `/msg HostServ OFF`

### OFFERLIST

OFFERLIST lists all vHosts currently available from
the network staff.

Syntax: OFFERLIST

Example:
    `/msg HostServ OFFERLIST`

### ON

Activates the vHost currently assigned to the nick in use.
When you use this command any user who performs a /whois
on you will see the vHost instead of your real IP address.

Syntax: `ON`

Example:
    `/msg HostServ ON`

### REQUEST

REQUEST activation of the vHost. You must be identified
to a registered nick to issue this command. Please be
patient while your request is considered by network staff.

Syntax: `REQUEST <vHost>`

Example:
    `/msg HostServ REQUEST may.explode.on.impact`

### TAKE

TAKE allows you to set a vHost that the network staff
has offered and use it on your account. If the string
$account is in the vHost, it will be replaced with your
account name.

Syntax: `TAKE <vHost>`

Examples:
```
    /msg HostServ TAKE $account.users.example.net
    /msg HostServ TAKE example.net
```



## Services Operator Commands

### ACTIVATE

Activate the requested vHost for the given nick.
A memo informing the user will also be sent.
If an asterisk ("*") is used in place of a nick,
all waiting vHosts will be activated.

Syntax: `ACTIVATE <nick>`

Examples:
```
/msg HostServ ACTIVATE nenolod
/msg HostServ ACTIVATE *
```

### LISTVHOST

LISTVHOST allows operators to see virtual hosts (also
known as spoofs or cloaks) matching a given pattern.
If no pattern is specified, it lists all existing vHosts.

Syntax: `LISTVHOST [<pattern>]`

Examples:
```
    /msg HostServ LISTVHOST *lulz.com*
    /msg HostServ LISTVHOST
```

### OFFER

OFFER allows you to offer a list of vHosts to the users
of your network that they can accept at will without needing
an oper to set the vHost. The string $account in the offered
vHost will be replaced by a users' account name when they TAKE it.

If the !group parameter is provided, only users with the +v flag
in that group will be able to see it in OFFERLIST and TAKE it.

Syntax: `OFFER [!group] <vHost>`

Examples:
```
    /msg HostServ OFFER may.explode.on.impact
    /msg HostServ OFFER mynetwork.users.$account
    /msg HostServ OFFER !atheme-users $account.users.atheme.net
```

### REJECT

Reject the requested vHost for the given nick.
A memo informing the user will also be sent. If
a reason is provided, that reason will be included
in the rejection memo.
If an asterisk ("*") is used in place of a nick,
all waiting vHosts will be rejected.

Syntax: `REJECT <nick> [reason]`

Examples:
```
    /msg HostServ REJECT nenolod
    /msg HostServ REJECT *
    /msg HostServ REJECT spb Vulgar vHosts are not allowed
```

### UNOFFER

Remove a offered vHost from the OFFER list.

Syntax: `UNOFFER <vHost>`

Example:
    `/msg HostServ UNOFFER users.example.net`

### VHOST

VHOST allows operators to set a virtual host (also
known as a spoof or cloak) on an account. This vHost
will be set on the user immediately and each time
they identify to their account. If no vHost is
specified, it will clear all existing vHosts on the account.

Syntax: `VHOST <nickname> [<vHost>]`

Examples:
```
    /msg HostServ VHOST spb may.explode.on.impact
    /msg HostServ VHOST nenolod
```

### VHOSTNICK

VHOSTNICK allows operators to set a virtual host (also
known as a spoof or cloak) on a nick. This vHost
will be set on the user immediately and each time
they identify when using said nick. If no vHost is
specified, revert to the account's vHost.

Syntax: `VHOSTNICK <nickname> [<vHost>]`

Examples:
```
    /msg HostServ VHOSTNICK spb may.explode.on.impact
    /msg HostServ VHOSTNICK nenolod
```

### WAITING

WAITING lists all vHosts currently waiting for activation.

Syntax: `WAITING`

Example:
    `/msg HostServ WAITING`
