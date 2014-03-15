#!/bin/bash

# Written by Daniel Kolsoi
# $1 directory, $2 directory mod type, $3 file mod type, $4 regex file types
# Typical usage: ./modallof.sh . 711 644 ".*/*\.css\|.*/*\.php\|.*/*\.js\|.*/*\.png"

# Mod all specified files
for f in $(find $1 -regextype sed -regex $4); do chmod $3 $f; done;

# Mod all subdirectories
for f in $(ls -p | grep "/"); do chmod $2 $f; done;

echo "Script complete."
