---
sidebar_position: 2
---

# `deletePunchInPunchOut`

This is the documentation page of the command 'deletePunchInPunchOut'. This document was written by **Gabriel Martins**.

## Description:

Find and delete a given punch in / punch out based on the description field.

## Usage:

```js
onTimePage.deletePunchInPunchOut('descriptionIn')
```

## Parameters:

- `descriptionIn` (String): Find the punch in based in its description

## Example:

```js
onTimePage.deletePunchInPunchOut('My Punch In')
```