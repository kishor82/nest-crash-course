## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Viewing Session IDs in Redis

During the implementation of session authentication using Redis in your Nest.js application, you may want to view the session IDs stored in the Redis store for debugging or analysis purposes. To achieve this, you can follow these steps:

1. **Connect to Redis CLI**: If you're using Docker Compose to run Redis, you can connect to the Redis CLI by running the following command:

   ```shell
   docker-compose run rcli
   ```

   This will open the Redis CLI, allowing you to interact with your Redis server.

2. **List Session IDs**: By default, connect-redis uses sess: as a session key prefix. To view the session IDs, you can run the following Redis command:
   ```shell
   KEYS sess:*
   ```
   This command lists all the keys in Redis that match the sess:_ pattern, where _ is a wildcard that matches any characters. These keys represent your session IDs.

Remember that using the KEYS command can be resource-intensive and may block other Redis operations. Use it for debugging or exploration purposes and consider using the SCAN command for more efficient key scanning, especially in production environments.
