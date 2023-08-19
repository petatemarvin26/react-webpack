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
touch .env # .env PORT=4321 HOST=1.2.3.4
```

> NOTE: arbitrary build with env is base on the env `variant` at npm script `.env.dev`

#

### Configure into Javascript

#### Step 1:

Rename the javascript configuration file from `tsconfig.json` to `jsconfig.json`

#### Step 2:

Install the `babel-plugin-module-resolver`

```bash
npm i -D babel-plugin-module-resolver
```

#### Step 3:

Implement module resolver on our [config/.babelrc][babelrc] to resolving the relative path from `jsconfig.json`

```json
{
  "plugins": [["module-resolver", {"root": ["./src"]}]]
}
```

#### Step 4:

Change the entry file from `index.tsx` to `index.jsx` at [webpack.config.js][webpack-config]

```Javascript
const entry = {
  index: './index.jsx'
};
```

#### Step 5:

Lets clean up!, uninstall the `tsconfig-paths-webpack-plugin` and remove all related implementation to this library, dont forget `typescript` as well

#### Step 6:

Now you can start the bundler using `npm start`

> NOTE: please uninstall unnecessary libraries in node_modules after configuration

#

### Contributing

As the owner of this repository I really appreciate the knowledge, suggestions of other contributors who helps to make this boilerplate more cleaner and efficient

We setup partially what you need, you can delete all unnecessary files, syntax that you are surely has no sense on your setup and you may add some configuration depends on what you need, this scratch boilerplate in React with Webpack can be able to use as your own project startup

#

### License

Distributed under the MIT License. See LICENSE for more information.

[webpack-config]: /config/webpack/webpack.config.js
[babelrc]: /config/.babelrc
