"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skipContent = exports.srOnly = void 0;
var _utilities_1 = require("@utilities");
exports.srOnly = _utilities_1.create.jssObject({
    className: 'sr-only',
    clip: 'rect(0,0,0,0)',
    borderWidth: '0px',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
});
exports.skipContent = _utilities_1.create.jssObject({
    className: 'umd-skip-content',
    clip: 'rect(0,0,0,0)',
    borderWidth: '0px',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
});
