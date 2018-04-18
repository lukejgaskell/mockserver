### description
super simple server to mock api responses to assist in front end development

### installation
`npm install --save-dev lukejgaskell/mockserver`

### setup
files under the mockFolder will respond as the rest endpoints
files should be titled in this format: `myEndpoint.get.json`, `myEndpoint.post.json`, `myEndpoint.put.json`... etc

the file should be an object with the fields `body`, `status`, `headers` (any other format of this file will just return the full file as the body)
```
{
  "status": 200          // defaults to 200 if not specified
  "headers": {           // empty if not specified
    "key": "value"
  },
  "body": {              // null if not specified (no body)
    "key": "value"
  }
}
```

### configuration
you can also pass a configuration object to the method to override properties (defaults to values shown)
```
config = {
    "port": 3000,
    "mockFolder": "./mock_data",
    "apiPath": "/api",
    "distFolder": "./dist"
}
```

### how to run
update package.json scripts
```
 "scripts" {
    "mockserver": "node -e "require('mockserver')(config);"
 }
```
`npm run mockserver`

### mock_data
- The mock_data you create is convention based structure to simulate the rest api
- Treat the rest endpoint like a directory structure in the mock_data
- For example with the above configuration the endpoint GET /api/myData would be
```
mock_data
  - myData.get.json
```
or POST /api/users/1/activity would be
```
mock_data
  - users
    - 1
      - activity.post.json
```
