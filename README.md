# GraphQL backend/endpoint for `lumen-cms`

Lumen-CMS is designed as a full working API-driven CMS with GraphQL backend. This project consist of all required schema and resolver functions to create your backend. After the graph.cool deploy you will receive the endpoints to connect your `lumen-cms` to your backend.
To get your project up and running 3 environment variables are necessary:
* GRAPHQL_ALIAS
* GRAPH_FILE_API
* GRAPHQL_SUBSRIPTION

## Getting started

### Create an account at https://graph.cool
* Visit https://graph.cool
* Create an account and log in to your https://console.graph.cool
* check out quickstart of https://www.graph.cool/docs/quickstart/ 

#### Install graphcool cli
```
npm install -g graphcool
```

### Clone this repository
* clone this repository
* log into your graphcool cli
* run graphcool deploy
```
git clone https://github.com/lumen-cms/lumen-graphcool.git your-project
cd your-project
graphcool deploy
```

### Set up your graphcool target
* create .graphcoolrc
```
targets:
  project: [your-endpoint] // => check out the settings of your graph.cool backend
```
Now you can do:
```
graphcool deploy --target project
```

## Connect `lumen-cms` with your backend
* visit the 'ENDPOINTS' section of your https://console.graph.cool (on the bottom left corner)
* copy Project ID or Project Alias from the settings
* copy SUBSCRIPTION section without wss:// (example: subscriptions.us-west-2.graph.cool)
* move to your `lumen-cms` project
* edit `lumen-cms` nuxt.config.js ENV variables as follow:
```js
// nuxt.config.js
module.exports={
  env:{
    GRAPHQL_ALIAS: '[Project ID]', // alternative Project Alias
    GRAPH_FILE_API: '[Project ID]', // alternative Project Alias
    GRAPHQL_SUBSRIPTION: '[SUBSCRIPTION]'
  }
}
```

### Extend your schema
You can add as many resolver/schema up to your needs. Only keep track if some files changes from the core schema file.

