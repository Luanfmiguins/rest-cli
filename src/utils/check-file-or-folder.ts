const fileExtensions = ["ts", "js"] as const;

type FileType = "folder" | "file" | "unknown";

const checkFileOrFolder = (fileName: string): FileType => {
  const split = fileName.split(".");

  if (split.length === 1) {
    return "folder";
  }

  const lastItem = split[split.length - 1];

  if (fileExtensions.includes(lastItem as typeof fileExtensions[number])) {
    return "file";
  }

  return "unknown";
};

export default checkFileOrFolder;
