---
sidebar_position: 7
---

# `addNationality`

This is the documentation page of the command 'addNationality'. This document was written by **Gabriel Martins**.

## Description:

Add a given nationality. To avoid duplication errors, a random string 3 chars long is added
at the end of the nationality name.

## Usage:

```js
onAdminPage.addNationality('nationality')
```

## Parameters:

- `nationality` (String): Nationality identifier to be added.

## Example:

```js
onAdminPage.addNationality('Brazilian')
```