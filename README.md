# DAI Smart Contract Cron Service and Rest API

#### This is a TypeScript NX monorepo for two services:
- A node cron job service that fetches and stores latest DAI transactions every 15 secs in a PostgreSQL database. It also stores DAI balances in the database for addresses found in the to or from values of each transaction.
- A Nest.js REST API that is rate-limited with Redis and protected through the use of api-keys. It returns DAI transaction data, and each API request is also logged and stored in the PostgreSQL database. It also returns relevant data regarding api-keys and their usage.
  - Both services use Alchemy as the Ethereum client provider.
#### Installation:
- Yarn is used as the package manager. It can be installed with `npm i -g yarn`
- `yarn install` to install the dependencies.
- Running this project locally requires [Docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/) for the local PostgreSQL database and Redis service.
#### Running the project locally:
- A `.env` file is required in the root directory of this repository. You can view an example [here](./.env.example).
- To start the local PostgreSQL database and Redis service run `yarn docker-compose:up`.
  - To stop these instances you can run `yarn docker-compose:down`.
- After PostgreSQL and Redis instances are running, run `yarn knex:migrate:latest` to set up the database tables/schema.
  - Other useful commands:
    - `yarn knex:migrate:rollback` to undo database migrations.
    - `yarn knex:reseed` to rollback, migrate, and seed the database with test data.
    - `yarn knex:reset` to rollback and migrate the db, clearing all data.
- The cron service can be started with `yarn cron`.
- The rest API can be started with `yarn api`.
#### Running tests
- `yarn docker-compose:up` to start both PostgreSQL and Redis instances.
- `yarn test:cron` to run the cron service tests.
- `yarn test:api` to run the API tests.
#### Scripts
[For fun I wrote a script](./apps/api/scripts/find-block-by-date.ts) that finds the starting block number you need based on a specified date.
It can be ran with:

`nx run api:find-block-by-date --date=08-30-2022 --decrement=5000`

`--decrement` is the starting value to decrement blocks while checking each timestamp. It uses a divide and conquer method to quickly find the block number you're looking for. Increasing this value will help find block numbers faster if the required date is much farther into the past.

