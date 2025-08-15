# 🌾 AgriVerse - Rice Production Forecast Dashboard

AgriVerse is a modern and responsive **full-stack** web application designed to **monitor and predict rice production trends across Sri Lanka**.  
It uses historical production data, weather insights, and machine learning models to generate **accurate rice yield forecasts** for the **Maha** and **Yala** seasons.

---

## 📚 Table of Contents

- [✨ Features](#-features)
- [🧩 Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [📡 API Endpoints](#-api-endpoints)
- [📊 Machine Learning Models](#-machine-learning-models)

---

## ✨ Features

### Frontend
- 📍 **District-wise Prediction Monitoring**
- 🌦️ **Weather Overview by Province**
- 📈 **Real-time Analytics & Charts**
- 🔮 **Prediction Form & Output Display**
- 📋 **Recent Activity Feed**
- 🌱 **Season Progress (Maha & Yala)**

### Backend
- 🧠 **Machine Learning Model Integration** (Yala & Maha season models)
- 🔥 **Firebase Authentication** (Google Sign-in & Email/Password)
- 🗄️ **Firestore Database** for storing user predictions & history
- 🌦️ **Weather Data Integration**
- 📡 **RESTful API** with FastAPI
- 📂 **Prediction History Management**
- 🔐 **JWT-based Authentication**
- 🌱 **Seasonal Rice Production Predictions**:
  - **Yala Season** (Extent & Production Forecast)
  - **Maha Season** (Production Forecast)


---

## 🧩 Tech Stack

**Frontend**
- **React + TypeScript**
- **Vite** (for fast bundling)
- **Tailwind CSS** (for modern UI)
- **Custom Hooks** (under `/hooks`)
- **Modular Components** (in `/components/ui`)
- **Reusable Pages** (in `/pages`)

**Backend**
- **FastAPI** (Python)
- **Firebase Admin SDK** (for authentication & Firestore access)
- **Joblib** (for loading ML models)
- **Pandas / NumPy** (data handling)
- **Uvicorn** (server)
- **Pydantic** (data validation)

---

## 📂 Project Structure
```plaintext
AgriVerse_RicePrediction/
│
├── frontend/           # React + TypeScript + Vite frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/            # FastAPI backend
│   ├── app/
│   │   ├── routes/     # API endpoints
│   │   ├── utils/      # Firebase config, helper functions
│   │   ├── ml_models/  # Pre-trained model files (.pkl)
│   │   └── main.py     # Application entry point
│   ├── requirements.txt
│   └── run.py
│
└── README.md
```

## 🚀 Getting Started

### Frontend Setup
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run FastAPI server
uvicorn app.main:app --reload
```

## 📡 API Endpoints

| Method | Endpoint                        | Description                                      |
|--------|---------------------------------|--------------------------------------------------|
| POST   | /auth/login                     | User login                                       |
| POST   | /auth/google                    | Google Sign-in                                   |
| POST   | /production/predict             | Make a rice production prediction (Yala/Maha)   |
| GET    | /production/my                  | Get all predictions for the authenticated user  |
| GET    | /production/my/{prediction_id}  | Get a single prediction by ID for the user      |
| GET    | /weather/{district}             | Get latest weather info for a district          |

## 📊 Machine Learning Models

### Yala Season Models
- `model_extent_compressed(Yala).pkl`
- `model_prodiction_compressed(Yala).pkl`

### Maha Season Model
- `model_compressed(Maha).pkl`




