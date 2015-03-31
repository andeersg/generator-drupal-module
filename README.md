# Drupal Module Generator! [![Build Status](https://travis-ci.org/andeersg/generator-drupal-module.svg?branch=master)](https://travis-ci.org/andeersg/generator-drupal-module)

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
