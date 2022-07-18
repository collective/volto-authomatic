# Social Login for Volto (volto-authomatic)

Addon implementing Social Login in Volto sites. It requires [pas.plugins.authomatic](https://github.com/collective/pas.plugins.authomatic/), version 1.0b2 or superior, to be installed and configured on the Plone backend.

[![Code analysis checks](https://github.com/collective/volto-authomatic/actions/workflows/code.yml/badge.svg)](https://github.com/collective/volto-authomatic/actions/workflows/code.yml)
[![Unit tests](https://github.com/collective/volto-authomatic/actions/workflows/unit.yml/badge.svg)](https://github.com/collective/volto-authomatic/actions/workflows/unit.yml)

## Screenshots

### Login Form

<img alt="Login Form" src="./docs/login-form.png" width="500" />

## Examples

volto-authomatic can be seen in action at the following sites:

- [2021 Plone Conference](https://2021.ploneconf.org)

## Install

### New Volto Project

Create a Volto project

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

### Existing Volto Project

If you already have a Volto project, just update `package.json`:

```JSON
"addons": [
    "volto-authomatic"
],

"dependencies": {
    "volto-authomatic": "*"
}
```

### Test it

Go to http://localhost:3000/login

## Credits

The development of this plugin has been kindly sponsored by:

- [Helmholtz Zentrum Berlin](https://www.helmholtz-berlin.de/)
- [kitconcept](http://www.kitconcept.com/)
