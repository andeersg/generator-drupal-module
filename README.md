Drupal Module Generator!
========================
[![Build Status](https://travis-ci.org/andeersg/generator-drupal-module.svg?branch=master)](https://travis-ci.org/andeersg/generator-drupal-module)
[![Coverage Status](https://coveralls.io/repos/andeersg/generator-drupal-module/badge.svg)](https://coveralls.io/r/andeersg/generator-drupal-module)
[![Code Climate](https://codeclimate.com/github/andeersg/generator-drupal-module/badges/gpa.svg)](https://codeclimate.com/github/andeersg/generator-drupal-module)

Fast and easy way to setup a module scaffolding with the most important files and functions you need to start developing.

## Usage

Install Yeoman and this generator:
```
npm install -g yo generator-drupal-module
```

And then go to ``sites/all/modules`` and type:
```
yo drupal-module
```
And answer some questions to get started.

## Generated file structure:

For now it creates .info-file, .module-file and .install-file with a couple of hooks that
are pretty common.

    Modulefolder
      |- modulename.info
      |- modulename.install
      |- modulename.module
      |- templates

## Planned:

1. More hooks
2. Other useful stuff? (know of something you think others also could benefit from? create an issue)
