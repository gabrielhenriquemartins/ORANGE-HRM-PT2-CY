---
sidebar_position: 9
---

# `selectOption`

This is the documentation page of the command 'selectOption'. This document was written by **Gabriel Martins**.

## Description:

This keyword should be used after a cy.typeIntoTextField() or any action that open the
role='option' element. Shouldn't be used for dropbox.

## Usage:

```js
cy.selectOption('text')
```

## Parameters:

- `option` (String): Option to select.

## Example:

```js
cy.selectOption('Brazil')
```