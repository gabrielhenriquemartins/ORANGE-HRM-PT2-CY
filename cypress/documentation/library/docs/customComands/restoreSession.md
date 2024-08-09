---
sidebar_position: 3
---

# `restoreSession`

This is the documentation page of the command 'restoreSession'. This document was written by **Gabriel Martins**.

## Description:

This command will restore the cookies and local storage, previously saved in cypress/fixture.
Make sure to run the command cy.loginAsAdmin(), before execute this command.

## Usage:

```js
cy.restoreSession()
```

## Parameters:

- `none`

## Example:

```js
cy.restoreSession()
```