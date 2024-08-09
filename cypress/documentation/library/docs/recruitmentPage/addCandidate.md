---
sidebar_position: 1
---

# `addCandidate`

This is the documentation page of the command 'addCandidate'. This document was written by **Gabriel Martins**.

## Description:

Create a new candidate with full name, email and phone.

## Usage:

```js
onRecruitmentPage.addCandidate('name', 'middle', 'last', 'email', 'phone')
```

## Parameters:

- `name` (String): First name.
- `middle` (String): Middle name.
- `last` (String): Last name.
- `email` (String): Email must contain @.
- `phone` (Int): Contact number.

## Example:

```js
onRecruitmentPage.addCandidate('Gabriel', 'Henrique', 'Martins', 'test@test.com', '1000')
```