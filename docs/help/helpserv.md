---
id: helpserv
title: HelpServ
sidebar_label: HelpServ
---

## Service Usage

## Commands

* [CANCEL](#cancel) -- Cancel your own pending help request.
* [HELPME](#helpme) -- Request help from network staff.
* [SERVICES](#services) -- List all services currently running on the network.

**Services Operator Commands**

* [CLOSE](#close) -- Close a users' help request.
* [LIST](#list) -- List users waiting for help.

### CANCEL 

CANCEL allows you to cancel a currently pending request for help.

Syntax: `CANCEL`

Example: `/msg HelpServ CANCEL`

### HELPME

HELPME allows you to easily request help from the network staff.
This works more like an alert than a ticketing system.

Syntax: `HELPME [topic]`

Examples:
```
/msg HelpServ HELPME
/msg HelpServ HELPME I need help with registering a channel.
```

### REQUEST

REQUEST help from network staff. This works much like
a bugtracker or helpdesk ticketing system. Please be
patient while your request is considered by network staff.

Syntax: `REQUEST <topic>`

Example: `/msg HelpServ REQUEST I need help with a vHost.`

### SERVICES

SERVICES allows you to view a list of all services running on the network
so you can choose one to message and get more help.

Syntax: `SERVICES`

Example: `/msg HelpServ SERVICES`

## Services Operator Commands

### CLOSE

Close the help request from the given nick.
The user will be notified that their request was closed.

Syntax: `CLOSE <nick> [reason]`

Example: `/msg HelpServ CLOSE Grue It is now no longer pitch dark.`

### LIST

LIST lists all currently open help requests.

Syntax: `LIST`

Example: `/msg HelpServ LIST`