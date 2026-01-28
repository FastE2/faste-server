"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomFilename = void 0;
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const generateRandomFilename = (filename) => {
    const ext = path_1.default.extname(filename);
    return `${(0, uuid_1.v4)()}${ext}`;
};
exports.generateRandomFilename = generateRandomFilename;
//# sourceMappingURL=random-file-name.helper.js.map