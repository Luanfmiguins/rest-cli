# `core-cli`

`core-cli` is a command-line tool designed to accelerate the creation of web development projects by simplifying the generation of project structures for both backend and frontend. This tool allows developers to quickly generate CRUD models for backend applications and create various pages and structures for frontend projects, including support for light and dark themes.

## Installation

To install `core-cli` globally on your system, run the following command:

```bash
npm install -g https://github.com/luangustavofm/core-cli.git
```

This command allows you to access `core-cli` from anywhere in your terminal.

## Usage

### Command Structure

`core-cli` can be invoked using the following aliases: `core`, `core-cli`, or `cr`. Below are the available options and how to use them:

### Options Overview

- **Platform [--platform | -p]**: Specify the target platform for your project. Accepted values include:
  - **Backend**: `backend`, `back`, `b`
  - **Frontend**: `frontend`, `front`, `f`
  
- **Template [--create | -c]**: This is a required option that specifies the type of template you want to create. Accepted values include:
  - For **backend**:
    - **`crud-v4`**: Generates a complete CRUD model with functionalities to create, update, delete, export to Excel, and pagination. Routes are automatically configured in the API.
  - For **frontend**:
    - **`page`**: Creates a basic page structure following the project conventions.
    - **`single-forms`**: Creates pages for managing single forms.
    - **`page-v4-tool`**: An enhanced implementation including a modern layout, full CRUD support, and a theme selector (light and dark).
    
- **Directory [--directory | -d]**: Specify the target directory for the template copy. If a `--name` is not provided, the last segment of the directory path will be used as the name.

- **Name [--name | -n]**: Define the name for the copied template. If no directory is specified, a new folder with this name will be created in the current working directory to store the files.

### Examples

1. **Creating a backend CRUD with a specific name**:

   ```bash
   core -c crud-v4 -n brand
   ```

2. **Specifying a directory for the template**:

   ```bash
   cr --create crud-v4 -d src/core/category
   ```

3. **Full configuration, specifying platform, template, directory, and name**:

   ```bash
   core-cli --platform backend --create crud-v4 --directory src/core --name product
   ```

## Command Details

- The `cli.js` script is responsible for parsing command-line arguments and mapping them to options. It validates provided values against a list of recognized platforms and templates and sets the directory and name accordingly.
- The `main.js` script handles the actual project generation by copying relevant templates and replacing placeholders in the template files with the values provided through the CLI options.
- The tool checks for the existence of required directories and gracefully handles missing arguments by displaying a helpful message.
  
## Customization & Templates

The `core-cli` tool allows for extensive customization through pre-defined templates. It looks for specific files in the templates directory and processes them by replacing placeholders such as `_namespace`, `_Name`, `_nameService`, `_nameController`, and more with the values provided during execution.

## Error Handling & Messages

- If a target directory already exists with the same name, `core-cli` will display an error and stop execution.
- When templates are successfully generated, the tool displays a list of created files along with success messages.
- The tool also checks for the existence of a “base” directory. If not found, an error message is shown.

## License

This project is licensed under the MIT License. For more details, refer to the `LICENSE` file in the project repository.