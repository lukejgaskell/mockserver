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
