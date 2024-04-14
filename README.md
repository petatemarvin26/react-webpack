# React with Webpack Setup

### Author

This boilerplate was written by **Marvin Petate**

### Goals

This project aims to give understanding to our Web Developers how to setup
React Application from scratch with organized development configuration and
also for the production

This configuration was based on [Webpack Documentation] followed the standard and best practices that requires by Webpack, to have smooth
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

Implement module resolver on our [config/.babelrc] to resolving the relative path from `jsconfig.json` and remove preset `@babel/preset-typescript`

```Diff
{
   "presets": [
      ...
      ["@babel/preset-react", {"runtime": "automatic"}]
-     ["@babel/preset-typescript"]      
   ],
+ "plugins": [["module-resolver", {"root": ["./src"]}]]
}
```

#### Step 4:

Modify webpack configuration at [webpack.config.js]

```Diff
...
const {DefinePlugin} = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
- const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
- const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');



const entry = {
-  index: resolver('index.tsx')
+  index: resolver('index.jsx')
};

...
const plugins = [
  ...
-  new ForkTsCheckerWebpackPlugin()
];

...å
const resolve = { 
-  plugins: [new TsconfigPathsPlugin()],
   extensions: ['.js', '.jsx', '.ts', '.tsx']
};
```
> Dont forget to rename your source files `*.tsx` to `*.jsx` 

#### Step 5:

Now you can start the bundler using `npm start`

> NOTE: please uninstall unnecessary libraries in node_modules after configuration

#

### Contributing

As the owner of this repository I really appreciate the knowledge, suggestions of other contributors who helps to make this boilerplate more cleaner and efficient
#

### License

Distributed under the MIT License. See LICENSE for more information.

[Webpack Documentation]: https://webpack.js.org/guide
[webpack.config.js]: /config/webpack/webpack.config.js
[config/.babelrc]: /config/.babelrc
