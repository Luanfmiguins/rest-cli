# `@rest/rest-generate`

🏗 CLI para projetos rest

## Installation

npm install -g https://github.com/Luanfmiguins/rest-cli.git

##  Usage

### rest-cli | rest | rt

#### [--platform | -p] PLATFORM

###### backend | back | b 
Seleciona uma plataforma de backend
###### frontend | front | f 
Seleciona uma plataforma de frontend
###### application | app | a
Seleciona uma plataforma de application

### --create | -c TEMPLATE
Obrigatório.
###### crud
Cria um template de CRUD para Backend

### [--directory | -d] DIRECTORY
Cria um diretorio alvo para a copia do template. Na ausencia de nome será usado como nome base dos arquivos.

### [--name | name] NAME
Cria um nome para a copia do template. Na ausência de diretório será criado uma pasta com o nome para conter os arquivos na raiz do comando.

### Exemplos
Com apenas nome

    rest -c crud -n brand
Com apenas diretorio

    rt --create crud -d src/core/category
Completo

    rest-cli --platform backend --create crud --directory src/core --name product