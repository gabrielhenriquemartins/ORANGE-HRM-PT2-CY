---
sidebar_position: 1
---

# `findProfessional`

This is the documentation page of the command 'findProfessional'. This document was written by **Gabriel Martins**.

## Description:

Find a given professional by name, job title or location. Then, the script select
the professional and check if the right menu is opened with the given name.

## Usage:

```js
onDirectoryPage.findProfessional('firstName', 'lastname', 'jobTitle', 'location')
```

## Parameters:

- `firstName` (String): First employee name.
- `lastname` (String): Last Employee name.
- `jobTitle` (String): (Optional) Job title.
- `location` (String): (Optional) Location.

## Example:

```js
onDirectoryPage.findProfessional('Gabriel', 'Martins')
```