#!/usr/bin/env node

// This script generates a cache key for turbo remote cache (see: https://turbo.build/docs/guides/handling-platforms) based on the current platform and architecture.

const { writeFileSync } = require('node:fs');
const { join } = require('node:path');

const { platform, arch } = process;
const file = 'turbo-cache-key.json';
const str = JSON.stringify({ platform, arch });
console.log(`Generating cache key: ${str}`);
writeFileSync(file, str);
