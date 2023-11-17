Varthak- Library App Assignment 

## Tech Stack

- **Node.js**: A JavaScript runtime for server-side development.
- **Typescript**: Programming language.
- **Express.js**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing data.
- **JWT**: JSON Web Tokens for authentication.
- **Other Dependencies**: Various Node.js libraries and modules.
- https://drive.google.com/file/d/1NcFkJI7s3j6n6YGIGtX-9KlbAWx2yVRi/view?usp=share_link
- https://cute-jade-hen.cyclic.app




## Getting Started

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/utdsi/Varthak
   
2. Navigate to the project directory:
   ```
   cd Varthak_Library_App
   npm init -y
   ```
   
3. Install dependencies:
   ```
   npm install 
   ```

4. Application Start
   ```
   npm start
   ```


## Usage
### Authentication
To use protected routes, you must authenticate by obtaining a JWT token. Use the /auth/login route to log in and get the token.


## Routes
### User Routes
```
User Registration: POST /auth/signup
User Login: POST /auth/login
```
### Book Routes
```
Create a Book: POST /books
Read a Book: GET /books
Read all Existing Books: GET /books/all
```
