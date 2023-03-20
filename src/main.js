import chalk from 'chalk';
import execa from 'execa';
import fs, { exists } from 'fs';
import gitignore from 'gitignore';
import Listr from 'listr';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import { capitalize } from '../utils/captalize';
import { pluralize } from '../utils/pluralize';

const access = promisify(fs.access);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const readDir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);
const fileExists = promisify(fs.exists);
const dirExists = promisify(fs.exists);
const stat = promisify(fs.stat);
let _baseDirectoryExists = false;

function getInstancePath(platform, type,) {

  const dir = __dirname;

  if (type) {
    return path.resolve(
      dir,
      '../templates',
      platform,
      type
    );
  } else {
    return path.resolve(
      dir,
      '../templates',
      platform
    );
  }

}

function scanTemplatesFiles() {

}


const checkRootExists = async (options) => {


  const root = await dirExists(options.targetDirectory);


  return root;
}

async function copyTemplateFiles(options, logCallback) {

  const root = await checkRootExists(options);

  if (!root) {
    await mkdir(options.targetDirectory, { recursive: true });
  }

  const files = await readDir(options.copyDirectory);

  await Promise.all(files.map(async (file) => {

    const fullPath = path.resolve(options.copyDirectory, file);
    const targetDirectory = path.resolve(options.targetDirectory);

    let searchInDirectory = path.resolve(new String(targetDirectory).toString());
    let baseSearched = false;
    let baseDirectory = "";

    while (!baseSearched) {

      const statResponse = await stat(path.resolve(searchInDirectory));

      let pathSplit = searchInDirectory.split(/[\\/]/)
      if (!pathSplit.length) {
        pathSplit = searchInDirectory.split("/")
      }

      if (pathSplit.length == 1 || pathSplit.length == 2 && pathSplit[1] == '') {

        break;
      }


      if (statResponse.isDirectory()) {
        const filesInDirectory = await readDir(searchInDirectory);

        if (filesInDirectory.includes("base") && !filesInDirectory.includes(".baseignore")) {
          baseSearched = true;
          if (!_baseDirectoryExists) {
            _baseDirectoryExists = true;
          }
        }


        // console.log("is directory:", searchInDirectory);
        baseDirectory += "../"

        if (!baseSearched) {
          // console.log("base not searched in:", searchInDirectory);
          searchInDirectory = path.resolve(searchInDirectory, "../");
          // console.log("up paste:", searchInDirectory);
        } else {
          break;
        }

      } else {
        // console.log("is not directory:", searchInDirectory);
        searchInDirectory = path.resolve(searchInDirectory, "../");
        // console.log("up paste:", searchInDirectory);
      }


    }

    if (baseSearched) {
      baseDirectory = baseDirectory.substring(0, baseDirectory.length - 3);

      baseDirectory += "base";
    } else {
      baseDirectory = "base"
    }

    // console.log("subDirectories:", baseDirectory, fullPath);

    const newCopyFileName = options.name.toLowerCase();

    const newTemplatesFunctionName = newCopyFileName.split(/-/g).map(subName => capitalize(subName)).join('');
    const newTemplatesResourceName = newCopyFileName.split(/-/g)[0] + newCopyFileName.split(/-/g).slice(1).map(subName => capitalize(subName)).join('');
    const newTemplatesFunctionNamePlural = pluralize(newTemplatesFunctionName);
    const newTemplatesResourceNamePlural = pluralize(newTemplatesResourceName);

    const statResponse = await stat(path.resolve(options.copyDirectory, file));

    if (statResponse.isDirectory()) {

      const newOptions = {
        root: options.root,
        targetDirectory: path.resolve(options.targetDirectory, file),
        copyDirectory: path.resolve(options.copyDirectory, file),
        name: options.name,
      }

      await copyTemplateFiles(newOptions, logCallback);

    } else {

      const data = await readFile(fullPath, 'utf8');

      let newData = data.replace(/_namespace/g, newCopyFileName);
      newData = newData.replace(/_Names/g, newTemplatesFunctionNamePlural);
      newData = newData.replace(/_names/g, newTemplatesResourceNamePlural);
      newData = newData.replace(/_Name/g, newTemplatesFunctionName);
      newData = newData.replace(/_nameService/g, newTemplatesResourceName + "Service")
      newData = newData.replace(/_nameValidator/g, newTemplatesResourceName + "Validator");
      newData = newData.replace(/_nameController/g, newTemplatesResourceName + "Controller");
      newData = newData.replace(/_nameCallMethod/g, newTemplatesResourceName + "CallMethod");
      newData = newData.replace(/_namePath/g, newTemplatesResourceName);
      newData = newData.replace(/_name/g, newCopyFileName);
      newData = newData.replace(/_baseDirectory/g, baseDirectory);

      let errorWrite = await writeFile(path.resolve(options.targetDirectory, file.replace('_name', newCopyFileName)), newData);

      if (!errorWrite) {
        logCallback({
          title: "file created!",
          name: file.replace('_name', newCopyFileName)
        })
        //return console.log('%s file created!', chalk.bold(file.replace('_name', newCopyFileName)));
      }

    }

  }))


}

export async function createProject(options) {

  options = {
    ...options,
  };


  if (options.template.includes("@types/")) {
    console.log(options.template);

    options.copyDirectory = getInstancePath(options.template);
  } else {
    options.copyDirectory = getInstancePath(options.platform, options.template);
  }
  options.root = path.resolve(process.cwd());
  options.targetDirectory = path.resolve(options.root, options.directory);

  console.log(getInstancePath(options.template));

  if ((await checkRootExists(options))) {
    console.error(`%s Um diretório com o mesmo nome já existe. ( ${options.name.toLowerCase()} )`, chalk.red.bold("ERROR"))
    return;
  }

  try {
    await access(options.copyDirectory, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  const dataCreated = []

  const tasks = new Listr(
    [
      {
        title: 'Gerando templates',
        task: () => copyTemplateFiles(options, (logData) => {
          dataCreated.push({
            title: logData.title,
            name: logData.name
          })
        }),
      }
    ],
    {
      exitOnError: false,
    }
  );

  await tasks.run();


  console.log('%s Templates criados com sucesso!', chalk.green.bold('CONCLUÍDO'));
  for (let log of dataCreated) {
    console.log(`%s ${log.title}`, chalk.bold(log.name))
  }

  if (!_baseDirectoryExists) {
    console.error("%s Não foi encontrado um diretório ( base ) em seu projeto.", chalk.red.bold("ERROR"))
  }

  return true;
}
