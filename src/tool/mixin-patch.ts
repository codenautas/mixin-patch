"use strict";

import * as fs from "fs-extra";
import * as Path from "path";

export var badLineDetectorRegex=/^(\s+)([A-Za-z0-9_ö]+:\s*\([^;]*\) => [^;]*;\s*)$/mg;

export function patchCodeDts(code:string){
    return code.replace(badLineDetectorRegex, function(_all, margin, rest ){
        return margin+'// mixin-patch: '+rest;
    });
}

export function patchCodeJs(code:string){
    return code.replace(/^("use strict";?\r?\n)?"(#![^"]+)";(\r?\n)/, function(_all, useStrict, hashbang, nl){
        return hashbang+nl+(useStrict||'');
    });
}

export async function patchIfNeeded(sufix:string, path:string, patcher:(code:string)=>string){
    if(path.endsWith(sufix)){
        let readedCode = await fs.readFile(path, 'utf8');
        let patchedCode = patcher(readedCode);
        if(readedCode!=patchedCode){
            await fs.writeFile(path, patchedCode);
        }
    }
}

export async function patchPath(path:string){
    try{
        var stats = await fs.stat(path);
    }catch(err){
        if(err.code=='ENOENT'){
            throw new Error('Error in package.json in "files" entry. Can not find: '+path);
        }else{
            throw err;
        }
    }
    if(stats.isDirectory()){
        let dir = await fs.readdir(path);
        await Promise.all(dir.map(async function(pathFileOrDir){
            await patchPath(Path.join(path,pathFileOrDir));
        }));
    }else if(stats.isFile()){
        await patchIfNeeded('.d.ts',path,patchCodeDts);
        await patchIfNeeded('.js'  ,path,patchCodeJs );
    }
}

export async function copyDir(src:string, dest:string, filter:(name:string)=>boolean){
    var dirs = await fs.readdir(src);
    while(dirs.length){
        var name = dirs.shift()!;
        var srcPath=Path.join(src, name);
        var destPath=Path.join(dest, name);
        var stat = await fs.stat(srcPath);
        if(stat.isDirectory()){
            await fs.ensureDir(destPath);
            await copyDir(srcPath, destPath, filter);
        }else if(filter(name)){
            await fs.copyFile(srcPath, destPath);
        }
    }
}

export async function patchProject(path:string){
    let packageJson = await fs.readJSON(Path.join(path,'package.json'));
    if(packageJson.files.includes("dist") && (packageJson["qa-control"] || packageJson["mixin-patch"])){
        if(fs.existsSync(Path.join(path,"src"))){
            await copyDir(Path.join(path,"src"), Path.join(path,"dist"), function filter(dir){ return !dir.endsWith('.ts') && dir!='config.json'});
        }
    }
    if(Array.isArray(packageJson.files)){
        await Promise.all(packageJson.files.map(async function(element:string){
            let dirname = element.replace(/\/\*\*.*$/g,'');
            await patchPath(Path.join(path, dirname));
        })); 
    }
}

