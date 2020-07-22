# beacon-server
This package is the application that allows the local API used by [beacon](http://github.com/subiabre/beacon).

## Prerequisites
beacon-server needs **Node.js** >= 12.18.2.

## Installation
Clone this repository:
```console
$ git clone https://github.com/subiabre/beacon-server
$ cd beacon-server
```

Install the npm dependencies:
```console
$ npm install
```

## Configuration
beacon-server uses environment variables for configuration.

**Usually, you can run beacon-server without configuring**.

If you need to configure your local server, you have en example env file at `.env.example`.

Copy the example env to .env:
```console
$ cp .env.example .env
```

The resulting `.env` will now provide the configuration for the server. Use a text editor of your choice to edit the configuration variables.

## Usage
Currently, the API only works with local music.

Import music from local folder:
```console
$ npm run import-music
```

This command will ask you to enter the path to your music folder. This can be a relative path from the current folder or an absolute path.

You can run this command multiple times to add diferrent folders to the database.

Once it's finished building and updating the in-memory database with your local music, you can serve the app.

```console
$ npm start
```
