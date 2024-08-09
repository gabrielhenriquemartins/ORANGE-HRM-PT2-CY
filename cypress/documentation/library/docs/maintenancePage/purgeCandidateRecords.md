---
sidebar_position: 1
---

# `purgeCandidateRecords`

This is the documentation page of the command 'purgeCandidateRecords'. This document was written by **Gabriel Martins**.

## Description:

Check if there are some data to be purge and purge all. Otherwise,
verify the no records pop-up.

## Usage:

```js
cy.purgeCandidateRecords('vacancy')
```

## Parameters:

- `vacancy` (String): Vacancy.

## Example:

```js
onMaintenancePage.purgeCandidateRecords('Software Engineer')
```