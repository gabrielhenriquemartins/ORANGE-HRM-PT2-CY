---
sidebar_position: 6
---

# `addRowInMyTimesheet`

This is the documentation page of the command 'addRowInMyTimesheet'. This document was written by **Gabriel Martins**.

## Description:

Change the first row in my timesheet.

## Usage:

```js
onTimePage.addRowInMyTimesheet('project', 'activity')
```

## Parameters:

- `project` (String): Project name
- `activity` (String): Activity name
- `day` (Int): (Optional) Day of the week. Default value is set to Tuesday
- `hours` (String): (Optional) Time spent. Default value is set to 10:00

## Example:

```js
onTimePage.addRowInMyTimesheet("Amazon", 'Bug Fix')
```