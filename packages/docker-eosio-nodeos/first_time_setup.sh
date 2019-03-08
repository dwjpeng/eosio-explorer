#!/usr/bin/env bash

echo "=== start of first time setup ==="

# change to script's directory
cd "$(dirname "$0")"
SCRIPTPATH="$( pwd -P )"

# make sure Docker and Node.js is installed
if [ ! -x "$(command -v docker)" ] ||
   [ ! -x "$(command -v npm)" ]; then
  echo ""
  echo -e "\033[0;31m[Error with Exception]\033[0m"
  echo "Please make sure Docker and Node.js are installed"
  echo ""
  echo "Install Docker: https://docs.docker.com/docker-for-mac/install/"
  echo "Install Node.js: https://nodejs.org/en/"
  echo ""
  exit
fi

# build docker image, if necessary
if [[ "$(docker images -q eosio-gui-nodeos:eos1.6.3)" == "" ]]; then
  echo "=== Build docker image eosio-gui-nodeos version eos1.6.3, this will take some time for the first time run ==="
  docker build -t eosio-gui-nodeos:eos1.6.3 . --no-cache
else
  echo "=== Docker image already exists, skip building ==="
fi

# force remove the perivous container if any
# create a clean data folder in eosio_docker to preserve block data
echo "=== setup/reset data ==="
docker rm --force eosio_gui_nodeos_container
rm -rf "./data"
mkdir -p "./data"