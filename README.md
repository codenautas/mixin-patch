# mixin-patch
Patch the mixin problem [#28799](https://github.com/Microsoft/TypeScript/issues/28799)

## main goal
Patch the problem described in [issue #28799 of Typescript development team](https://github.com/Microsoft/TypeScript/issues/28799)

When you use several stacked Mixins using [TypeScript 2.2+
Support for Mix-in classes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html)  you can get this kind of error:

<font style=font-family:consolas,monospace;background-color:#DDD>- <font color=red>error</font> TS2425: Class '{ *someName*(): ... } & { *someName*:(()....' defines instance member property '*someName*', but extended class '*className*' defines it as instance member function.</font>

## usage
  * include in `package.json ⟶ devDependencies`
  * add `& mixin-patch` at the end of the `"build"` script (for example: `"build": "tsc & mixin-patch"`)

## mixin-patch
Mixin-patch patch all of `.d.ts` with these steps:
   1. It reads `package.json` of the project in the current work directory
   2. Take the directories of the `"files"` entry
   3. Search for `.d.ts` files in those directories (recursively)
   4. Patch each `.d.ts` adding a comment `// mixin-patch` at the beginning of each offending line
   5. Uses `/^(\s+)(\w+:\s*\([^;]*\) => [^;]*;\s*)$/mg` regex to detect offending lines

## caveats
   * **multiline  emitted member function are not patched**

## license
   * MIT

