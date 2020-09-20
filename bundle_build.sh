#!/bin/sh

# Config
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

INPUTFOLDER=build/static/js
OUTPUTFOLDER=build/dist
OUTPUTFILE=$OUTPUTFOLDER/surveytool-$PACKAGE_VERSION.min.js

# Script

rm -rf $OUTPUTFOLDER
mkdir $OUTPUTFOLDER

cat $(find $INPUTFOLDER -name "runtime-main.*.js") >> $OUTPUTFILE
cat $(find $INPUTFOLDER -name "2.*.js") >> $OUTPUTFILE
cat $(find $INPUTFOLDER -name "main.*.js") >> $OUTPUTFILE

echo $OUTPUTFILE
