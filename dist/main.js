"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = createProject;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const listr_1 = __importDefault(require("listr"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const captalize_1 = require("./utils/captalize");
const pluralize_1 = require("./utils/pluralize");
const access = (0, util_1.promisify)(fs_1.default.access);
const writeFile = (0, util_1.promisify)(fs_1.default.writeFile);
const readFile = (0, util_1.promisify)(fs_1.default.readFile);
const readDir = (0, util_1.promisify)(fs_1.default.readdir);
const mkdir = (0, util_1.promisify)(fs_1.default.mkdir);
const stat = (0, util_1.promisify)(fs_1.default.stat);
let _baseDirectoryExists = false;
function getInstancePath(platform, type) {
    const dir = __dirname;
    return type
        ? path_1.default.resolve(dir, '../templates', platform, type)
        : path_1.default.resolve(dir, '../templates', platform);
}
async function checkRootExists(options) {
    try {
        await access(options.targetDirectory, fs_1.default.constants.F_OK);
        return true;
    }
    catch {
        return false;
    }
}
async function copyTemplateFiles(options, logCallback) {
    const rootExists = await checkRootExists(options);
    if (!rootExists) {
        await mkdir(options.targetDirectory, { recursive: true });
    }
    const files = await readDir(options.copyDirectory);
    await Promise.all(files.map(async (file) => {
        const fullPath = path_1.default.resolve(options.copyDirectory, file);
        const targetDirectory = path_1.default.resolve(options.targetDirectory);
        let baseDirectory = await determineBaseDirectory(targetDirectory);
        const newCopyFileName = options.name.toLowerCase();
        const newTemplatesFunctionName = toCamelCase(newCopyFileName);
        const newTemplatesResourceName = toResourceName(newCopyFileName);
        const statResponse = await stat(fullPath);
        if (statResponse.isDirectory()) {
            const newOptions = {
                ...options,
                targetDirectory: path_1.default.resolve(options.targetDirectory, file),
                copyDirectory: fullPath,
            };
            await copyTemplateFiles(newOptions, logCallback);
        }
        else {
            await processAndCopyFile(fullPath, options, newCopyFileName, newTemplatesFunctionName, newTemplatesResourceName, baseDirectory, logCallback);
        }
    }));
}
function toCamelCase(str) {
    return str
        .split(/-/g)
        .map((subName) => (0, captalize_1.capitalize)(subName))
        .join('');
}
function toResourceName(str) {
    const [first, ...rest] = str.split(/-/g);
    return first + rest.map((subName) => (0, captalize_1.capitalize)(subName)).join('');
}
async function determineBaseDirectory(targetDirectory) {
    let searchInDirectory = path_1.default.resolve(targetDirectory);
    let baseSearched = false;
    let baseDirectory = "";
    while (!baseSearched) {
        const statResponse = await stat(searchInDirectory);
        if (!statResponse.isDirectory()) {
            searchInDirectory = path_1.default.resolve(searchInDirectory, "../");
            continue;
        }
        const filesInDirectory = await readDir(searchInDirectory);
        if (filesInDirectory.includes("base") && !filesInDirectory.includes(".baseignore")) {
            baseSearched = true;
            _baseDirectoryExists = true;
            baseDirectory += "../";
        }
        else {
            searchInDirectory = path_1.default.resolve(searchInDirectory, "../");
        }
    }
    return baseSearched ? baseDirectory.substring(0, baseDirectory.length - 3) + "base" : "base";
}
async function processAndCopyFile(fullPath, options, newCopyFileName, newTemplatesFunctionName, newTemplatesResourceName, baseDirectory, logCallback) {
    const data = await readFile(fullPath, 'utf8');
    let newData = data
        .replace(/_namespace/g, newCopyFileName)
        .replace(/_Names/g, (0, pluralize_1.pluralize)(newTemplatesFunctionName))
        .replace(/_names/g, (0, pluralize_1.pluralize)(newTemplatesResourceName))
        .replace(/_Name/g, newTemplatesFunctionName)
        .replace(/_nameService/g, `${newTemplatesResourceName}Service`)
        .replace(/_nameValidator/g, `${newTemplatesResourceName}Validator`)
        .replace(/_nameController/g, `${newTemplatesResourceName}Controller`)
        .replace(/_nameCallMethod/g, `${newTemplatesResourceName}CallMethod`)
        .replace(/_namePath/g, newTemplatesResourceName)
        .replace(/_name/g, newCopyFileName)
        .replace(/_baseDirectory/g, baseDirectory);
    const targetPath = path_1.default.resolve(options.targetDirectory, fullPath.replace('_name', newCopyFileName));
    await writeFile(targetPath, newData);
    logCallback({ title: "file created!", name: fullPath.replace('_name', newCopyFileName) });
}
async function createProject(options) {
    if (options.template.includes("@types/")) {
        options.copyDirectory = getInstancePath(options.template);
    }
    else {
        options.copyDirectory = getInstancePath(options.platform, options.template);
    }
    options.root = path_1.default.resolve(process.cwd());
    options.targetDirectory = path_1.default.resolve(options.root, options.directory);
    if (await checkRootExists(options)) {
        console.error(`%s Directory with the same name already exists: ${options.name.toLowerCase()}`, chalk_1.default.red.bold("ERROR"));
        return false;
    }
    try {
        await access(options.copyDirectory, fs_1.default.constants.R_OK);
    }
    catch {
        console.error('%s Invalid template name', chalk_1.default.red.bold('ERROR'));
        process.exit(1);
    }
    const tasks = new listr_1.default([
        {
            title: 'Generating templates',
            task: () => copyTemplateFiles(options, (logData) => console.log(`%s ${logData.title}`, chalk_1.default.bold(logData.name))),
        },
    ], {
        exitOnError: false,
    });
    await tasks.run();
    if (!_baseDirectoryExists) {
        console.error("%s No 'base' directory found in your project.", chalk_1.default.red.bold("ERROR"));
    }
    console.log('%s Templates created successfully!', chalk_1.default.green.bold('COMPLETED'));
    return true;
}
