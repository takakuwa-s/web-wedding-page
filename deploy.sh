#!/bin/sh

# Check number of arguments
if test $# -ne 1 ; then
  echo "number of arguments is not correct"
  exit 1
fi

if [[ "$1" != "dev" ]] && [[ "$1" != "prod" ]] ; then
  echo "argument is not correct: $1"
  exit 1
fi

if test $1 = "dev" ; then
  echo "----- build -----"
  npm run build-dev

  echo "----- switch firebase -----"
  firebase use dev
else
  echo "----- build -----"
  npm run build

  echo "----- switch firebase -----"
  firebase use prod
fi

echo "----- deploy -----"
firebase deploy