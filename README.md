# online-game-app

## Need to know

### Need rebuild

Execute those codes after installing modules.

```sh
npm install --save-dev electron-rebuild
./node_modules/.bin/electron-rebuild
```

[details](https://electronjs.org/docs/tutorial/using-native-node-modules)

### css-modules

`electron-webpack` provides `.css` file configuration automatically, but that one was not suit for css-modules.
So we use `.cssmodules` extension for css file.

_Note: `electron-webpack` provides way to [modifying default configuration](https://webpack.electron.build/modifying-webpack-configurations) internally uses [`webpack-merge`](https://github.com/survivejs/webpack-merge)'s smart method, but that doesn't works well._ 

### redux-persist type definition

`redux-persist` have type definition file in project directory, also in `@types/redux-persist` but those are not works correctly.

```
  TS7016: Could not find a declaration file for module 'redux-persist'. '/Users/airtoxin/repositories/online-game-app/node_modules/redux-persist/lib/index.js' implicitly has an 'any' type.
    Try `npm install @types/redux-persist` if it exists or add a new declaration (.d.ts) file containing `declare module 'redux-persist';`
```

So, in this project, to avoiding this, use require syntax to import redux-persist.

## License

MIT
