# lumen-graphcool

graph.cool template to initialize the required data model and resolver functions for `lumen-cms`

## Installation

### Required steps to get started
* Visit https://graph.cool
* Create an account and log in to your https://console.graph.cool
* check out quickstart of https://www.graph.cool/docs/quickstart/ to see what its about

## Install graphcool cli
```
npm install -g graphcool
```

## Initialize / deploy your endpoint
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

