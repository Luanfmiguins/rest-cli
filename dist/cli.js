"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = cli;
const arg_1 = __importDefault(require("arg"));
const main_1 = require("./main");
const path_1 = __importDefault(require("path"));
var Platform;
(function (Platform) {
    Platform["Backend"] = "backend";
    Platform["Frontend"] = "frontend";
})(Platform || (Platform = {}));
var Template;
(function (Template) {
    Template["CrudV4"] = "crud-v4";
    Template["Page"] = "page";
    Template["SingleForms"] = "single-forms";
    Template["PageV4Tool"] = "page-v4-tool";
})(Template || (Template = {}));
function parseArgumentsIntoOptions(rawArgs) {
    const args = (0, arg_1.default)({
        '-p': String,
        '--platform': String,
        '-c': String,
        '--create': String,
        '-d': String,
        '--directory': String,
        '--name': String,
        '-n': String
    }, {
        argv: rawArgs,
    });
    const platforms = {
        backend: ['b', 'back', 'backend'],
        frontend: ['f', 'front', 'frontend']
    };
    const templates = {
        backend: [Template.CrudV4],
        frontend: [Template.Page, Template.SingleForms, Template.PageV4Tool]
    };
    let options = {};
    const setPlatform = (argValue) => {
        if (argValue) {
            for (const key in platforms) {
                if (platforms[key].includes(argValue)) {
                    options.platform = key;
                    return;
                }
            }
        }
    };
    const setTemplate = (argValue) => {
        if (argValue) {
            for (const key in templates) {
                if (templates[key].includes(argValue)) {
                    options.template = argValue;
                    if (!options.platform) {
                        options.platform = key;
                    }
                    return;
                }
            }
        }
    };
    setPlatform(args['--platform'] || args['-p']);
    setTemplate(args['--create'] || args['-c']);
    if (args['--directory'] || args['-d']) {
        if (args['--name'] || args['-n']) {
            options.name = args['--name'] || args['-n'];
            options.directory = `${args['--directory'] || ''}/${options.name}`;
        }
        else {
            const directorySplit = (args['--directory'] || '').split('/');
            options.name = directorySplit[directorySplit.length - 1];
            options.directory = args['--directory'] || '';
        }
    }
    else if (args['--name'] || args['-n']) {
        const directoryAndName = args['--name'] || '';
        options.name = directoryAndName;
        options.directory = directoryAndName;
    }
    if (options.platform && options.template && options.name) {
        return options;
    }
    else {
        console.error('Error: Missing required arguments. Use -help for support.');
        return undefined;
    }
}
async function promptForMissingOptions(options) {
    if (!options) {
        console.log('Error: Arguments are missing. Use -help for support.');
        return undefined;
    }
    return options;
}
async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    if (options) {
        const projectOptions = {
            ...options,
            root: path_1.default.resolve(process.cwd()),
            targetDirectory: path_1.default.resolve(path_1.default.resolve(process.cwd()), options.directory),
            copyDirectory: path_1.default.resolve(path_1.default.resolve(process.cwd()), `../templates/${options.platform}/${options.template}`),
        };
        await (0, main_1.createProject)(projectOptions);
    }
}
