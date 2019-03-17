# mixin-patch
Patch the mixin problem #28799

## main goal
Patch the problem described in: https://github.com/Microsoft/TypeScript/issues/28799

## usage
  * include in `package.json->devDependencies`
  * add `& node /node_modules/dist/tool/mixin-patch` at the end of the `"build"` script

