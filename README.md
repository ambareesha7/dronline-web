# dronline-web

> dronline

## Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:5050
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report

# fetch or update git submodules
$ git submodule update --init --recursive
$ git submodule foreach git pull origin master

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Bugs

#### Problem: On Ubuntu 18.04 hot reload doesn't work at all.
Project has to be recompiled manually on each change.

Solution ([read more](https://wiki.archlinux.org/index.php/dropbox#Filesystem_monitoring_problem)):
- inside `/etc/sysctl.d/99-sysctl.conf`, add this line:
`fs.inotify.max_user_watches = 100000`
- reload configuration
`sudo sysctl --system`


#### Problem: `Cannot find module 'escodegen'` error on CI and dev env
Reproduce in development:
- remove `node_modules`
- `yarn install`
- `yarn run dev` (error happens only first time `yarn run dev` is run)

Solution: added `"escodegen": "^1.9.1"`, to `package.json`