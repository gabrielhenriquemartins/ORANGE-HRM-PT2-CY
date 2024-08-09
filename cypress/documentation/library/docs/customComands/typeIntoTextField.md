---
sidebar_position: 8
---

# `typeIntoTextField`

This is the documentation page of the command 'typeIntoTextField'. This document was written by **Gabriel Martins**.

## Description:

Check the label associated to a input field, then check for the
parents to find the associated input field. The command will type
the desired value.

## Usage:

```js
cy.typeIntoTextField('fieldName', 'value')
```

## Parameters:

- `fieldName` (String): Check the label.
- `value` (String): Input value to be write into the text field.
- `index` (String): (Optional) The default value is '0'.

## Example:

```js
cy.typeIntoTextField('Name', 'Gabriel')
```