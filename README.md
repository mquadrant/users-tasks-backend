[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
 
# USER'S TASK APP

> User's Task App helps to manage user's task

> [Users Api](http://ec2-18-191-17-243.us-east-2.compute.amazonaws.com:5001/api).

> [Tasks Api](http://ec2-18-191-17-243.us-east-2.compute.amazonaws.com:5000/api).

## Architectural Diagram

 ![alt Achitural Diagram](architecture.png)

## Getting Started

### Installation

To install and run this project you would need to have the following installed:

- Node.js
- Docker
- Docker-compose [learn more](https://docs.docker.com/compose/install/)
- GIT

1. Clone this repository into your local machine:
```
e.g git clone https://github.com/mquadrant/users-tasks-repo.git
```
2. Build all the services:

```
sudo docker-compose build
```
3. Start all the services:

```
sudo docker-compose up
```
#### Production Containers
1. Build services image:
```
sudo docker-compose -f docker-compose.prod.yml build
```
2. Start services in background:
```
sudo docker-compose -f docker-compose.prod.yml up -d
```
## Built With
* ExpressJS
* NodeJS
* Docker
* Mongoose / MongoDb
* POSTMAN
* AWS EC2
* NGINX
* GIT

#### Frontend
* React
* Webpack

## API Documentation

### Base URL
```
http://ec2-18-191-17-243.us-east-2.compute.amazonaws.com/
```

> [API Doc](https://documenter.getpostman.com/view/8220979/TVt19QkS).

## Author
*  [Mark Benjamin](https://twitter.com/mquadrant)

## License
This project is licensed under the MIT license - see the LICENSE.md file for details.