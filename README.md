# Introduction

The backend API of a full-stack TypeScript rating web application using modern
tools.

- [Deno](https://deno.com/) - Successor to Node.js with built-in support for
  TypeScript.
- [Danet](https://danet.land/) - [Nest](https://docs.nestjs.com/) inspired
  backend framework for Deno.
- [Devbox](https://www.jetify.com/devbox) - Ergonomic tool over
  [Nix](https://nixos.org/) to enable easily creating portable, isolated
  development environments.
- [Liquibase](https://www.liquibase.com/) - Database versioning and migration
  tool.

# Usage

[Install Devbox](https://www.jetify.com/docs/devbox/installing_devbox/). On
Windows, install WSL2 as a prerequisite as mentioned in the
[installation instructions](https://www.jetify.com/docs/devbox/installing_devbox/?install-method=wsl).

**(Windows only)** - Pull down the project's git repository into WSL file system
instead of windows mounted file system (so do **not** place in directory
prefixed with `/mnt`). This will ensure hot reload watch for file changes works
and Deno/Danet commands have fast performance. Suggested to put in something
like `~/github/rating-service/`. To edit files, Visual Studio Code can be
installed on Windows side and then open it in wsl in the current directory with:

```
code .
```

**(first time only)** - run devbox postgres setup script:

```bash
devbox run setup-postgresql
```

Start the Devbox environment (in WSL shell for Windows):

```bash
devbox shell
```

If postgres is not running, start it with:

```bash
devbox services start postgresql
```

Setup postgres database schema using liquibase:

```bash
liquibase update --url $RATING_SERVICE_DB_URL --changelog-file ./changelog/changelog-root.yaml
```

Then start the project:

```bash
deno task launch-server
```

This will run the local dev server for the API.
