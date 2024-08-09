---
sidebar_position: 6
---

# `selectSubMenu`

This is the documentation page of the command 'selectSubMenu'. This document was written by **Gabriel Martins**.

## Description:

This command allows the user to open the desired left menu.

## Usage:

```js
cy.selectSubMenu('subMenu', 'subMenu2')
```

## Parameters:

- `subMenu` (String): Submenu to be open.
- `subMenu2` (String): (Optional) Submenu to be open. It is inside the new container.

## Example:

```js
cy.selectSubMenu('Employee List')
cy.selectSubMenu('Configuration', 'Termination Reasons')
```