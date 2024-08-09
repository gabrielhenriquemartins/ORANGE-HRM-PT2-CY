---
sidebar_position: 10
---

# `addSocialMediaAuthentication`

This is the documentation page of the command 'addSocialMediaAuthentication'. This document was written by **Gabriel Martins**.

## Description:

Add a given social media authentication.

## Usage:

```js
onAdminPage.addSocialMediaAuthentication('name', 'providerUrl', 'clientId', 'clientSecret')
```

## Parameters:

- `name` (String): Provider to be added.
- `providerUrl` (String): Provider url must exists.
- `clientId` (String): Client id.
- `clientSecret` (String): Client secret.

## Example:

```js
onAdminPage.addSocialMediaAuthentication('provider_test', 'provider.com', '123456', '123456')
```