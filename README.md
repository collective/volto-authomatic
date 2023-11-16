<div align="center"><img alt="logo" src="https://raw.githubusercontent.com/collective/pas.plugins.authomatic/main/docs/authomatic.svg" width="70" /></div>

<h1 align="center">OAuth2 / OpenId Authentication in Volto</h1>

Addon implementing Social Login in Volto sites.

It requires [pas.plugins.authomatic](https://github.com/collective/pas.plugins.authomatic/), version 1.0b2 or superior, to be installed and configured on the Plone backend.

<div align="center">

[![npm](https://img.shields.io/npm/v/volto-authomatic)](https://www.npmjs.com/package/volto-authomatic)
[![](https://img.shields.io/badge/-Storybook-ff4785?logo=Storybook&logoColor=white&style=flat-square)](https://collective.github.io/volto-authomatic/)
[![Code analysis checks](https://github.com/collective/volto-authomatic/actions/workflows/code.yml/badge.svg)](https://github.com/collective/volto-authomatic/actions/workflows/code.yml)
[![Unit tests](https://github.com/collective/volto-authomatic/actions/workflows/unit.yml/badge.svg)](https://github.com/collective/volto-authomatic/actions/workflows/unit.yml)

[![GitHub contributors](https://img.shields.io/github/contributors/collective/volto-authomatic)](https://github.com/collective/volto-authomatic)
[![GitHub Repo stars](https://img.shields.io/github/stars/collective/volto-authomatic?style=social)](https://github.com/collective/volto-authomatic)

</div>

## Screenshots

### Login Form

<img alt="Login Form" src="./docs/login-form.png" width="500" />

## Examples

volto-authomatic can be seen in action at the following sites:

- [Plone](https://plone.org)
- [Plone Brasil](https://plone.org.br)
- [2023 Plone Conference](https://2023.ploneconf.org)
- [2022 Plone Conference](https://2022.ploneconf.org)
- [2021 Plone Conference](https://2021.ploneconf.org)

## Install

### New Volto Project

Create a Volto project

```shell
npm install -g yo @plone/generator-volto
yo @plone/volto my-volto-project --addon @plone-collective/volto-authomatic
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
  "@plone-collective/volto-authomatic"
],

"dependencies": {
  "@plone-collective/volto-authomatic": "*"
}
```

### Test it

Go to http://localhost:3000/login

## Contribute

- [Issue Tracker](https://github.com/collective/volto-authomatic/issues)
- [Source Code](https://github.com/collective/volto-authomatic/)

## Credits

The development of this plugin has been kindly sponsored by:

- [Helmholtz Zentrum Berlin](https://www.helmholtz-berlin.de/)
- [kitconcept](http://www.kitconcept.com/)

## License

The project is licensed under [MIT](./LICENSE).