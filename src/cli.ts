import arg from 'arg';
import { createProject } from './main';
import path from 'path';

enum Platform {
  Backend = 'backend',
  Frontend = 'frontend'
}

enum Template {
  CrudV4 = 'crud-v4',
  Page = 'page',
  SingleForms = 'single-forms',
  PageV4Tool = 'page-v4-tool'
}

interface Options {
  platform: Platform;
  template: Template;
  directory: string;
  name: string;
}

interface ProjectOptions extends Options {
  root: string;
  targetDirectory: string;
  copyDirectory: string;
}

function parseArgumentsIntoOptions(rawArgs: string[]): Options | undefined {
  const args = arg(
    {
      '-p': String,
      '--platform': String,
      '-c': String,
      '--create': String,
      '-d': String,
      '--directory': String,
      '--name': String,
      '-n': String
    },
    {
      argv: rawArgs,
    }
  );

  const platforms = {
    backend: ['b', 'back', 'backend'],
    frontend: ['f', 'front', 'frontend']
  };

  const templates = {
    backend: [Template.CrudV4],
    frontend: [Template.Page, Template.SingleForms, Template.PageV4Tool]
  };

  let options: Partial<Options> = {};

  const setPlatform = (argValue: string | undefined) => {
    if (argValue) {
      for (const key in platforms) {
        if (platforms[key as keyof typeof platforms].includes(argValue)) {
          options.platform = key as Platform;
          return;
        }
      }
    }
  };

  const setTemplate = (argValue: string | undefined) => {
    if (argValue) {
      for (const key in templates) {
        if (templates[key as keyof typeof templates].includes(argValue as Template)) {
          options.template = argValue as Template;
          if (!options.platform) {
            options.platform = key as Platform;
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
    } else {
      const directorySplit = (args['--directory'] || '').split('/');
      options.name = directorySplit[directorySplit.length - 1];
      options.directory = args['--directory'] || '';
    }
  } else if (args['--name'] || args['-n']) {
    const directoryAndName = args['--name'] || '';
    options.name = directoryAndName;
    options.directory = directoryAndName;
  }

  if (options.platform && options.template && options.name) {
    return options as Options;
  } else {
    console.error('Error: Missing required arguments. Use -help for support.');
    return undefined;
  }
}

async function promptForMissingOptions(options: Options | undefined): Promise<Options | undefined> {
  if (!options) {
    console.log('Error: Arguments are missing. Use -help for support.');
    return undefined;
  }
  return options;
}

export async function cli(args: string[]): Promise<void> {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  if (options) {
    const projectOptions: ProjectOptions = {
      ...options,
      root: path.resolve(process.cwd()),
      targetDirectory: path.resolve(path.resolve(process.cwd()), options.directory),
      copyDirectory: path.resolve(path.resolve(process.cwd()), `../templates/${options.platform}/${options.template}`),
    };

    await createProject(projectOptions);
  }
}
