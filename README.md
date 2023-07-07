# Varthak API Documentation 
## Base API URL 
- https://varthak.onrender.com/
## Local Development 
### Prerequisites - 
- Node.js (version 18.16.0)
### Installation 
1. Clone the repository:
    ``` 
    git clone <repository-url>
    ```
2. Install dependencies:
    ```
    cd varthak
    npm install
    ```
3. Set environment variables:
    - Create a `.env` file in the project root directory
    - Add the following environment variables and set their values:
        - ``` MONGO_URL=<your-mongodb-connection-string``` 
        - ```SECKEY=<your-secret-key> ```
4. Start the server:
    ```
    npm start
    ```
5. The server will be running locally at
    - http://localhost:8000
## API Endpoints
### Sign Up
- Method: POST
- URL: /signup
- Description: Create a new user account
- Request Body:
    - email (string): User's email address
    - password (string): User's password
    - roles (array): User roles (e.g., ["CREATOR", "VIEWER"])
### Log In
- Method: POST
- URL: /login
- Description: Authenticate user and generate JWT token
- Request Body:
    - email (string): User's email address
    - password (string): User's password
    - Response:
    - msg (string): Success message
    - token (string): JWT token
### Get Books
- Method: GET
- URL: /books
- Description: Get a list of books based on user role
- Query Parameters:
    - https://varthak.onrender.com/books?new=1
    - old (number, optional): Set to 1 to retrieve books created 10 minutes ago and older
    - new (number, optional): Set to 1 to retrieve books created less than 10 minutes ago
- Headers: - authorization (string): Bearer (JWT token)

    - ### Note:- if user role is  `VIEWER` then user can only see only created books by them  if  user role is  `VIEW_ALL` then user can see or access all books 

### Create Book
- Method: POST
- URL: /books
- Description: Create a new book
- Request Body:
    - title (string): Book title
    - author (string): Book author
- Headers:
    - authorization (string): Bearer (JWT token)
    - Content-Type: application/json
## Testing APIs
- You can use tools like Postman or ThunderClient to test the APIs. Set the appropriate HTTP method, URL, request body, and headers as mentioned in the API documentation above. 