## Main Technologies used:
- [TypeScript](https://www.typescriptlang.org/) I love using TypeScript over JavaScript to help build more scalable projects and help the ease of development and reduce bugs.
- [NX](https://github.com/nrwl/nx) for monorepo management. I love using NX because it provides a lot of helpful tooling for testing/deploying, it helps keep a clean workspace, and allows easily sharing dependencies, types, and other resources between different applications in the same repository.
- [Nest.js](https://github.com/nestjs/nest) for the rest API. This is my favorite TypeScript Node.js server side framework. It's an opinionated framework but I find it great for building efficient and scalable applications.
- [Docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/) Used for local PostgreSQL/Redis services.
- [lodash/fp](https://github.com/lodash/lodash/wiki/FP-Guide) I know ES6+ has a lot of utilities lodash provides and I used to think lodash was outdated, but I've become a big fan of the functional programming paradigm, which lodash/fp is mainly used for. I find it provides the benefit of null/undefined safety, immutability, and a data last approach for currying and other cool functional programming utilities.
- [knex.js](https://knexjs.org/) SQL query builder I have a lot of experience using. I used this mainly for database migrations, but it's also useful for raw db queries.
- [Objection.js](https://vincit.github.io/objection.js/) An ORM built on knex.js. It provides the best of both worlds being able to define models/relations for database entities, provides a lot of easy methods to interact with the db such as using transactions, but also allows using knex as well.
- [PostgreSQL](https://www.postgresql.org/) SQL database to persist data.
- [Alchemy](https://docs.alchemy.com/) Ethereum client provider
- [Ethers.js](https://docs.ethers.io/v5/) Great library for interacting with the Ethereum blockchain
- [Class Validator](https://github.com/typestack/class-validator) and [Class Transformer](https://github.com/typestack/class-transformer) Easily helps validate requests sent to the backend and help prevent SQL injection.
- [dayjs](https://day.js.org/) Allows easy manipulation of dates/times
- [node-cron](https://github.com/node-cron/node-cron) Task scheduler for the cron service to fetch DAI transactions
- [Jest](https://jestjs.io/) Unit and E2E tests (Cron tests can be found [here](./apps/cron/test), and API tests can be found [here](./apps/api/test))

## Cron Service
I chose to make this a separate service so the rest API could scale independently since this service should only need one instance. If the database has no DAI transactions, it will start fetching transactions using the `STARTING_BLOCK_NUMBER` environment variable for the starting block for storing transactions.
I used the DAI smart contract's `balanceOf` function to update balances for each to and from value of the transactions fetched. The service will only start storing DAI balances once the start block is within a smaller distance from the current latest block due to getting balances of a large array of addresses can be quite slow/error prone from my experience.
Once the fromBlock gets much closer to the latest block, the size of addresses and time of getting balances becomes much faster. The cron service will continue to add transactions and update balances. In the rest api, if a balance is not in the database, it will fetch its balance using the DAI contract and store it in the database for future use.
## Rest API
The rest API requires an API key to use all the endpoints regarding DAI transactions. API keys are sent in the request headers as `api-key`. Each API key is rate limited using Redis. I chose Redis for this so if the API scaled horizontally, the number of requests per timeframe would be shared across all instances. The default TTL is 60, and the limit per TTL is 5, but these can be changed with environment variables.
Each endpoint that requires query parameters uses validation, which helps for SQL injection for the raw query endpoint examples.
#### API Endpoints
##### DAI
- `/api/dai/transactions`: Fetches latest DAI transactions from DB
  - query params:
    - timestamp: optional - used for pagination since data is constantly being injested into the DB. Each response returns the list of dai transactions, along with the earliest timestamp so you can fetch another page of transactions before the results in the response.
    - limit: optional - default is 100, used to specifiy number of transactions in response
- `/api/dai/transactions/:address`: Fetches latest DAI transactions from DB where from or to values is the specified address 
  - query params:
    - timestamp: optional - used for pagination since data is constantly being injested into the DB. Each response returns the list of dai transactions, along with the earliest timestamp so you can fetch another page of transactions before the results in the response.
    - limit: optional - default is 100, used to specifiy number of transactions in response
- `/api/dai/balance/:address` - gets DAI balance of address from database, if DAI address balance is not in the database it will fetch it from the DAI contract and store it, then return the balance
##### API Keys/Request Logs
- `/api/api-keys/new` - creates a new API key in the database and returns it (just made it easy for this project)
### RAW SQL QUERY ENDPOINTS
- `/api/api-keys/requests/average` - gets average number of requests for a specific timeframe
  - params:
    - to: starting timestamp for range of query
    - from: ending timestamp for range of query
```typescript
async averageNumberOfRequests({ from, to }: AverageRequestsQueryDto) {
    const result = await this.knex.raw(
      `select avg(count) as average_num_requests 
       from(select api_key, count (api_key) as count
       from api_request_logs where api_request_logs.timestamp
       between '${from}' and '${to}'
       group by api_key) sub;`
    );
    return _.first(_.get('rows', result));
  }
```
- `/api/api-keys/requests/sum` - gets sum of all requests for a specific timeframe
  - params:
    - to: starting timestamp for range of query
    - from: ending timestamp for range of query
```typescript
async sumOfRequests({ from, to }: SumRequestsQueryDto) {
    const result = await this.knex.raw(
      `select count(id) as sum from api_request_logs
        where api_request_logs.timestamp
        between '${from}' and '${to}';`
    );
    return _.first(_.get('rows', result));
  }
```
- `/api/api-keys/requests/:api_key/highest-3-hours` - returns 3 hour time period for specific api key, when usage is the highest
```typescript
async getHighest3HourApiKeyUsage(api_key: string): Promise<{
    api_key: string;
    date: string;
    time_period: string;
    requests: string;
  }> {
    const found = await this.apiKeyModel.query().findById(api_key);
    if (!found) {
      throw new NotFoundException(`API KEY ${api_key} not found.`);
    }
    const result = await this.knex.raw(
      `select
         sub.api_key,
        start::date as date,
        to_char(start::timestamp, 'HH12:MI:SS PM') || 
        ' - ' || 
        to_char(start::timestamp + interval '3 hours', 'HH12:MI:SS PM') as time_period,
        sub.requests
        FROM (
              select
              arl.api_key,
              date_trunc('hour', arl.timestamp) as start,
              COUNT(DISTINCT arl.id) as requests
              FROM api_request_logs as arl
              where arl.api_key = '${api_key}'
              GROUP BY 1, 2
              order by 3 desc
              limit 1
        ) sub`
    );
    return _.first(_.get('rows', result));
  }
```
- `/api/api-keys/most-used` - returns most used api key with number of requests
```typescript
async getMostUsedApiKey(): Promise<{ api_key: string; requests: string }> {
    const result = await this.knex.raw(
      `select api_key, count(api_key) as requests from api_request_logs
         group by api_key order by requests desc limit 1;`
    );
    return _.first(_.get('rows', result));
  }
```
