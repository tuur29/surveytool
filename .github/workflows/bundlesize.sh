#!/bin/bash

# remove license and map files + renames so it is uploaded
./node_modules/.bin/stats-webpack-markdown --filterOnlyChanged --oldStats stats-base.json --newStats stats-head.json --outputFile diff.md
awk '!/\.LICENSE|map/' diff.md > stats.md
