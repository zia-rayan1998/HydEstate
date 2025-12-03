# Real Estate Web App - Flask Backend Structure Guide

This guide shows you exactly how to organize your Flask backend to work with the frontend React/Next.js app.

## 📁 Complete Directory Structure

\`\`\`
flask-real-estate-backend/
├── requirements.txt
├── .env
├── .env.example
├── config.py
├── run.py
│
├── app/
│   ├── __init__.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── property.py
│   │   └── listing.py
│   │
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── properties.py
│   │   ├── listings.py
│   │   ├── predictions.py
│   │   └── map.py
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   ├── jwt_service.py
│   │   ├── property_service.py
│   │   └── prediction_service.py
│   │
│   ├── ml/
│   │   ├── __init__.py
│   │   ├── price_predictor.py
│   │   └── models/
│   │       ├── trained_model.pkl
│   │       └── scaler.pkl
│   │
│   └── utils/
│       ├── __init__.py
│       ├── decorators.py
│       └── validators.py
│
├── data/
│   ├── csv_files/
│   │   ├── properties.csv
│   │   ├── listings.csv
│   │   ├── training_data.csv
│   │   └── README.md
│   │
│   └── database/
│       └── init_db.sql
│
└── migrations/
    └── versions/

\`\`\`

---

## 📊 CSV Files Location & Format

### Location: `data/csv_files/`

### 1. **properties.csv** - Property Master Data
\`\`\`csv
property_id,address,city,state,zip_code,latitude,longitude,sqft,bedrooms,bathrooms,year_built,property_type
1,123 Oak St,San Francisco,CA,94102,37.7749,-122.4194,2500,4,3,2015,House
2,456 Pine Ave,Los Angeles,CA,90001,34.0522,-118.2437,1800,3,2,2010,Apartment
\`\`\`

### 2. **listings.csv** - Current Listings
\`\`\`csv
listing_id,property_id,price,status,date_listed,agent_name,description,amenities
1,1,850000,active,2024-01-15,John Doe,"Beautiful 4BR house",pool;garage;garden
2,2,650000,sold,2024-01-10,Jane Smith,"Cozy 3BR apartment",gym;parking
\`\`\`

### 3. **training_data.csv** - AI Price Prediction Training Data
\`\`\`csv
property_id,sqft,bedrooms,bathrooms,year_built,price,location_score,condition_rating
1,2500,4,3,2015,850000,85,8
2,1800,3,2,2010,650000,75,7
3,3200,5,4,2018,1100000,90,9
\`\`\`

---

## 🔌 API Endpoints (Frontend Expects These)

### Authentication Endpoints
- **POST** `/api/auth/signup`
  - Request: `{ email, password, name, phone }`
  - Response: `{ token, user: { id, email, name } }`

- **POST** `/api/auth/login`
  - Request: `{ email, password }`
  - Response: `{ token, user: { id, email, name } }`

### Property Endpoints
- **GET** `/api/properties`
  - Query params: `?location=&min_price=&max_price=&type=&page=1&limit=12`
  - Response: `{ properties: [...], total, page, pages }`

- **GET** `/api/properties/:id`
  - Response: `{ property: { id, address, price, images: [...], amenities: [...], ratings: {...} } }`

### Listings Endpoints
- **GET** `/api/listings`
  - Query params: `?status=active&sort=date`
  - Response: `{ listings: [...] }`

### Map Endpoints
- **GET** `/api/map/properties`
  - Response: `{ properties: [{ id, lat, lng, price, address }] }`

### AI Price Prediction
- **POST** `/api/predict-price`
  - Request: `{ sqft, bedrooms, bathrooms, year_built, location_score, condition_rating }`
  - Response: `{ predicted_price, confidence, range: { min, max } }`

---

## 🗄️ Database Schema

### Users Table
\`\`\`sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### Properties Table
\`\`\`sql
CREATE TABLE properties (
    property_id INT PRIMARY KEY,
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(10),
    latitude FLOAT,
    longitude FLOAT,
    sqft INT,
    bedrooms INT,
    bathrooms INT,
    year_built INT,
    property_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### Listings Table
\`\`\`sql
CREATE TABLE listings (
    listing_id INT PRIMARY KEY,
    property_id INT,
    price DECIMAL(15, 2),
    status VARCHAR(20),
    date_listed DATE,
    agent_name VARCHAR(255),
    description TEXT,
    amenities JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(property_id)
);
\`\`\`

---

## ⚙️ Environment Variables (.env)

\`\`\`
# Flask Config
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your_secret_key_here

# Database
DATABASE_URL=mysql+pymysql://user:password@localhost/real_estate_db

# JWT
JWT_SECRET_KEY=your_jwt_secret_key_here
JWT_ACCESS_TOKEN_EXPIRES=86400

# CORS (for Next.js frontend)
FRONTEND_URL=http://localhost:3000

# ML Model Path
MODEL_PATH=app/ml/models/trained_model.pkl
SCALER_PATH=app/ml/models/scaler.pkl

# CSV Data Paths
PROPERTIES_CSV=data/csv_files/properties.csv
LISTINGS_CSV=data/csv_files/listings.csv
TRAINING_CSV=data/csv_files/training_data.csv
\`\`\`

---

## 📦 requirements.txt

\`\`\`
Flask==2.3.0
Flask-CORS==4.0.0
Flask-JWT-Extended==4.4.0
Flask-SQLAlchemy==3.0.0
PyMySQL==1.1.0
python-dotenv==1.0.0
pandas==2.0.0
scikit-learn==1.2.0
numpy==1.24.0
joblib==1.2.0
Werkzeug==2.3.0
\`\`\`

---

## 🚀 Quick Setup Steps

1. **Create virtual environment:**
   \`\`\`bash
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

3. **Add CSV files to `data/csv_files/`:**
   - Place your `properties.csv`
   - Place your `listings.csv`
   - Place your `training_data.csv`

4. **Initialize database:**
   \`\`\`bash
   python
   >>> from app import create_app, db
   >>> app = create_app()
   >>> with app.app_context():
   >>>     db.create_all()
   \`\`\`

5. **Train ML model** (optional - will be done by your prediction service):
   - The `prediction_service.py` should load/train from `training_data.csv`

6. **Run Flask server:**
   \`\`\`bash
   python run.py
   \`\`\`

---

## 🤖 ML Model Integration

The `app/ml/price_predictor.py` should:
1. Load `training_data.csv`
2. Train a regression model (RandomForest or XGBoost recommended)
3. Save trained model to `app/ml/models/trained_model.pkl`
4. Use scaler to normalize input features

When prediction endpoint is called:
- Accept: sqft, bedrooms, bathrooms, year_built, location_score, condition_rating
- Output: predicted_price with confidence score and price range

---

## 🔐 Authentication Flow

1. User submits signup/login form (from Next.js frontend)
2. Flask validates credentials
3. Flask generates JWT token
4. Frontend stores token in localStorage/cookies
5. Frontend sends token in Authorization header for protected routes

---

## 📝 Notes

- All API responses should follow consistent JSON format
- Include proper error handling (400, 401, 404, 500 responses)
- Add CORS headers to allow requests from frontend (http://localhost:3000)
- Use transactions for critical operations
- Log all API calls and errors
