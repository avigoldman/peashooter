# Peashooter

A server to store simple logs bundled with a live dashboard.

I imagine the best use case is for developing IoT projects.

I made this for a friends project who needed an easy way to log output from his home-made 360 camera. (Yes it is as cool as it sounds - read about it on [his blog](http://dcc.umd.edu/portfolio/bbock)). 


## Heroku Deployment

You can deploy directly to heroku with the following button to get up and running immediately. <br>
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Manual Deployment

To deploy manually clone the repo, install the dependencies, and run the database migrations. In order to run locally you must configure your database connection in `knexfile.js`. In production set the database settings in `DATABASE_URL` env variable.

```
git clone https://github.com/aymg/peashooter.git
cd peashooter
npm install
./node_modules/.bin/knex migrate:latest
```

Lastly, start up the server and log things. To start the server locally run `npm start`. In production, run `npm run prod`.

## Configuration

Name | Description | Default | Required
---|---|---|---
`DATEBASE_URL` | The database connection configuration for production. |  | Yes (Heroku sets this automatically with the [Postgresql addon](https://elements.heroku.com/addons/heroku-postgresql))
`PEASHOOTER_TITLE` | The title for the logger. This shows up a in the title tag and top of the dashboard. | peashooter | No
`PEASHOOTER_USERNAME` | The username for basic auth. Set a username and password to enable basic auth. |  | No
`PEASHOOTER_PASSWORD` | The username for basic auth. Set a username and password to enable basic auth. |  | No
`PEASHOOTER_HIDE_INFO` | Whether or not to hide the about and sample code in the dashboard. If set to false, basic auth details are made visible on the protected dashboard. | `false` | No

## Usage

### The dashboard
The dashboard is located at the home page of the server. You can view the demo [here](https://peashooter.herokuapp.com). The dashboard uses [socket.io](https://socket.io) to automatically show all new updates.


### The API

#### `POST` `/log`
Adds a new entry in the log.

**Note:** `Content-Type` header must be `text/plain`.

Returns a JSON object with the `text`, `id`, and `created_at` timestamp.

```
{
  "id": 20,
  "text": "Your logged message.",
  "created_at":"2017-04-16T01:58:40.558Z"
}
```

#### `POST` `/clear`
Clears out all the log entries.

Returns a JSON object with the total number of lines cleared.

```
{
  "count": 5
}
```


#### `GET` `/list`
Retrieves the full list of log entries.

Returns an array of JSON objects.
```
[
  {
    "id": 20,
    "text": "Your message goes here",
    "created_at": "2017-04-16T01:58:40.558Z"
  },
  {
    "id": 21,
    "text": "Your message goes here",
    "created_at": "2017-04-16T02:07:42.334Z"
  }
]
```
