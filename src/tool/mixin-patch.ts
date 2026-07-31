"use strict";

import * as fs from "fs/promises";
import { existsSync } from "fs";

import * as jsYaml from "js-yaml";

import * as Path from "path";

import bestGlobals from "best-globals"
const { changing } = bestGlobals;

import { expected } from "cast-error";

export var badLineDetectorRegex=/^(        )([A-Za-z0-9_ö]+:\s*\((.|\s)*?\) => (.|\s)*?\);)$/mg;

export function patchCodeDts(code:string){
    return code.replace(badLineDetectorRegex, function(_all, margin, rest ){
        return margin+'/* mixin-patch: '+rest+' */';
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
        var error = expected(err)
        if(error.code=='ENOENT'){
            throw new Error('Error in package.json in "files" entry. Can not find: '+path);
        }else{
            throw error;
        }
    }
    if(stats.isDirectory()){
        let dir = await fs.readdir(path);
        await Promise.all(dir.map(async function(pathFileOrDir:string){
            await patchPath(Path.join(path,pathFileOrDir));
        }));
    }else if(stats.isFile()){
        await patchIfNeeded('.d.ts',path,patchCodeDts);
        await patchIfNeeded('.js'  ,path,patchCodeJs );
    }
}

export async function copyDir(src:string, dest:string, filter:(name:string)=>boolean){
    var dirs = await fs.readdir(src);
    await fs.mkdir(dest, {recursive:true});
    while(dirs.length){
        var name = dirs.shift()!;
        var srcPath=Path.join(src, name);
        var destPath=Path.join(dest, name);
        var stat = await fs.stat(srcPath);
        if(stat.isDirectory()){
            await copyDir(srcPath, destPath, filter);
        }else if(filter(name)){
            await fs.copyFile(srcPath, destPath);
        }
    }
}

export async function readLocalConfig(path:string){
    try{
        var content = await fs.readFile(Path.join(path,'local-config.yaml'), 'utf-8');
    }catch(err){
        var error = expected(err)
        if(error.code=='ENOENT'){
            return {};
        }else{
            throw error;
        }
    }
    // js-yaml considera error un documento vacío (o sólo con espacios o comentarios)
    // pero para local-config.yaml eso equivale a que no haya configuración.
    if(content.replace(/#.*$/mg,'').trim()==''){
        return {};
    }
    return jsYaml.load(content) ?? {};
}

export async function patchProject(path:string){
    let packageJson = JSON.parse(await fs.readFile(Path.join(path,'package.json'), 'utf-8'));
    let localConfig = await readLocalConfig(path) as any
    let config = changing(localConfig, packageJson);
    if(config.files.includes("dist") && (config["qa-control"] || config["mixin-patch"])){
        var copyList = config["mixin-patch"]?.copy
        if(existsSync(Path.join(path,"src")) || copyList){
            for(var pair of (copyList || [{from:'src', to:'dist'}])){
                try{
                    await copyDir(Path.join(path,pair.from), Path.join(path,pair.to), function filter(dir){ return !dir.endsWith('.ts') && dir!='config.json'});
                }catch(err){
                    console.log('mixin-patch. ERROR copying',Path.join(path,pair.from),'to', Path.join(path,pair.to));
                    throw err;
                }
            }
        }
    }
    if((config["mixin-patch"]?.patch===true
        || config["mixin-patch"]?.patch == null
        || config["mixin-patch"]?.patch instanceof Array
        ) && Array.isArray(config.files)
    ){
        var files = config["mixin-patch"]?.patch instanceof Array ? config["mixin-patch"]?.patch : config.files;
        await Promise.all(files.map(async function(element:string){
            let dirname = element.replace(/\/\*\*.*$/g,'');
            await patchPath(Path.join(path, dirname));
        }));
    }
}
