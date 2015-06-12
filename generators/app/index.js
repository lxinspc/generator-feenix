'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  component: "",
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ' + chalk.yellow('feenix') + ' the ' + chalk.gray('SAP') + chalk.black('UI') + chalk.blue('5') + ' generator, it\'s full of awesome!'
    ));

    //Set up all the prompts we need
    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'SAPUI5 Project Name',
        default: this.appname
    },
      {
        type: 'input',
        name: 'identifier',
        message: 'Organisaition identifer (usually reverse domain)',
        default: 'com.gumdropandpsider',
        store: true
      },
      {
        type: 'input',
        name: 'component',
        message: 'SAPUI5 component',
        default: function (answers) {
          return answers.identifier + '.' + answers.projectName;
        }
      },
      {
        type: 'list',
        name: 'appPattern',
        message: 'Design Pattern',
        choices: [
            "Single Screen",
            "Master/Detail",
          "Master>Master/Detail"
          ]
      },
      {
        type: 'input',
        name: 'oDataUrl',
        message: 'URL to OData service'
      },
      {
        when: function(response) { return response.oDataUrl ? true : false; },
        type: 'input',
        name: 'username',
        message: 'User name for Odata service (if required)'
      },
      {
        when: function(response) { return response.oDataUrl && response.username; },
        type: 'password',
        name: 'password',
        message: 'Password'
      },
      {
        type: 'confirm',
        name: 'useMockserver',
        message: 'Use Mockserver',
        default: true
      },
      {
        when: function(response) { return response.useMockserver && response.oDataUrl; },
        type: 'confirm',
        name: 'getMetadata',
        message: 'Get metadata from server and copy to model folder',
        default: true
      },
      {
        when: function(response) { return response.getMetadata ; },
        type: 'confirm',
        name: 'createModelFiles',
        message: 'Create JSON file for each entity and entity set in metadata',
        default: true
      },
      {
        type: 'confirm',
        name: 'setupGit',
        message: 'Link to github repository',
        default: true
      },
      {
        when: function(response) { return response.setupGit; },
        type: 'input',
        name: 'gitSource',
        message: 'Git path as https',
        store: true
      },
      {
        type: 'confirm',
        name: 'createReadme',
        message: 'Create readme.md file',
        default: true,
      },
      {
        type: 'confirm',
        name: 'createNeoApp',
        message: 'Create neo-app.json file',
        default: true,
      }

    ];
    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      done();
    }.bind(this));
  },




  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
