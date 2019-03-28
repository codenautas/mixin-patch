"use strict";

import * as fs from "fs-extra";
import * as Path from "path";

export var badLineDetectorRegex=/^(\s+)([A-Za-z0-9_ö]+:\s*\([^;]*\) => [^;]*;\s*)$/mg;

export function patchCode(code:string){
    return code.replace(badLineDetectorRegex, function(_all, margin, rest ){
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
    if(Array.isArray(packageJson.files)){
        await Promise.all(packageJson.files.map(async function(element:string){
            let dirname = element.replace(/\/\*\*.*$/g,'');
            await patchPath(Path.join(path, dirname));
        })); 
    }
    if(packageJson.files.includes("dist") && (packageJson["qa-control"] || packageJson["mixin-patch"])){
        if(fs.existsSync(Path.join(path,"src"))){
            await copyDir(Path.join(path,"src"), Path.join(path,"dist"), function filter(dir){ return !dir.endsWith('.ts') && dir!='config.json'});
        }
    }
}

