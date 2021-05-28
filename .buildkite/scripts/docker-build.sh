#!/bin/bash

set -euo pipefail

docker login -u $dockeruser -p $dockerpassword
docker build -t $dockeruser/$APPLICATION:$BUILDKITE_BUILD_ID .
docker push $dockeruser/$APPLICATION:$BUILDKITE_BUILD_ID