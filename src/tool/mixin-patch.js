"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs-extra");
var Path = require("path");
function patchCode(code) {
    return code.replace(/^(\s+)([A-Za-z0-9_ö]+:\s*\([^;]*\) => [^;]*;\s*)$/mg, function (_all, margin, rest) {
        return margin + '// mixin-patch: ' + rest;
    });
}
exports.patchCode = patchCode;
function patchPath(path) {
    return __awaiter(this, void 0, void 0, function () {
        var stats, dir, code;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.stat(path)];
                case 1:
                    stats = _a.sent();
                    if (!stats.isDirectory()) return [3 /*break*/, 4];
                    return [4 /*yield*/, fs.readdir(path)];
                case 2:
                    dir = _a.sent();
                    return [4 /*yield*/, Promise.all(dir.map(function (pathFileOrDir) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, patchPath(Path.join(path, pathFileOrDir))];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        }))];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 4:
                    if (!stats.isFile()) return [3 /*break*/, 7];
                    if (!path.endsWith('.d.ts')) return [3 /*break*/, 7];
                    return [4 /*yield*/, fs.readFile(path, 'utf8')];
                case 5:
                    code = _a.sent();
                    return [4 /*yield*/, fs.writeFile(path, patchCode(code))];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.patchPath = patchPath;
function patchProject(path) {
    return __awaiter(this, void 0, void 0, function () {
        var packageJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.readJSON(Path.join(path, 'package.json'))];
                case 1:
                    packageJson = _a.sent();
                    if (!Array.isArray(packageJson.files)) return [3 /*break*/, 3];
                    return [4 /*yield*/, Promise.all(packageJson.files.map(function (element) {
                            return __awaiter(this, void 0, void 0, function () {
                                var dirname;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            dirname = element.replace(/\/\*\*.*$/g, '');
                                            return [4 /*yield*/, patchPath(Path.join(path, dirname))];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        }))];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.patchProject = patchProject;
/* istanbul ignore if */
if (require.main === module) {
    patchProject(process.cwd());
}
