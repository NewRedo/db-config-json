# db-config-json
Read a specific style of configuration file.

```json
{
  "database": {
    "host": "host",
    "username": "username",
    "password": "password",
    "database": "database",
    "db1": {
      "username": "username1",
      "password": "password1",
      "database": "database1"
    },
    "db2": {
      "host": "host2",
      "username": "username2",
      "password": "password2",
      "database": "database2"
    }
  }
}
```

For a given database name, first the items at the lowest level are used, defaulting to the items at the top if there is no match.
