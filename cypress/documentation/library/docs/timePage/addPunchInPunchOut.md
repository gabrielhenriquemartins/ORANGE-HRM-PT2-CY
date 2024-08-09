---
sidebar_position: 1
---

# `addPunchInPunchOut`

This is the documentation page of the command 'addPunchInPunchOut'. This document was written by **Gabriel Martins**.

## Description:

Create a new punch in / punch out. If the punch out is the first option,
the script will confirm the punch out, to back to the punch in, only then the
validation begins.

## Usage:

```js
onTimePage.addPunchInPunchOut('descriptionIn')
```

## Parameters:

- `descriptionIn` (String): Punch in description. It will be used to delete the punch in / punch out

## Example:

```js
onTimePage.addPunchInPunchOut('My Punch In')
```