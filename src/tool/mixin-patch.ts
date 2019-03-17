"use strict";

import * as fs from "fs-extra";
import * as Path from "path";

export function patchCode(code:string){
    return code.replace(/^(\s+)([A-Za-z0-9_ö]+:\s*\([^;]*\) => [^;]*;\s*)$/mg, function(_all, margin, rest ){
        return margin+'// mixin-patch: '+rest;
    });
}

export async function patchPath(path:string){
    let stats = await fs.stat(path);
    if(stats.isDirectory()){
        let dir = await fs.readdir(path);
        await Promise.all(dir.map(async function(pathFileOrDir){
            await patchPath(Path.join(path,pathFileOrDir));
        }));
    }else if(stats.isFile()){
        if(path.endsWith('.d.ts')){
            let code = await fs.readFile(path, 'utf8');
            await fs.writeFile(path, patchCode(code));
        }
    }
}

export async function patchProject(path:string){
    let packageJson = await fs.readJSON(Path.join(path,'package.json'));
    if(Array.isArray(packageJson.files)){
        await Promise.all(packageJson.files.map(async function(element:string){
            let dirname = element.replace(/\/\*\*.*$/g,'');
            await patchPath(Path.join(path, dirname));
        })); 
    }
}

/* istanbul ignore if */
if(require.main === module){
    patchProject(process.cwd());
}