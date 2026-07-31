#!/usr/bin/env node

"use strict";

import { patchProject } from '../dist/mixin-patch.js';

patchProject(process.cwd()).catch(function(err){
    console.error(err);
    process.exit(1);
});
