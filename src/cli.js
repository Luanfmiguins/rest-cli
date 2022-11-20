import arg from 'arg';
import { createProject } from './main';

function parseArgumentsIntoOptions(rawArgs) {

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
    frontend: ['f', 'front', 'frontend'],
    customSearchTypes: ['any'],
    app: ['a', 'app']
  }

  const templates = {
    backend: ['crud'],
    frontend: ['page', 'page-tool', 'page-report'],
    customSearchTypes: ['@types/custom-search'],
    app: ['app-database-crud', 'app-database-schema']
  }

  let options = {
    platform: '',
    template: '',
    directory: '',
    name: '',
  }

  if (args['--platform'] || args['-p']) {
    for (let key in platforms) {
      if (platforms[key].includes(args['--platform'] || args['-p'])) {
        options.platform = key;
      }
    }
  }

  if (args['--create'] || args['-c']) {
    for (let key in templates) {
      if (templates[key].includes(args['--create'] || args['-c'])) {
        if (options.platform == '') {
          options.platform = key;
        }
        options.template = args['--create'] || args['-c'];
      }
    }
  }

  if (args['--directory'] || args['-d']) {
    if (args['--name'] || args['-n']) {
      options.name = args['--name'] || args['-n'];
      options.directory = (args['--directory'] || args['-d']) + '/' + options.name;
    } else {
      let directorySplit = (args['--directory'] || args['-d']).split('/');
      let name = directorySplit[directorySplit.length - 1];
      options.name = name;
      options.directory = args['--directory'] || args['-d'];
    }
  } else {
    if (args['--name'] || args['-n']) {
      let directoryAndName = args['--name'] || args['-n'];
      options.name = directoryAndName;
      options.directory = directoryAndName;
    }
  }



  if (options.platform != '' && options.template != '' && options.name != '') {
    return options;
  } else {
    return undefined;
  }
}

async function promptForMissingOptions(options) {

  if (!options) {
    console.log("Missing arguments please type --help for support");
  }
  return options;
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  // console.log(options);
  if (options) {
    await createProject(options);
  }
}

// ...
