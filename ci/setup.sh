#! /bin/bash

#
# Colors to use with echo
#
RED="\033[31m"
BLUE="\033[34m"
GREEN="\033[32m"
RESET="\033[0m"

#
# Check if Homebrew was installed
#
which -s brew
if [[ $? != 0 ]] ; then
  echo -e "${GREEN}Installing Homebrew...${RESET}"
  ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi

#
# Check if Node was installed
#
which -s node
if [[ $? != 0 ]] ; then
  echo -e "${GREEN}Installing Node.js...${RESET}"
  brew install node
fi

#
# Check if Browserify was installed
#
which -s browserify
if [[ $? != 0 ]] ; then
  echo -e "${GREEN}Installing Browserify...${RESET}"
  npm install -g browserify
fi

#
# Check if React was installed
#
reactWasFound=1
ls node_modules | grep react >/dev/null 2>&1 || { reactWasFound=0; }

if [[ $reactWasFound == 0 ]] ; then
  npm install
fi
