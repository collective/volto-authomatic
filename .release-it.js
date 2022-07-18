const fs = require('fs');

const commitTemplate = fs.readFileSync('docs/commit.hbs').toString();

module.exports = {
  npm: {
    publish: true,
  },
  git: {
    commitMessage: 'chore: release v${version}',
  },
  github: {
    release: true,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      infile: 'CHANGELOG.md',
      header: '# Changelog',
      writerOpts: {
        commitPartial: commitTemplate,
      },
      preset: {
        name: 'conventionalcommits',
      },
    },
  },
};
