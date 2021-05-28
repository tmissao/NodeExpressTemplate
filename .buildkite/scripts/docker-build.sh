#!/bin/bash

set -euo pipefail

echo $DOCKER_IMAGE

docker login -u $dockeruser -p $dockerpassword
docker build -t $DOCKER_IMAGE .
docker push $DOCKER_IMAGE