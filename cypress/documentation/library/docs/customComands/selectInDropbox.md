---
sidebar_position: 4
---

# `selectInDropbox`

This is the documentation page of the command 'selectInDropbox'. This document was written by **Gabriel Martins**.

## Description:

This command will click in the first dropbox with '-- Select --'.
Although, It is possible to select other elements beyond the first one.
Then, the option will be selected.

## Usage:

```js
cy.selectInDropbox('name', 'index')
```

## Parameters:

- `name` (String): Option to be selected.
- `index` (Int): (Optional) The default value is '0'

## Example:

```js
cy.selectInDropbox('Brazil')
```