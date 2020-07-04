---
id: groupserv
title: Setting up GroupServ
sidebar_label: GroupServ
---

GroupServ provides features for managing a collection of channels at once.

## GroupServ Block

The `groupserv{}` block contains settings specific to the GroupServ service bot.

A fully configured `groupserv{}` block may look like: 

```
groupserv {
    nick = "GroupServ";
    user = "GroupServ";
    host = "misconfigured.network";
    real = "Host Management Services";
    aliases {
        "APPROVE" = "ACTIVATE";
        "DENY" = "REJECT";
    };
};
```

### Services Bot Options

GroupServ supports all [standard services bot options](/docs/config/services).

### maxgroups

This value sets the maximum number of groups one user can be the founder of.

Example: `maxgroups = 5;`

### maxgroupacs

This value is the maximum number of access entries you may have in a group.

Example: `maxgroupacs = 100;`

### enable_open_groups

Setting this option will allow any group founder to mark their group as "open", where anyone can join the group.

Example: `enable_open_groups;`

### join_flags

This is the GroupServ flagset that users who `JOIN` an open group will get upon join. Please review the [GroupServ flags matrix](/docs/help/groupserv#flags) before changing this option.

Valid flagsets (for example) would be `+v` or `+cv`; it is not valid to use minus flags (such as `-v`) here.

Examples:

- Default: `join_flags = "+";`
- Extra: `join_flags = "+cv";`

## Modules

In addition to loading the GroupServ service bot itself, you can configure specific features of lack thereof by chosing which modules to load.

| Module | Features |
| ------ | -------- |
| `modules/groupserv/main` | Core components |
| `modules/groupserv/acsnolimit` | [ACSNOLIMIT command](/docs/help/groupserv#acsnolimit) |
| `modules/groupserv/drop` | [DROP command](/docs/help/groupserv#help) |
| `modules/groupserv/fflags` | [FFLAGS command](/docs/help/groupserv#fflags) |
| `modules/groupserv/flags` | [FLAGS command](/docs/help/groupserv#flags) |
| `modules/groupserv/help` | [HELP command](/docs/help/groupserv#help) |
| `modules/groupserv/info` | [INFO command](/docs/help/groupserv#info) |
| `modules/groupserv/join` | [JOIN command](/docs/help/groupserv#join) |
| `modules/groupserv/list` | [LIST command](/docs/help/groupserv#list) |
| `modules/groupserv/listchans` | [LISTCHANS command](/docs/help/groupserv#listchans) |
| `modules/groupserv/register` | [REGISTER command](/docs/help/groupserv#register) |
| `modules/groupserv/regnolimit` | [REGNOLIMIT command](/docs/help/groupserv#regnolimit) |
| `modules/groupserv/invite` | [INVITE command](/docs/help/groupserv#invite) |
| `modules/groupserv/set` | [SET command](/docs/help/groupserv#set) |
| `modules/groupserv/set_channel` | [SET CHANNEL command](/docs/help/groupserv#set-channel) |
| `modules/groupserv/set_description` | [SET DESCRIPTION command](/docs/help/groupserv#set-description) |
| `modules/groupserv/set_email` | [SET EMAIL command](/docs/help/groupserv#set-email) |
| `modules/groupserv/set_groupname` | [SET GROUPNAME command](/docs/help/groupserv#set-groupname) |
| `modules/groupserv/set_joinflags` | [SET JOINFLAGS command](/docs/help/groupserv#set-joinflags) |
| `modules/groupserv/set_open` | [SET OPEN command](/docs/help/groupserv#set-open) |
| `modules/groupserv/set_public` | [SET PUBLIC command](/docs/help/groupserv#set-public) |
| `modules/groupserv/set_url` | [SET URL command](/docs/help/groupserv#set-url) |
