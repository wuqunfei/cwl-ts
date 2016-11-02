#!/usr/bin/env bash

# clears lib directory
rm -r lib/mappings
rm -r lib/models
rm -r lib/schemas
rm lib/index.d.ts
rm lib/index.js

mkdir lib/schemas

# copies schemas (that are version controlled)
cp -R src/schemas/d2sb/ lib/schemas/d2sb/
cp -R src/schemas/draft-3/ lib/schemas/draft-3/
cp -R src/schemas/draft-4/ lib/schemas/draft-4/
cp -R src/schemas/v1.0/ lib/schemas/v1.0/

# compiles ts and generates declarations for mappings and model
tsc -p tsconfig.json

# removes tests in case tsconfig didn't exclude them
rm -r lib/tests

cd lib

#npm publish cwlts

#npm logout