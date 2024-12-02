# Introduction

The backend API of a full-stack TypeScript rating web application using modern tools.

# Usage

[Install Devbox](https://www.jetify.com/docs/devbox/installing_devbox/). On
Windows, install WSL2 as a prerequisite as mentioned in the
[installation instructions](https://www.jetify.com/docs/devbox/installing_devbox/?install-method=wsl).

**(Windows only)** - Pull down the project's git repository into WSL file system
instead of windows mounted file system (so do **not** place in directory
prefixed with `/mnt`). This will ensure hot reload watch for file changes works
and Deno/Danet commands have fast performance. Suggested to put in something
like `~/github/rating-service/`.

**(first time only)** - run devbox postgres setup script:

```
devbox run setup-postgresql
```

Start the Devbox environment (in WSL shell for Windows):

```
devbox shell
```

Then start the project:

```
deno task launch-server
```

This will run the local dev server for the API.
