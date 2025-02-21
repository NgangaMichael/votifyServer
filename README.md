# GraphQL API with Express and Apollo Server

## 📌 Description
This project is a simple GraphQL API built using **Express.js** and **Apollo Server**. It connects to a MongoDB database and defines a user schema with corresponding resolvers.

## 🚀 Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the project root and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Start the server:**
   ```sh
   npm start
   ```
   Or for development mode with hot reloading:
   ```sh
   npm run dev
   ```

## 📡 API Endpoint
The GraphQL server will be available at:
```
http://localhost:5000/graphql
```

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **GraphQL Server:** Apollo Server
- **Database:** MongoDB

## 🏗 Project Structure
```
/project-root
│── config/
│   ├── db.js        # Database connection file
│── graphql/
│   ├── userTypeDefs.js   # GraphQL type definitions
│── resolvers/
│   ├── userResolver.js   # GraphQL resolvers
│── .env            # Environment variables
│── index.js        # Main server file
│── package.json    # Dependencies
```

## 👤 Author
- **Name:** Michael Nganga Njoroge  
- **LinkedIn:** [Your Profile](https://www.linkedin.com/in/michael-ng-ang-a-049b92187/)  

## 📜 License
This project is licensed under the MIT License.
