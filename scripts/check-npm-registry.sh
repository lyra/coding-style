#!/bin/sh

registry="nexus.lbg.office.fr.lyra"

# check occurrence of lyra's registry in yarn.lock
if grep -q ${registry} yarn.lock
then
  echo "error: yarn.lock contains ${registry}"
  exit 1
fi
