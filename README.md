# rigor-checker

[Ghostscript](https://www.ghostscript.com/) must be installed to run the backend with PDF support.

Before running the backend, set GHOSTSCRIPT_PATH to be the path to the ghostscript executable. E.g., `/home/keane/gs`.

If you are serving the frontend locally, you will need to change the backend's `Access-Control-Allow-Origin` header to be `localhost` or `127.0.0.1`.

The frontend uses BACKEND_URL for its API requests. If that environment variable is not set, `localhost:5000` is used by default.
