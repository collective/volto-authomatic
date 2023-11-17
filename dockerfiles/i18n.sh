#!/bin/sh
cd "/app/src/addons/${ADDON_PATH}/" && /app/node_modules/.bin/i18n --addon && rm -Rf build || exit
