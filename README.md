# Mission 5: TradeMe Website Remake

## Description
Mission 5 is a web application designed to remake the TradeMe website, addressing user concerns and ensuring compliance with the Fair Trading Act 1993. This prototype is based on feedback from UX research.

## Features

### Frontend
- React.js for dynamic user interface
- Navigation using `useNavigate`
- Data fetching with `useQuery`
- FontAwesome icons for visual enhancement

### Backend
- Node.js and Express
- CORS configuration
- MVC Architecture
- MongoDB database operations
- Environment variable management
- RESTful routing

### CLI Tool
- Python-based CLI for creating auction items
- MongoDB integration for data storage

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Avacia/Mission5.git
   cd Mission5
   ```
   

2. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the backend folder with necessary configurations.

4. Start the development servers:
   
   # Backend
   ```bash
   cd backend && npm run dev
   ```
   
   # Frontend
   ```bash
   cd frontend && npm start
   ```

6. Access the application at `http://localhost:3000`

## Environment Variables
Required in `.env` file:
- `DATABASE_URI`: MongoDB connection string
- `DATABASE_NAME`: MongoDB database name
- `COLLECTION_NAME`: MongoDB collection name

## CLI Usage

python create_auction_item.py --title "<item_title>" --description "<item_description>" --initial_price <initial_price> --reserve_price <reserve_price> --type "<item_type>"


## Project Structure
```bash
Mission5/
   ├── backend/
   │   ├── controllers/
   │   ├── routes/
   │   ├── db/
   │   ├── server.js
   │   └── .env
   └── frontend/
       ├── src/
       │   ├── components/
       │   ├── App.js
       │   └── index.js
       └── public/
```

## License
This project is licensed under the MIT License.

## Acknowledgements
- React, Express, MongoDB, FontAwesome, and Python for their respective libraries and frameworks.

---

*Note: This application is a prototype and may require further development.*
