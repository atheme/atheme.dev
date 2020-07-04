---
id: database
title: Choosing Your Database Backend
sidebar_label: Database
---

An important component of Atheme Services to ensure you have loaded is the
database module. This module handles management for all data, such as
user and channel registration information, which is to remain available
throughout Atheme restarts.

Atheme currently supports two varieties of text-based flatfile databases. The first, _OpenSEX_, is the recommended option for all new networks. The other, _flatfile_ was the previous default Atheme database format and, although available for compatibility purposes, is not recommended. **You must choose one of these modules.**

* **`modules/backend/opensex`**
* `modules/backend/flatfile`

Existing Atheme users who are currently using the flatfile option may upgrade to OpenSEX at any time, simply by updating the configuration to use OpenSEX instead. Atheme will automatically upgrade your database on module load.

The database modules require no additional configuration options, other
than specifying which module to use. As such, a fully configured database
section will look like:

```
loadmodule "modules/backend/opensex";
```