# React with Webpack Setup

### Author

#### This project was written by **Marvin Petate**

### Description

This project is for template purposes that powered by `Webpack`, `Babel`,`ESlint` and `React` library,

We setup partially what you need, you can delete all unnecessary files, syntax that you are surely has no sense on your setup and you may add some configuration depends on what you need, this scratch project template in React with Webpack can be able to use as your own project start up

### Goals

This project aims to give understanding to our Web Developers how to setup
React Application from scratch with organized development configuration and
also for the production

This configuration was based on [Webpack Documentation](https://webpack.js.org/guide) followed the standard and best practices that requires by Webpack, to have smooth
development process to our developers and make them selves familliar with

#

### Setup Development

#### Step 1:

Install dependencies

```bash
npm install # node package manager yarn install # using yarn packacge manager
```

#### Step 2:

Setup environment variables

```bash
touch .env.dev # .env.dev ENV='development' VERSION='1.0.1'
```

#

### Configure into Javascript

#### Step 1:

In [webpack/constants.js](configs/webpack/constants.js) replace the source regex into js or jsx

```Javascript
// before
const SOURCE_REGEX = /\.(ts|tsx)$/i;
// after
const SOURCE_REGEX = /\.(js|jsx)$/i;
```

#### Step 2:

In [webpack/webpack.config.js](configs/webpack/webpack.config.js) replace the entry point from tsx into jsx or js depends on what you put on your index at [src](src) directory

```javascript
// before
const entry = `${ROOT_DIR}/src/index.tsx`;
// after
const entry = `${ROOT_DIR}/src/index.jsx`;
```

#### Step 3:

In [webpack/webpack.dev.js](configs/webpack/webpack.dev.js) and [webpack/webpack.prod.js](configs/webpack/webpack.prod.js) inside the `config.module.rules[0]` remove the `ts-loader` because it doesn't make sense using this loader since we are using javascript

```javascript
// at rules 0 index
{
  test: SOURCE_REGEX,
  use: [
    {
      loader: 'babel-loader',
      ...
    },
    ...
    'ts-loader' // remove this line
  ]
},
```

> NOTE: You may also uninstall this loader

#### Step 4:

Now you can start the bundler using `npm start` and open the web application

#

### Empower Us

As a new contributor who helps other devs on their queries about scratch works, here is my configuration setup at React using Webpack
