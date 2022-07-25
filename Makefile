# Yeoman Volto App development

### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-xeu -o pipefail -O inherit_errexit -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

# Project settings

DIR=$(shell basename $$(pwd))
GIT_USER='collective'
GIT_NAME='volto-authomatic'
GIT_BRANCH='main'
ADDON ?= "@plone-collective/volto-authomatic"

# Recipe snippets for reuse

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`


# Top-level targets
addon-testing-project/package.json:
	npm install -g yo
	npm install -g @plone/generator-volto
	npm install -g mrs-developer
	rm -Rf addon-testing-project
	npx -p @plone/scripts addon clone https://github.com/${GIT_USER}/${GIT_NAME}.git --branch ${GIT_BRANCH}
	@echo "-------------------"
	@echo "$(GREEN)Volto project is ready!$(RESET)"

.PHONY: project
project: addon-testing-project/package.json
	@echo "$(RED)Now run: cd addon-testing-project && yarn start$(RESET)"

.PHONY: storybook
storybook: addon-testing-project/package.json
	@echo "$(GREEN)Create Storybook$(RESET)"
	(cd addon-testing-project && yarn build-storybook)

.PHONY: all
all: project

.PHONY: format-prettier
format-prettier: ## Format Code with Prettier
	yarn run prettier:fix

.PHONY: format-stylelint
format-stylelint: ## Format Code with Stylelint
	yarn run stylelint:fix

.PHONY: format
format: format-prettier format-stylelint ## Format the codebase according to our standards

.PHONY: i18n
i18n: ## Sync i18n
	yarn i18n

.PHONY: i18n-ci
i18n-ci: ## Check if i18n is not synced
	yarn i18n && git diff -G'^[^\"POT]' --exit-code

.PHONY: start-test-backend
start-test-backend: ## Start Test Plone Backend
	@echo "$(GREEN)==> Start Test Plone Backend$(RESET)"
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e SITE=plone -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors -e ADDONS='plone.app.robotframework plone.app.contenttypes plone.restapi plone.volto' plone ./bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

.PHONY: start-backend-docker
start-backend-docker:		## Starts a Docker-based backend
	@echo "$(GREEN)==> Start Docker-based Plone Backend$(RESET)"
	docker run -it --rm --name=plone -p 8080:8080 -e SITE=Plone plone/plone-backend:6.0.0a6

# Release
.PHONY: dry-release
dry-release: ## Dry release this package
	@echo "$(GREEN)==> Dry release the package$(RESET)"
	@npx release-it --dry-run

.PHONY: release
release: ## Release this package
	@echo "$(GREEN)==> Release the package$(RESET)"
	@npx release-it

.PHONY: help
help:		## Show this help.
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/' | column -c2 -t -s :)"
