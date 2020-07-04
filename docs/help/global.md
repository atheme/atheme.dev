---
id: global
title: Global
sidebar_label: Global
---

## Service Usage

## Commands

### GLOBAL

GLOBAL allows an IRCop to store multiple lines
in a buffer and send them at one time to every user
on the network.

Syntax: `GLOBAL <parameters>|SEND|CLEAR|LIST`

Examples:
```
/msg Global GLOBAL this is line 1
/msg Global GLOBAL this is line 2
/msg Global GLOBAL SEND
/msg Global GLOBAL CLEAR
/msg Global GLOBAL LIST
```
