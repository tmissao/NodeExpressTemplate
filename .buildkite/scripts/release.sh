#!/bin/bash

set -euo pipefail

if [[ -z "$DOCKER_IMAGE" ]]; then
    echo "DOCKER_IMAGE EMPTY"
    DOCKER_IMAGE=$(buildkite-agent meta-data get $DOCKER_IMAGE_KEY)
    if [[ -z "$DOCKER_IMAGE" ]]; then
        echo "DOCKER_IMAGE KEY EMPTY"
        echo "DOCKER_IMAGE is REQUIRED"
        exit -1
    fi
fi

echo "Releasing image: $DOCKER_IMAGE"

docker pull $DOCKER_IMAGE