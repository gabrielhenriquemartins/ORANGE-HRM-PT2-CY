---
sidebar_position: 9
---

# `sendEmailConfiguration`

This is the documentation page of the command 'sendEmailConfiguration'. This document was written by **Gabriel Martins**.

## Description:

Send a email from the desired email set to a deseired destination.

## Usage:

```js
onAdminPage.sendEmailConfiguration('emailSender', 'emailDestination')
```

## Parameters:

- `emailSender` (String): Email sender, must contain @.
- `emailDestination` (String): Email destination, must contain @.

## Example:

```js
onAdminPage.sendEmailConfiguration('test_sender@hotmail.com', 'test_destination@hotmail.com')
```