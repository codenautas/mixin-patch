#!/usr/bin/env node

"use strict";

var patchProject = require('..').patchProject;

patchProject(process.cwd());