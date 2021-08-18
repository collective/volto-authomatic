# Social Login for Volto (volto-authomatic)


Addon implementing Social Login in Volto sites. It requires [pas.plugins.authomatic](https://github.com/collective/pas.plugins.authomatic/), version 1.0b2 or superior, to be installed and configured on the Plone backend.

## Install

If you already have a Volto project, just update `package.json`:

```JSON
"addons": [
    "volto-authomatic"
],

"dependencies": {
    "volto-authomatic": "*"
}
```

If not, create one:

```shell
npm install -g yo @plone/generator-volto
yo @plone/volto my-volto-project --addon volto-authomatic
cd my-volto-project
```

Install new add-on and restart Volto:

```shell
yarn install
yarn start
```

Go to http://localhost:3000
