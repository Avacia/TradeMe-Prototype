# Mission 5: TradeMe Website Remake

## Description
Mission 5 is a web application designed to remake the TradeMe website. This project is a response to the feedback collected from interviews and surveys conducted by a UX designer, aiming to address various user concerns and ensure compliance with the Fair Trading Act 1993. Please note that the application is currently a prototype and is not yet well-designed.

## Features

### Frontend
- **Built with React.js**: Utilizes React for a dynamic user interface.
- **Navigation**: Implements `useNavigate` to facilitate seamless page transitions.
- **Data Fetching**: Uses `useQuery` to fetch data from the backend.
- **Icons**: Frequently employs `FontAwesomeIcon` for enhancing visual aesthetics.

### Backend
- **Node.js and Express**: The backend is built using Node.js, with Express serving as the web framework.
- **CORS**: Configured to handle cross-origin resource sharing.
- **MVC Architecture**: Implements a basic MVC structure with Controllers and Routes. Middleware functions are consolidated within the `server.js` file.
- **Database Operations**: The Controller handles sending and fetching data from a MongoDB database.
- **Environment Variables**: Sensitive information such as the MongoDB connection string and collection names are stored in a `.env` file.
- **Routing**: Routes direct requests based on the HTTP method (GET or POST). The POST method checks for existing bids and overrides previous bids if necessary.

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Avacia/Mission5.git
   cd Mission5
   ```

2. **Install dependencies:**
   - For **Backend**:
   ```bash
   cd backend
   npm install
   ```
   - For **Frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the backend folder containing your MongoDB connection string and any other sensitive configurations.

4. **Start the development server:**
   - **Backend**:
   ```bash
   npm run dev
   ```
   - **Frontend**:
   ```bash
   cd ../frontend
   npm start
   ```

5. **Open the application:**
   Visit `http://localhost:3000` to access the TradeMe interface.

## Application Structure

The application is structured as follows:

```
Mission5/
├── backend/
│   ├── controllers/             # Handles API requests and responses
│   ├── routes/                  # Defines API routes
│   ├── db/                      # MongoDB models for data schema
│   ├── server.js                # Main server setup file
│   └── .env                     # Environment variables
│
└── frontend/
    ├── src/
    │   ├── components/          # React components
    │   ├── App.js               # Main application file
    │   └── index.js             # Entry point for React application
    └── public/                  # Public assets
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - NoSQL database program
- [FontAwesome](https://fontawesome.com/) - Icon library for web applications
- Mission Ready HQ - For the UX design support and feedback

---

*Note: This application is a prototype and may require further development to meet the desired user experience and design standards.*
