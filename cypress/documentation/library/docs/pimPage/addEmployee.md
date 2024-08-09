---
sidebar_position: 1
---

# `addEmployee`

This is the documentation page of the command 'addEmployee'. This document was written by **Gabriel Martins**.

## Description:

Create a new employee with an unique id.
Must be specified the first and last name.

## Usage:

```js
onPimPage.addEmployee('name', 'last', 'id')
```

## Parameters:

- `name` (String): Employee first name.
- `last` (String): Employee last name.
- `id` (Int): Employee identifier.

## Example:

```js
onPimPage.addEmployee('Gabriel', 'Martins', '8884')
```