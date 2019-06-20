# population_management_system

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=popout-square&logo=typescript&logoColor=teal)

[![CircleCI](https://circleci.com/gh/chukwuemekachm/population_management_system.svg?style=svg)](https://circleci.com/gh/chukwuemekachm/population_management_system)

Population Management System contains a list of locations and the total number of residents in each location broken down by gender.

The system was built for my D1 ➣ D2 advancement and provides an API that enables you to:

- Create a new location containing data on the total number of male and female residents within it.
- List all available locations and their population summaries (total male residents, total female residents, sum total residents)
- Preview data for a specific locations
- Update data for a specific locations
- Delete a specified location

## Getting Started
To setup **population_management_system**, the following should be installed on your machine.

- [Node.js](https://nodejs.org/en/download/current/) 8 and above
- [Postgres](https://www.postgresql.org/)
- [Git](https://git-scm.com/downloads)

### Installation

If you have all the prerequisites you can use the steps below to setup **population_management_system** locally.

##### Clone visand
- Open your terminal and `cd` to the directory where you will like to download **population_management_system**, then run
```sh
git clone https://github.com/chukwuemekachm/population_management_system.git
```
- Change to the **population_management_system** directory
```sh
cd population_management_system
```

##### Setup database
This section assumes your local PostgreSQL installation has a `postgres` user without password
- Run the command below to create a database
```sh
npm install yarn -g
yarn create:db
```
- Run the command below to to populate the database
```sh
yarn migrate:db
```

##### Create and update the env variables
- Run the command below to create a `.env` file from the sample provided
```bash
touch .env
cp .env.sample .env
```
- Now update the environmental variables with the variables you want to use for your **population_management_system** installation.

##### Install Dependencies
- Run the command below to install `node` dependencies
```bash
yarn install
```

### Usage
- To start up your newly installed **population_management_system** run
```sh
yarn start
```

### Running Tests
- To run the automated tests on your newly installed **population_management_system** run
```sh
yarn test
```

## Built With
- [nest](https://nestjs.com/)
- [pg](https://node-postgres.com/)

## Author

* **Chima Chukwuemeka** [@chukwuemekachm](https://github.com/chukwuemekachm)


## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/chukwuemekachm/population_management_system/blob/develop/LICENSE) file for details
