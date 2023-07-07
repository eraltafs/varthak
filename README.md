# Varthak API Documentation 
## Base API URL https://varthak.onrender.com/
## Local Development 
### Prerequisites - 
Node.js (version 18.16.0)
### Installation 
1. Clone the repository:
   git clone <repository-url>
2. Install dependencies:
   cd varthak
   npm install
3. Set environment variables:
    - Create a `.env` file in the project root directory
    - Add the following environment variables and set their values:
    - ``` MONGO_URL=<your-mongodb-connection-string SECKEY=<your-secret-key> ```
4. Start the server:
   npm start
5. The server will be running locally at http://localhost:8000
6. ## API Endpoints
7. ### Sign Up
8.      - Method: POST
9.      - URL: /signup
10.     - Description: Create a new user account
11.     - Request Body:
12.         - email (string): User's email address
13.         - password (string): User's password
14.         - roles (array): User roles (e.g., ["CREATOR", "VIEWER"])
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
             - old (number, optional): Set to 1 to retrieve books created 10 minutes ago and older
             - new (number, optional): Set to 1 to retrieve books created less than 10 minutes ago
        - Headers: - authentication (string): JWT token
    ### Create Book
        - Method: POST
        - URL: /books
        - Description: Create a new book
        - Request Body:
            - title (string): Book title
            - author (string): Book author
        - Headers:
            - authentication (string): JWT token
            - Content-Type: application/json
    ## Testing APIs
        You can use tools like Postman or ThunderClient to test the APIs. Set the appropriate HTTP method, URL, request body, and headers as mentioned in the API documentation above. 
