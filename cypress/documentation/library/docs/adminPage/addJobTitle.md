---
sidebar_position: 1
---

# `addJobTitle`

This is the documentation page of the command 'addJobTitle'. This document was written by **Gabriel Martins**.

## Description:

Create a new job title with a given description and note.

## Usage:

```js
onAdminPage.addJobTitle('jobTitle', 'description', 'note')
```

## Parameters:

- `jobTitle` (String): Job Title.
- `description` (String): The job title description
- `note` (String): The job title note.

## Example:

```js
onAdminPage.addJobTitle('Senior DevOps', 'My Description', 'My Note')
```