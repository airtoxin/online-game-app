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

## License

MIT
