# GET /dummydata

## Description

This route provides fake valid data of fake students for testing purposes. There are 100 entries that are retrieved when requested.

---

## Authentication

None

---

## Query Parameters

None

---

## Response

Size 100 array with the following type

```typescript
{
  "_id": number,
  "name": string,
  "linkedin": string | null,
  "gpa": number,
  "major": string,
  "standing": "Freshman" | "Sophomore" | "Junior" | "Senior" | "Graduate Student",
  "resume": string
}
```

---

## Error Codes

None
