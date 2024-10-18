import chalk from 'chalk';
import fs from 'fs';
import Listr from 'listr';
import path from 'path';
import { promisify } from 'util';
import { capitalize } from './utils/captalize';
import { pluralize } from './utils/pluralize';

const access = promisify(fs.access);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const readDir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);
const stat = promisify(fs.stat);

let _baseDirectoryExists = false;

interface ProjectOptions {
  root: string;
  targetDirectory: string;
  copyDirectory: string;
  platform: string;
  template: string;
  name: string;
  directory: string;
}

type LogCallback = (logData: { title: string; name: string }) => void;

function getInstancePath(platform: string, type?: string): string {
  const dir = __dirname;
  return type
    ? path.resolve(dir, '../templates', platform, type)
    : path.resolve(dir, '../templates', platform);
}

async function checkRootExists(options: ProjectOptions): Promise<boolean> {
  try {
    await access(options.targetDirectory, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function copyTemplateFiles(options: ProjectOptions, logCallback: LogCallback): Promise<void> {
  const rootExists = await checkRootExists(options);
  if (!rootExists) {
    await mkdir(options.targetDirectory, { recursive: true });
  }

  const files = await readDir(options.copyDirectory);

  await Promise.all(
    files.map(async (file) => {
      const fullPath = path.resolve(options.copyDirectory, file);
      const targetDirectory = path.resolve(options.targetDirectory);
      let baseDirectory = await determineBaseDirectory(targetDirectory);

      const newCopyFileName = options.name.toLowerCase();
      const newTemplatesFunctionName = toCamelCase(newCopyFileName);
      const newTemplatesResourceName = toResourceName(newCopyFileName);

      const statResponse = await stat(fullPath);

      if (statResponse.isDirectory()) {
        const newOptions: ProjectOptions = {
          ...options,
          targetDirectory: path.resolve(options.targetDirectory, file),
          copyDirectory: fullPath,
        };
        await copyTemplateFiles(newOptions, logCallback);
      } else {
        await processAndCopyFile(fullPath, options, newCopyFileName, newTemplatesFunctionName, newTemplatesResourceName, baseDirectory, logCallback);
      }
    })
  );
}

function toCamelCase(str: string): string {
  return str
    .split(/-/g)
    .map((subName) => capitalize(subName))
    .join('');
}

function toResourceName(str: string): string {
  const [first, ...rest] = str.split(/-/g);
  return first + rest.map((subName) => capitalize(subName)).join('');
}

async function determineBaseDirectory(targetDirectory: string): Promise<string> {
  let searchInDirectory = path.resolve(targetDirectory);
  let baseSearched = false;
  let baseDirectory = "";

  while (!baseSearched) {
    const statResponse = await stat(searchInDirectory);

    if (!statResponse.isDirectory()) {
      searchInDirectory = path.resolve(searchInDirectory, "../");
      continue;
    }

    const filesInDirectory = await readDir(searchInDirectory);

    if (filesInDirectory.includes("base") && !filesInDirectory.includes(".baseignore")) {
      baseSearched = true;
      _baseDirectoryExists = true;
      baseDirectory += "../";
    } else {
      searchInDirectory = path.resolve(searchInDirectory, "../");
    }
  }

  return baseSearched ? baseDirectory.substring(0, baseDirectory.length - 3) + "base" : "base";
}

async function processAndCopyFile(
  fullPath: string,
  options: ProjectOptions,
  newCopyFileName: string,
  newTemplatesFunctionName: string,
  newTemplatesResourceName: string,
  baseDirectory: string,
  logCallback: LogCallback
): Promise<void> {
  const data = await readFile(fullPath, 'utf8');
  let newData = data
    .replace(/_namespace/g, newCopyFileName)
    .replace(/_Names/g, pluralize(newTemplatesFunctionName))
    .replace(/_names/g, pluralize(newTemplatesResourceName))
    .replace(/_Name/g, newTemplatesFunctionName)
    .replace(/_nameService/g, `${newTemplatesResourceName}Service`)
    .replace(/_nameValidator/g, `${newTemplatesResourceName}Validator`)
    .replace(/_nameController/g, `${newTemplatesResourceName}Controller`)
    .replace(/_nameCallMethod/g, `${newTemplatesResourceName}CallMethod`)
    .replace(/_namePath/g, newTemplatesResourceName)
    .replace(/_name/g, newCopyFileName)
    .replace(/_baseDirectory/g, baseDirectory);

  const targetPath = path.resolve(options.targetDirectory, fullPath.replace('_name', newCopyFileName));
  await writeFile(targetPath, newData);

  logCallback({ title: "file created!", name: fullPath.replace('_name', newCopyFileName) });
}

export async function createProject(options: ProjectOptions): Promise<boolean> {
  if (options.template.includes("@types/")) {
    options.copyDirectory = getInstancePath(options.template);
  } else {
    options.copyDirectory = getInstancePath(options.platform, options.template);
  }

  options.root = path.resolve(process.cwd());
  options.targetDirectory = path.resolve(options.root, options.directory);

  if (await checkRootExists(options)) {
    console.error(`%s Directory with the same name already exists: ${options.name.toLowerCase()}`, chalk.red.bold("ERROR"));
    return false;
  }

  try {
    await access(options.copyDirectory, fs.constants.R_OK);
  } catch {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  const tasks = new Listr(
    [
      {
        title: 'Generating templates',
        task: () => copyTemplateFiles(options, (logData) => console.log(`%s ${logData.title}`, chalk.bold(logData.name))),
      },
    ],
    {
      exitOnError: false,
    }
  );

  await tasks.run();

  if (!_baseDirectoryExists) {
    console.error("%s No 'base' directory found in your project.", chalk.red.bold("ERROR"));
  }

  console.log('%s Templates created successfully!', chalk.green.bold('COMPLETED'));
  return true;
}
