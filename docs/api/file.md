# POST /api/file

## Description

This route posts a specified user to ResumeBook. This user will not be approved immeadiately.

---

## Authentication

None

---

## Query Parameters

| Name     | Type   | Description                               | Preconditions                              |
| -------- | ------ | ----------------------------------------- | ------------------------------------------ |
| name     | string | Name of the user                          | None                                       |
| email    | string | Email of the user                         | None                                       |
| linkedin | string | LinkedIn profile of the user              | Starts with "https://www.linkedin.com/in/" |
| gpa      | string | GPA of the student                        | None                                       |
| major    | string | Major of the user                         | None                                       |
| standing | string | The year of the students (ex: "Freshman") | None                                       |
| pdf      | base64 | The resume of the user                    | less than 25 megabytes                     |

---

## Response

```typescript
{
  "message": string | null,
  "error": string | null
}
```

| Name    | Type           | Description                                                               |
| ------- | -------------- | ------------------------------------------------------------------------- |
| message | string \| null | Either a success message if completed or null if there was an error       |
| error   | string \| null | Either null if operation was successful or a string if there was an error |

---

## Error Codes

| Code | Meaning                                           |
| ---- | ------------------------------------------------- |
| 500  | Trouble with our servers. Check the error message |
| 401  | User is not verified                              |
