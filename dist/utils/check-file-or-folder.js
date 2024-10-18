"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileExtensions = ["ts", "js"];
const checkFileOrFolder = (fileName) => {
    const split = fileName.split(".");
    if (split.length === 1) {
        return "folder";
    }
    const lastItem = split[split.length - 1];
    if (fileExtensions.includes(lastItem)) {
        return "file";
    }
    return "unknown";
};
exports.default = checkFileOrFolder;
