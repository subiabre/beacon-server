# Beacon
**Beacon** is a local-network, web based music player built using [Express.js](https://expressjs.com), [Socket.io](https://socket.io/) and [React](https://reactjs.org).

It allows you to sync and play your music across different devices inside the same network.

## Prerequisites
Before installing `beacon` in your machine, make sure you have installed [Node.js](https://nodejs.org/) >= 12.18.2.

## Installation
Clone this repository:
```console
$ git clone https://github.com/subiabre/beacon
$ cd beacon
```

Install the npm dependencies:
```console
$ npm install
```

## Configuration
Beacon uses environment variables for configuration.

**Usually, you can run beacon without configuring**.

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
![render1595433656771](https://user-images.githubusercontent.com/61125897/88199746-85556f80-cc45-11ea-98e2-488dbb3cf0ad.gif)

This command will ask you to enter the path to your music folder. This can be a relative path from the current folder or an absolute path.

You can run this command multiple times to add diferrent folders to the database.

Once it's finished building and updating the in-memory database with your local music, you can serve the app.

```console
$ npm start
```
![render1595434058238](https://user-images.githubusercontent.com/61125897/88200351-54296f00-cc46-11ea-92da-47ace4e717ab.gif)
