#!/bin/bash

set -euo pipefail

if [[ -z "$DOCKER_IMAGE" ]]; then
    echo "DOCKER_IMAGE EMPTY"

    REGISTRY=$(buildkite-agent meta-data get $DOCKER_IMAGE_REGISTRY_KEY)
    IMAGE=$(buildkite-agent meta-data get $DOCKER_IMAGE_NAME_KEY)
    TAG=$(buildkite-agent meta-data get $DOCKER_IMAGE_TAG_KEY)

    if [[ -z "$REGISTRY" || -z "$IMAGE" || -z "$TAG" ]]; then
        echo "Wrong Docker Image: $REGISTRY/$IMAGE:$TAG"
        exit -1
    fi

    DOCKER_IMAGE="$REGISTRY/$IMAGE:$TAG"
fi

echo "Releasing image: $DOCKER_IMAGE"

docker pull $DOCKER_IMAGE