---
sidebar_position: 5
---

# `submitClaim`

This is the documentation page of the command 'submitClaim'. This document was written by **Gabriel Martins**.

## Description:

Create a new claim type with a associate currency and remarks.

## Usage:

```js
onClaimPage.submitClaim('claim', 'currency', 'remarks')
```

## Parameters:

- `claim` (String): Claim to be created.
- `currency` (String): Currency of the event.
- `remarks` (String): Claim remarks.

## Example:

```js
onClaimPage.submitClaim('Accommodation', 'Canadian Dollar', 'My Remarks')
```