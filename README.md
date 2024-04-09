# `@core-cli`

`@core-cli` é uma ferramenta de linha de comando projetada para acelerar a criação de projetos de desenvolvimento web, facilitando a geração de estruturas de projeto tanto para backend quanto para frontend. Com esta ferramenta, desenvolvedores podem criar rapidamente modelos CRUD para aplicações backend, bem como várias páginas e estruturas para projetos frontend, incluindo suporte para temas claros e escuros.

## Instalação

Para instalar o `@core-cli` globalmente em seu sistema, execute o seguinte comando:

```
npm install -g https://github.com/luangustavofm/core-cli.git
```

Isso permitirá o acesso ao CLI de qualquer lugar no terminal.

## Uso

O `@core-cli` pode ser invocado através de diferentes aliases: `core`, `core-cli`, ou `cr`. A seguir, são apresentadas as opções disponíveis e como utilizá-las:

### Plataforma [--platform | -p]

Especifique a plataforma do seu projeto com a opção `--platform` (ou `-p`):

- `backend`, `back`, `b`: Seleciona a plataforma de backend.
- `frontend`, `front`, `f`: Seleciona a plataforma de frontend.

### Template [--create | -c]

A opção `--create` (ou `-c`) é obrigatória e especifica o tipo de template que você deseja criar. Os templates disponíveis são:

Para **backend**:
- `crud`: Gera um modelo CRUD completo, com funcionalidades para criar, atualizar, deletar, exportar para Excel, e paginação. As rotas também são configuradas automaticamente na API.

Para **frontend**:
- `page`: Cria uma página básica, seguindo a estrutura do projeto.
- `page-tool` (obsoleto): Gera um CRUD completo com paginação, baseado em versões anteriores.
- `page-v4-tool`: Implementação mais recente que inclui um layout aprimorado, suporte a CRUD completo, e seletor de tema (claro e escuro), baseado no novo modelo de trabalho.

### Diretório [--directory | -d]

Use `--directory` (ou `-d`) para definir um diretório alvo para a cópia do template. Se um nome não for especificado com `--name`, o último segmento do caminho será usado como nome base dos arquivos.

### Nome [--name | -n]

Com `--name` (ou `-n`), você pode definir um nome para a cópia do template. Se um diretório não for especificado, uma nova pasta com esse nome será criada no diretório atual para armazenar os arquivos.

### Exemplos

**Para criar um CRUD para backend com um nome específico:**

```
core -c crud -n brand
```

**Especificando um diretório para o template:**

```
cr --create crud -d src/core/category
```

**Configuração completa, especificando plataforma, template, diretório e nome:**

```
core-cli --platform backend --create crud --directory src/core --name product
```
