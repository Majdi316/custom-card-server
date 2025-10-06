# 🪪 Custom Card Server

A full-featured **REST API** built using **Node.js**, **Express.js**, and **MongoDB (Mongoose)**.  
This application allows users to browse and manage customizable business cards with different access levels based on user roles.

---

## 👥 User Roles

This system supports four types of users:

1. 🧍 **Visitors**  
2. 👤 **Users without Business Accounts**  
3. 💼 **Users with Business Accounts**  
4. 🛡️ **Admins**

---

## ⚙️ Security & Rate Limiting

- ⏱️ Maximum **100 requests per 15 minutes** per IP address.  
- 🚫 If you enter the wrong password **3 times** with the same email, the account will be **blocked for 24 hours**.

---

## 🌐 Visitor Endpoints

| No | Endpoint | Method | Description |
|:--:|:----------|:--------|:-------------|
| 1 | `/users` | POST | Register a new user |
| 2 | `/users/login` | POST | Login to user account |
| 3 | `/cards` | GET | Retrieve all cards |
| 4 | `/cards/:id` | GET | Retrieve a card by ID |

### 📝 Example: Create an Account

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

## 👤 Users Without Business Accounts

Users without business accounts have access to all visitor endpoints plus additional functionality.

⚠️ All endpoints below require a valid x-auth-token in the request headers.

|  No | Endpoint          | Method | Description                    |
| :-: | :---------------- | :----- | :----------------------------- |
|  1  | `/users/:id`      | GET    | Get user information           |
|  2  | `/users/:id`      | PUT    | Update user information        |
|  3  | `/users/:id`      | PATCH  | Toggle business account status |
|  4  | `/users/:id`      | DELETE | Delete **own** account         |
|  5  | `/cards/my-cards` | GET    | Retrieve **own** cards         |
|  6  | `/cards/:id`      | PUT    | Update **own** card            |
|  7  | `/cards/:id`      | PATCH  | Toggle like on a card          |
|  8  | `/cards/:id`      | DELETE | Delete **own** card            |

### 📝 Example: Update a Card
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

### 📝 Example: Update User Information

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

## 💼 Users With Business Accounts

Users with **business accounts** have all the permissions of non-business users, **plus the ability to create new cards**.

> ⚠️ **Note:** All endpoints below require a valid `x-auth-token` in the request headers.

|  No | Endpoint | Method | Description       |
| :-: | :------- | :----- | :---------------- |
|  1  | `/cards` | POST   | Create a new card |

### 📝 Example: Create a New Card

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
## 🛡️ Admin Endpoints

Admins have full access to manage all users and cards.

  >⚠️ All endpoints below require a valid x-auth-token in the request headers.

| No | Url                           | method      | Action                      |
| :--| :---------------------------- | :---------- | :-------------------------- |
| 1  | `/users`                      | GET         | show all users info         |
| 2  | `/users/:id`                  | GET         | show **any** user info      |
| 3  | `/cards/:id`                  | DELETE      | delete **any** cards        |
| 4  | `/users/:id`                  | DELETE      | delete **any** account      |
| 5  | `/users/change-bizNumber/:id` | PATCH       | change bizNumber of cards   |
| 6  | `/users/attempt-users`        | GET         | show wrong attempts to login|

## 📝 Example: Failed Login Attempts

```  json
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
# 📚 Libraries Used

| Library                | Description                                                      |
| :--------------------- | :--------------------------------------------------------------- |
| **bcryptjs**           | Simplifies password hashing and salting.                         |
| **chalk**              | Adds color and style to console output.                          |
| **config**             | Manages environment-specific configuration settings.             |
| **cors**               | Enables secure cross-origin requests.                            |
| **crypto**             | Provides cryptographic utilities for secure data handling.       |
| **dotenv**             | Loads environment variables from a `.env` file.                  |
| **express**            | Fast, minimalist web framework for Node.js.                      |
| **joi**                | Schema-based validation library for request data.                |
| **jsonwebtoken**       | Implements JWT-based authentication.                             |
| **lodash**             | Utility library for working with arrays, objects, and functions. |
| **mongoose**           | ODM library for MongoDB, simplifying database interactions.      |
| **morgan**             | HTTP request logger middleware for Express.                      |
| **nodemon**            | Automatically restarts the server during development.            |
| **cross-env**          | Cross-platform environment variable configuration.               |
| **express-rate-limit** | Middleware for controlling request rate to prevent abuse.        |

## ⚙️ Installation & Setup

Follow these steps to install and run the server locally:

1. ### 📦 Clone the repository from GitHub.  
2. ### 💻 Open the project in VS Code.  
3. ### 📥 Install dependencies:
   ```bash 
   npm install
   ```
4. ### 🧾 Create a `.env` file in the root directory with the following variables:
     ```env
   PORT=your_port_number
   LOCAL_DB=your_local_mongodb_url
   ATLAS_DB=your_atlas_mongodb_url
   
    ```

5. ### ▶️ Run the server:

**Development mode (local DB):**
  ```bash
  npm run dev
  ```
**Production mode (Atlas DB):**
  ```bash
  npm start
  ```
6. ### 🧪 Generate dummy data:

**/users/dummyData** → Creates 3 sample users  with password Majdi@316 for all users
- `majdi@gmail.com` → Admin  
- `majdi2@gmail.com` → Business Account  
- `majdi3@gmail.com` → Regular Account

## 🧰 Tech Stack

- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT Authentication  
- Joi Validation  
- Rate Limiting  
- Environment Configuration  

---

## 👨‍💻 Author

**Majdi Hoseen**  
📧 [majdioa7sh@gmail.com](mailto:majdioa7sh@gmail.com)  
📍 Israel  

  >🏗️ Built with **Node.js**, **Express.js**, and **MongoDB** for scalable, secure, and production-ready REST API development.
