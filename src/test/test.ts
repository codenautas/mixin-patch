"use strict";
/*jshint eqnull:true */
/*jshint globalstrict:true */
/*jshint node:true */
/*eslint-env node*/
/* global describe */
/* global it */

import * as fs from 'fs-extra';
import * as discrepances from "discrepances";
import { patchCodeDts, patchCodeJs, patchProject } from "../..";
import * as Path from 'path';

import { unexpected } from "cast-error";

async function compareFiles(expectedFileName:string, obtainedFileName:string){
    var expected = await fs.readFile(expectedFileName,'utf8');
    var obtained = await fs.readFile(obtainedFileName,'utf8');
    discrepances.showAndThrow(obtained, expected);
}

var PATH='src/test/fixtures';

describe('mixin-patch', function(){
    it('deletes member function', async function(){
        var code = await fs.readFile(`${PATH}/in-app-datos-ext.d.ts`, 'utf8');
        var obtained = patchCodeDts(code);
        await fs.writeFile(`${PATH}/local-app-datos-ext.d.ts`,obtained);
        await compareFiles(`${PATH}/out-app-datos-ext.d.ts`,`${PATH}/local-app-datos-ext.d.ts`);
    });
    it('honours shebang', async function(){
        var code = await fs.readFile(`${PATH}/in-shebang.js`, 'utf8');
        var obtained = patchCodeJs(code);
        await fs.writeFile(`${PATH}/local-shebang.js`,obtained);
        await compareFiles(`${PATH}/out-shebang.js`,`${PATH}/local-shebang.js`);
    });
    it('honours shebang from ts', async function(){
        var code = await fs.readFile(`${PATH}/in-shebang-from-ts.js`, 'utf8');
        var obtained = patchCodeJs(code);
        await fs.writeFile(`${PATH}/local-shebang-from-ts.js`,obtained);
        await compareFiles(`${PATH}/out-shebang-from-ts.js`,`${PATH}/local-shebang-from-ts.js`);
    });
    it('patch a project', async function(){
        await fs.ensureDir(`${PATH}/src`)
        await fs.copy(`${PATH}/in-app-datos-ext.d.ts`, `project4test/dist/server/app-datos-ext.d.ts`);
        await fs.copy(`${PATH}/in-app-datos-ext.d.ts`, `project4test/other/app-datos-ext.d.ts`);
        await fs.copy(`${PATH}/in-app-datos-ext.d.ts`, `project4test/none/app-datos-ext.d.ts`);
        await patchProject('project4test');
        await compareFiles(`${PATH}/out-app-datos-ext.d.ts`, `project4test/dist/server/app-datos-ext.d.ts`);
        await compareFiles(`${PATH}/out-app-datos-ext.d.ts`, `project4test/other/app-datos-ext.d.ts`);
        await compareFiles(`${PATH}/in-app-datos-ext.d.ts` , `project4test/none/app-datos-ext.d.ts`);
    })
    it('found a bug', async function(){
        this.timeout(99999999);
        var code = await fs.readFile(`${PATH}/in-bug-found.d.ts`, 'utf8');
        var obtained = patchCodeDts(code);
        await fs.writeFile(`${PATH}/local-bug-found.d.ts`,obtained);
        await compareFiles(`${PATH}/out-bug-found.d.ts`,`${PATH}/local-bug-found.d.ts`);
    });
});

describe('copy codenautas dist', function(){
    it('copies /src/client/** into /dist/client/**', async function(){
        await fs.remove('local-project');
        await fs.ensureDir('local-project/dist')
        await fs.ensureDir('local-project/src/client/img')
        await fs.ensureDir('local-project/src/client/css')
        await fs.ensureDir('local-project/src/unlogged/img')
        await fs.writeFile('local-project/src/client/img/uno.png'      ,'uno'   )
        await fs.writeFile('local-project/src/client/css/dos.styl'     ,'dos'   )
        await fs.writeFile('local-project/src/unlogged/img/tres.png'   ,'tres'  )
        await fs.writeFile('local-project/src/unlogged/img/cuatro.jpeg','cuatro')
        await fs.writeFile('local-project/src/unlogged/cinco.ts'       ,'cinco' )
        await fs.writeFile('local-project/src/unlogged/seis.js'        ,'"#!/bin/node yes";\nconsole.log("yes");\n')
        await fs.writeJSON('local-project/package.json',{files:["dist"], "mixin-patch":true});
        await patchProject('local-project');
        await fs.writeFile('local-project/src/unlogged/seis.js'        ,'#!/bin/node yes\nconsole.log("yes");\n')
        await compareFiles('local-project/src/client/img/uno.png'      ,'local-project/dist/client/img/uno.png'      )
        await compareFiles('local-project/src/client/css/dos.styl'     ,'local-project/dist/client/css/dos.styl'     )
        await compareFiles('local-project/src/unlogged/img/tres.png'   ,'local-project/dist/unlogged/img/tres.png'   )
        await compareFiles('local-project/src/unlogged/img/cuatro.jpeg','local-project/dist/unlogged/img/cuatro.jpeg')
        await compareFiles('local-project/src/unlogged/seis.js'        ,'local-project/dist/unlogged/seis.js'        )
        var exists = fs.existsSync('local-project/dist/unlogged/cinco.ts');
        discrepances.showAndThrow(exists, false);
    });
    it('inform inexisting path in "files" entry', async function(){
        await fs.remove('local-project');
        await fs.ensureDir('local-project/dist')
        await fs.ensureDir('local-project/src/client/img')
        await fs.ensureDir('local-project/src/client/css')
        await fs.ensureDir('local-project/src/unlogged/img')
        await fs.writeFile('local-project/src/client/img/uno.png'      ,'uno'   )
        await fs.writeFile('local-project/src/client/css/dos.styl'     ,'dos'   )
        await fs.writeFile('local-project/src/unlogged/img/tres.png'   ,'tres'  )
        await fs.writeFile('local-project/src/unlogged/img/cuatro.jpeg','cuatro')
        await fs.writeFile('local-project/src/unlogged/cinco.ts'       ,'cinco' )
        await fs.writeJSON('local-project/package.json',{files:["dist","inexisting"], "mixin-patch":true});
        try{
            await patchProject('local-project');
            throw new Error('must throw')
        }catch(err){
            var error = unexpected(err);
            discrepances.showAndThrow(error.message,'Error in package.json in "files" entry. Can not find: local-project'+Path.sep+'inexisting');
        }
    });
});
