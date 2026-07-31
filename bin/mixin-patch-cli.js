#!/usr/bin/env node

import { patchProject } from '../dist/mixin-patch.js';

patchProject(process.cwd()).catch(function(err){
    console.error(err);
    process.exit(1);  /* eslint-disable-line no-process-exit */
});
