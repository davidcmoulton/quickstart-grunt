# Grunt starting setup for projects

This repo offers a quick up-and-running Grunt build starting point. It's built for front end in mind, so uses commonjs with browserify. Testing is with Jest. Module composition likely to change as and when various project requirements dictate. Works for what I want it to do, however YMMV.

## Modules currently specified

+ grunt
+ grunt-autoprefixer
+ grunt-browserify
+ grunt-contrib-clean
+ grunt-contrib-csslint
+ grunt-contrib-cssmin
+ grunt-contrib-jshint
+ grunt-contrib-uglify
+ grunt-contrib-watch
+ grunt-jest
+ grunt-jsdoc
+ jest-cli

## Prerequisites

+ npm 
+ grunt-cli (```npm install -g grunt-cli```)

## Install dependancies

1. clone this repo
1. add your project details into package.json
1. ```npm install```

## Run the build

+ ```grunt build```

## Check result

1. verify the build passes
1. verify these files have been built:
  + ```dist/js/[yourProjectName].js```
  + ```dist/css/[yourProjectName].css```
  
1. update ```index.html``` to call in these js and css files: ```[yourProjectName].js``` and ```[yourProjectName].css```, and load in a browser.

## Licence

This work is available under the MIT licence: [http://davidcmoulton.mit-license.org](http://davidcmoulton.mit-license.org)

