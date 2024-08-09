---
sidebar_position: 3
---

# `addLocation`

This is the documentation page of the command 'addLocation'. This document was written by **Gabriel Martins**.

## Description:

Create a new location with a given name, city, state, country, zip code, phone and fax.

## Usage:

```js
onAdminPage.addLocation('name', 'city', 'state', 'country', 'zip_code', 'phone', 'fax')
```

## Parameters:

- `name` (String): Location identifier.
- `city` (String): The city.
- `state` (String): The state.
- `country` (String): The country.
- `zip_code` (Int): (Optional) zip code area.
- `phone` (Int): (Optional) phone.
- `fax` (Int): (Optional) fax.

## Example:

```js
onAdminPage.addLocation('R&D', 'New York', 'California', 'Brazil', '1000', '1000', '1000')
```