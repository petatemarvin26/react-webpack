# React with Webpack Setup

### Author

This boilerplate was written by **Marvin Petate**

### Goals

This project aims to give understanding to our Web Developers how to setup
React Application from scratch with organized development configuration and
also for the production

This configuration was based on [Webpack Documentation](https://webpack.js.org/guide) followed the standard and best practices that requires by Webpack, to have smooth
development process to our developers and make them selves familliar with

#

### Setup for development

#### Step 1:

Clone the boilerplate

```bash
git clone https://github.com/petatemarvin26/react-webpack.git . # through https
git clone git@github.com:petatemarvin26/react-webpack.git . # through ssh
```

#### Step 2:

Install dependencies

```bash
npm install # if you are using node package manager
yarn install # if using yarn packacge manager
```

#### Step 3:

Environment variables

```bash
touch .env.dev # .env.dev ENV='development' VERSION='1.0.1'
```

> NOTE: the extension name `.dev` was based on the env variable `variant`

#

### Configure into Javascript

#### Step 1:

In [webpack/constants.js](configs/webpack/constants.js) change the `SOURCE_REGEX`

```javascript
// before
const SOURCE_REGEX = /\.(ts|tsx)$/i;
// after
const SOURCE_REGEX = /\.(js|jsx)$/i;
```

#### Step 2:

In [webpack/webpack.config.js](configs/webpack/webpack.config.js) replace the entry point from tsx into jsx or js depends on what you put on your index at [src](src) directory

```javascript
// before
const entry = resolver('src/index.tsx');
// after
const entry = resolver('src/index.jsx');
```

#### Step 3:

In [webpack/webpack.config.js](configs/webpack/webpack.config.js) change the `config.module.rules` change `ts-loader` to `babel-loader` and add the option of `configFile`

```javascript
{
  test: SOURCE_REGEX,
  loader: 'babel-loader',
  options: {
    configFile: resolver('configs/.babelrc'),
  },
},
```

#### Step 4:

Now you can start the bundler using `npm start` and open the web application

> NOTE: please uninstall unnecessary libraries in node_modules after configuration

#

### Contributing

As the owner of this repository I really appreciate the knowledge, suggestions of other contributors who helps to make this boilerplate more cleaner and efficient

We setup partially what you need, you can delete all unnecessary files, syntax that you are surely has no sense on your setup and you may add some configuration depends on what you need, this scratch boilerplate in React with Webpack can be able to use as your own project startup

#

### License

Distributed under the MIT License. See LICENSE for more information.
