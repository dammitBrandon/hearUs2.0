# MEAN HearUs Project

This applications structure is based off of our own Phil MacCart's MEAN Boilerplate.  More information on repo can be found
the MEAN Stack can be found in his [MEAN Boilerplate repo](https://github.com/pmaccart/mean-boilerplate "Phil MacCart's MEAN Stack").
Client module based off of Josh David Miller's awesome ngBoilerplate project, with a couple changes:
- updated versions of Angular, Angular UI Router, and Angular Bootstrap, and Bootstrap
- use Jade for templating

## Project Overview


## Getting Started

First, make sure you have the necessary dependencies installed:
- NodeJS: http://nodejs.org/
- MongoDB: http://www.mongodb.org/downloads
- Git: http://git-scm.com/downloads

### Clone the Git repository

```shell
git clone https://github.com/pmaccart/mean-boilerplate.git
```

### Start MongoDB

Run per the instructions for your host environment:
- http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/
- http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/
- http://docs.mongodb.org/manual/administration/install-on-linux/

### Install grunt-cli and bower as global dependencies (if not already installed)

```shell
npm install -g grunt-cli bower
```

### Install the client dependencies

```shell
cd mean-boilerplate/client
npm install
bower install
```

### Build and watch the client app
```shell
grunt watch
```

### Run and watch the NodeJS server app
```shell
# in a new shell...
cd mean-boilerplate/server
grunt watch
```

Once running, you can navigate to http://localhost:3000 to view the application.

## Running end-to-end tests
To run the end-to-end tests, a Selenium server must be available to control. The server JAR file
can be installed within the node_modules directory by running the following:
```shell
cd client
node node_modules/protractor/bin/webdriver-manager update
```

The E2E tests can then be run using Grunt
```shell
grunt e2e
```

## Deploying to Heroku with Git
Full documentation can be found on [Heroku's website](https://devcenter.heroku.com/articles/git)

### Installing the Heroku Toolbelt
The `heroku` command-line tool is an interface to the Heroku Platform API and includes support for things like creating/renaming apps, 
running one-off dynos, taking backups, configuring add-ons and managing your app’s state. 
It’s generally installed in your local dev environment as part of the [Heroku Toolbelt](https://toolbelt.heroku.com).

The Heroku Command Line Interface (CLI) is the main tool that is used for the majority of tasks related to Heroku and deployment, 
more about the CLI can be found [here](https://devcenter.heroku.com/categories/command-line "Heroku CLI").

### Getting access to the Portfolio Matrix Application Heroku instance.
To gain access to the Heroku instance of the Portfolio Matrix application and push code to the Heroku repository you must request
access to the Heroku repository and set up your local Git repo correctly.  To gain access to the Heroku platform please contact
[Brandon Bailey](brandon.bailey@slalom.com) or [Dennis Janek](dennisj@slalom.com).  After you have gained access to the repo you
can set up Heroku git repo locally.

### Adding Portfolio Matrix Heroku repo remote
You can create a new Heroku remote but that will be its own application and more documentaion for that can be found [here](git@heroku.com:portfolio-matrix.git "Heroku Docs").
To contribute to this project's Heroku instance you will add a remote using the git URL which is `git@heroku.com:portfolio-matrix.git`. like so:
 
 ```shell
 heroku git:remote -a portfolio-matrix
 Git remote heroku added
 ```
 
You can verify the remote in you git configuration as such:
```shell
git remote -v
heroku	git@heroku.com:portfolio-matrix.git (fetch)
heroku	git@heroku.com:portfolio-matrix.git (push)
origin	https://[username]@bitbucket.org/slalom-consulting/slalom-portfolio-matrix.git (fetch)
origin	https://[username]@bitbucket.org/slalom-consulting/slalom-portfolio-matrix.git (push)
```

### Deploying code
We currently have an application deployed but there is only one repo branch which is master.  Conventionally you push code as such, branches pushed to Heroku other than `master` will be ignored:
 
```shell
git push heroku master
Initializing repository, done.
updating 'refs/heads/master'
```

If you are following our established workflow, [gitflow](http://nvie.com/posts/a-successful-git-branching-model/ "an introductionary gitflow blog post") then you know that we will be mainly deploying from the `develop` branch.  
To push to Heroku from branches other than `master` use this syntax:

```shell
git push heroku [branch-name]:master
```

### Canceling a deployment

When deploying code using git push, you can interrupt the build process on Heroku by pressing Ctrl + C on your machine. 
As long as this is not done as the build process completes (generally around the “Launching…” message),
and you’ve taken latency into account, then it will halt the build process and no new release will be generated.

### Deploying an AngularJS application

When deploying your code to Heroku you will need to build the application and add the /build sub directory to be staged for the next commit, 
being that the /build sub dir is a part of the .gitignore file it will not add the sub dir therefore you must use the `-f` flag.

```shell
git add client/build -f
```

After the build sub directory has been added commit changes and push to heroku `git push heroku develop:master`, and then remove the build dir from git's index:

```shell
git rm -rf --cached client/build
```

## Folder Structure

Client holds Angular, HTML, CSS, Image resources. Can be optimized for production or left raw for dev.

    client/
      |- Gruntfile.js                   # Specific to client app tasks
      |- build.config.js
      |- src/
      |  |- index.tpl.html              # top-level page for unauthenticated users
      |  |- billing.tpl.html            # top-level page for billing (optional)
      |  |- dashboard.tpl.html          # top-level page for dashboard (optional)
      |  |- app/                        # app specific code
      |  |  |- app.js
      |  |  |- app.spec.js
      |  |- assets/                     # static files (e.g. images, fonts)
      |  |  |- fonts/
      |  |  |- images/
      |  |- common/                     # shared components (modules/services/directives/filters)
      |  |  |- data/                    # mock data (likely only for prototyping)
      |  |  |- filters/
      |  |  |  |- phone-number-filter.js
      |  |  |- services/
      |  |  |  |- account-service.js
      |  |  |  |- billing-service.js
      |  |  |- directives/
      |  |  |- modules/                 # shared modules that are re-used across the application
      |  |  |  |- header/
      |  |  |  |  |- header.js
      |  |  |  |  |- header.spec.js
      |  |  |  |  |- header-controller.js
      |  |  |  |  |- header-controller.spec.js
      |  |  |  |  |- header-template.jade
      |  |  |  |  |- header.scss
      |  |- vendor/                     # 3rd-party resources
      |  |  |- bootstrap/
      |  |  |- angular/
      |  |  |- angular-ui-router/
      |  |- css/                        # CSS
      |- test_config/
      |  |- karma.unit.config.tpl.js
      |  |- protractor.e2e.config.tpl.js
      |- test_e2e/
      |  |- pages/                      # page representations (see [Page Objects](https://code.google.com/p/selenium/wiki/PageObjects))
      |  |- tests/                      # test specs


Server hold Node resources.

    server/
      |- Gruntfile.js           # Specific to server app tasks
      |- server.js              # Node server
      |- lib/
      |  |- middleware.js
      |  |- routes.js
      |  |- config/
      |  |  |- express.config
      |  |  |- passport.config
      |  |  |- env/             # env configuration
      |  |- controllers/        # route handlers
      |  |- models/             # business object representations
      |  |- domain/             # repository object representations
      |  |- repositories/       # Integrations


Tools hold application and setup related tooling

    tools/
      |- db                     # database scripts
