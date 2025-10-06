# Custom Card Server

in this application you can look at many Customization card, this app contain three types of people:

1. visitors
2. users with Business Account
3. users without Business Account
4. admins

## Visitors end points

| No | Url                 | method      | Action                 |
| :--| :------------------ | :---------- | :--------------------- |
| 1  | `/users`            | POST        | register user          |
| 2  | `/users/login`      | POST        | login user             |
| 3  | `/cards`            | GET         | get All Cards          |
| 4  | `/cards/:id`        | GET         | get card by id         |

>how to create account
```json
{
  "name": {
    "first": "majdi5",
    "middle": "",
    "last": "hoseen3"
  },
  "phone": "0512345567",
  "email": "majdi5@gmail.com",
  "password": "Majdi@316",
  "image": {
    "url": "",
    "alt": ""
  },
  "address": {
    "state": "IL",
    "country": "Israel",
    "city": "Arad",
    "street": "Shoham",
    "houseNumber": 5,
    "zip": 8920435
  }
  
}
```

## users without Business Account end points

can do same as visitor and :

| No | Url                 | method      | Action                 |
| :--| :------------------ | :---------- | :--------------------- |
| 1  | `/users/:id`        | GET         | user information       |
| 2  | `/users/:id`        | PUT         | update user info       |
| 3  | `/users/:id`        | PATCH       | update isBusiness      |
| 4  | `/users/:id`        | DELETE      | delete **his** account |
| 5  | `/cards/my-cards`   | GET         | get my cards           |
| 6  | `/cards/:id`        | PUT         | update **his** cards   |
| 7  | `/cards/:id`        | PATCH       | toggle Like            |
| 8  | `/cards/:id`        | DELETE      | delete **his** cards   |
>how to update card ?
```json
{
  "title": "card Updated",
  "subtitle": "a test value for this card",
  "description": "a test value for new card\na test value for new card\n",
  "phone": "012-3211234",
  "email": "qwe@gmail.com",
  "web": "www.bing.com",
  "image": {
    "url": "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
    "alt": "image of something"
  },
  "address": {
    "state": "IL",
    "country": "Israel",
    "city": "Arad",
    "street": "Shoham",
    "houseNumber": 5,
    "zip": 8920435
  }
}
```
>how to update user info ?
```json
{
  "name": {
    "first": "updated!!",
    "middle": "",
    "last": "hoseen"
  },
  "address":{
  "houseNumber":"7"}
  
}
```

## users with Business Account end points

can do same as users have not business account and :

| No | Url                 | method      | Action                 |
| :--| :------------------ | :---------- | :--------------------- |
| 1  | `/cards`            | POST        | create new card        |

>how to create new card ?

```json
{
  "title": "card 8 ",
  "subtitle": "a test value for this card",
  "description": "a test value for new card\na test value for new card\n",
  "phone": "012-3211234",
  "email": "qwe@gmail.com",
  "web": "www.bing.com",
  "image": {
    
    
  },
  "address": {
    "state": "IL",
    "country": "Israel",
    "city": "Arad",
    "street": "Shoham",
    "houseNumber": 5,
    "zip": 8920435
  }
}
```
## Admins end points

can do same as users have a business account and :

| No | Url                           | method      | Action                      |
| :--| :---------------------------- | :---------- | :-------------------------- |
| 1  | `/users`                      | GET         | show all users info         |
| 2  | `/users/:id`                  | GET         | show **any** user info      |
| 3  | `/cards/:id`                  | DELETE      | delete **any** cards        |
| 4  | `/users/:id`                  | DELETE      | delete **any** account      |
| 5  | `/users/change-bizNumber/:id` | PATCH       | change bizNumber of cards   |
| 6  | `/users/attempt-users`        | GET         | show wrong attempts to login|

>wrong attempts will show like that:

```json
[
    {
        "_id": "68d3266e9946fb60722ccc25",
        "email": "majdi3@gmail.com",
        "count": 3,
        "blockedUntil": "2025-09-24T23:00:07.404Z",
        "lastAttemptAt": "2025-09-23T23:00:07.404Z",
        "__v": 0
    },
    {
        "_id": "68d574322cd83ef72ef343d9",
        "email": "majdi2@gmail.com",
        "count": 1,
        "blockedUntil": null,
        "lastAttemptAt": "2025-09-25T16:56:18.190Z",
        "__v": 0
    }
]
```
# Libraries that Used in this Server (REST API'S)

