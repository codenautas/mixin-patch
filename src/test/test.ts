"use strict";
/*jshint eqnull:true */
/*jshint globalstrict:true */
/*jshint node:true */
/*eslint-env node*/
/* global describe */
/* global it */

import * as fs from 'fs-extra';
import * as discrepances from "discrepances";
import { patchCode, patchProject } from "../..";

async function compareFiles(expectedFileName:string, obtainedFileName:string){
    var expected = await fs.readFile(expectedFileName,'utf8');
    var obtained = await fs.readFile(obtainedFileName,'utf8');
    discrepances.showAndThrow(obtained, expected);
}

var PATH='src/test/fixtures';

describe('mixin-patch', function(){
    it('deletes member function', async function(){
        var code = await fs.readFile(`${PATH}/in-app-datos-ext.d.ts`, 'utf8');
        var obtained = patchCode(code);
        await fs.writeFile(`${PATH}/local-app-datos-ext.d.ts`,obtained);
        compareFiles(`${PATH}/out-app-datos-ext.d.ts`,`${PATH}/local-app-datos-ext.d.ts`);
    });
    it('patch a project', async function(){
        await fs.copy(`${PATH}/in-app-datos-ext.d.ts`, `project4test/dist/server/app-datos-ext.d.ts`);
        await fs.copy(`${PATH}/in-app-datos-ext.d.ts`, `project4test/other/app-datos-ext.d.ts`);
        await fs.copy(`${PATH}/in-app-datos-ext.d.ts`, `project4test/none/app-datos-ext.d.ts`);
        await patchProject('project4test');
        await compareFiles(`${PATH}/out-app-datos-ext.d.ts`, `project4test/dist/server/app-datos-ext.d.ts`);
        await compareFiles(`${PATH}/out-app-datos-ext.d.ts`, `project4test/other/app-datos-ext.d.ts`);
        await compareFiles(`${PATH}/in-app-datos-ext.d.ts` , `project4test/none/app-datos-ext.d.ts`);
    })
});
