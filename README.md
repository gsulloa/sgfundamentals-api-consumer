# SGFundamentals API consumer
ReactJS application to test how [SGFundamentals](https://sgfundamentals.herokuapp.com/) expose a REST API.
## Development

**Requirements**
- Node.js 8.5
- Yarn

Clone this repository
```sh
git clone git@github.com:gsulloa/sgfundamentals-api-consumer.git
cd sgfundamentals-api-consumer
```

Install dependencies:
```sh
yarn
```

Make sure to set the next enviroment variables:
```txt
REACT_APP_API=https://localhost:3000/
```
Recommended use of [direnv](https://github.com/direnv/direnv)

Start the project at ```http://localhost:8080```
```sh
yarn start
```