- **bcryptjs** - The bcrypt.js library simplifies the implementation of salting and hashing in JavaScript applications.
- **chalk** - is a popular third-party module in Node.js used for styling terminal output with colors and other text formatting options. It enhances the readability and visual appeal of command-line interface (CLI) applications and console messages
- **config** - In Node.js, "config" refers to the management of application settings and parameters that can vary across different environments (e.g., development, staging, production). This allows for flexible and maintainable applications where sensitive data or environment-specific values are not hardcoded.
- **cors** - Cross-Origin Resource Sharing (CORS) in Node.js refers to the mechanism that allows a server to indicate which origins (domains, schemes, or ports) are permitted to access its resources. This is crucial when building APIs in Node.js that are consumed by client-side applications hosted on different origins, as browsers enforce a security measure called the "same-origin policy" that restricts cross-origin requests by default.
- **crypto** - The Node.js crypto module provides cryptographic functionality, essential for secure data handling within applications. This module wraps the OpenSSL library, offering access to various well-established and tested cryptographic algorithms
- **dotenv** - Dotenv is a zero-dependency Node.js module that loads environment variables from a .env file into process.env. It is widely used in Node.js applications to manage configuration settings and sensitive information such as API keys, database credentials, and server ports without hard-coding them directly into the application's source code.
- **express** - Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It simplifies the development of server-side applications by offering an easy-to-use API for routing, middleware, and HTTP utilitie
- **joi** - is a powerful and widely used schema description language and data validator for JavaScript, commonly integrated into Node.js applications. It allows developers to define and enforce rules for data structures in a declarative and readable way, ensuring data integrity and preventing unexpected issues caused by invalid or malicious input.
- **jsonwebtoken** - JSON Web Tokens (JWTs) in Node.js are a common and effective method for implementing secure authentication and authorization in web applications. The jsonwebtoken npm package is widely used for this purpose.
- **lodash** - is a popular JavaScript utility library that provides a wide range of helper functions to simplify common programming tasks in Node.js applications. It offers a comprehensive collection of tools for working with arrays, objects, strings, numbers, and functions, aiming to make JavaScript development more efficient and concise
- **mongoose** - Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a schema-based solution to model your application data, simplifying interactions with a MongoDB database from your Node.js application
- **morgan** - Morgan is a popular HTTP request logger middleware for Node.js, particularly useful in applications built with frameworks like Express.js. It simplifies the process of logging details about incoming HTTP requests to your server.
- **nodemon** -  is a utility tool designed to enhance the development experience of Node.js applications. It functions as a wrapper around the standard node command and automatically restarts your Node.js application whenever it detects changes in your project's source files.
- **cross-env** - is an npm package designed to provide a cross-platform solution for setting environment variables in Node.js projects. It addresses the inconsistencies in how environment variables are set across different operating systems (e.g., Windows, macOS, Linux)
- **express-rate-limit** - package is a popular npm library used to implement rate limiting in Node.js applications built with Express.js. It acts as a middleware, allowing developers to control the number of requests a user (typically identified by IP address) can make within a specific timeframe before receiving a "429 Too Many Requests" error.

# how to install and run the server

1. install the folder from github
2. open the folder in VS code
3. run `npm i` in terminal
4. create `.env` file
5. create 3 parameter in `.env` as:
 ```json
PORT=your port number
LOCAL_DB=your local mongodb URL 
ATLAS_DB=your atlas mongodb URL 
 ```
6. run `npm run dev` to production module (local DB)
7. or run `npm start` to development module (atlas DB)
8. use `/users/dummyData` this end point to create 3 dummy users
    - Email:majdi@gmail.com  Password:Majdi@316 Admin
    - Email:majdi2@gmail.com  Password:Majdi@316 Business account
    - Email:majdi3@gmail.com  Password:Majdi@316 not Business account
9. use `/cards/dummyCard` this end point to create 3 dummy cards