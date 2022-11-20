const filesExtensios = ["ts", "js"];

const checkFileOrFolder = (fileName) => {

    const split = fileName.split(".");

    if (split.length == 1) {
        return "folder"
    }

    const lastItem = split[split.length - 1];

    if (filesExtensios.includes(lastItem)){
        return "file"
    }

    return "unknow";
}   

export default checkFileOrFolder;
