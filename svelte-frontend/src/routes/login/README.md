# JSON response 200

**POST**
on `http://localhost:1337/api/auth/local`

```javascript
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "user": {
    "id": 1,
    "username": "foo.bar",
    "email": "foo.bar@strapi.io",
    "provider": "local",
    "confirmed": true,
    "blocked": false,
    "createdAt": "2022-06-02T08:32:06.258Z",
    "updatedAt": "2022-06-02T08:32:06.267Z"
  }
}
```