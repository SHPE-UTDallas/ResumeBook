# POST /api/zip

## Description

This route combines resumes identified by emails into a single cloudinary link. This is useful for downloading a collection of resumes.

---

## Authentication

None

---

## Query Parameters

| Name    | Type   | Description              | Preconditions    |
| ------- | ------ | ------------------------ | ---------------- |
| [0...N] | number | array index of the email | Must be an email |

Example:

```
/api/zip?0=dummy@email.com&1=other@email.com
```

---

## Response

```typescript
{
  "res": string | null,
  "error": string | null
}
```

| Name  | Type           | Description                                                               |
| ----- | -------------- | ------------------------------------------------------------------------- |
| res   | string \| null | Either a cloundiary url if completed or null if there was an error        |
| error | string \| null | Either null if operation was successful or a string if there was an error |

---

## Error Codes

None
