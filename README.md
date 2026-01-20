# BlogWave CMS

**BlogWave CMS** is a full-stack underwater-themed blog content management system. It features a visually immersive frontend with oceanic animations, a robust backend with JWT authentication, and complete blog management functionality.


## **Tech Stack**

- **Frontend:** Next.js 13+ (App Router) + TypeScript + Tailwind CSS  
- **Backend:** Node.js + Express + MongoDB + JWT Auth  
- **Animations & 3D:** Three.js, particles, wave effects  
- **DevOps:** Docker + Docker Compose  


## **Key Features**

### Frontend
- User authentication: Register, Login, OTP verification, Password reset  
- Blog creation, editing, draft saving, and deletion  
- Search blogs by name or tags  
- Save/Unsave and Like/Unlike blogs  
- User profile management with customizable details  
- Immersive oceanic animations:
  - Submarine, fish, bubble animations  
  - Wave separators and particle effects  

### Backend
- RESTful APIs for users and blogs  
- JWT-based authentication with protected routes  
- Email sending middleware for OTP/password recovery  
- Centralized error handling and API response utilities  

### Docker Support
- `docker-compose.yaml` to run both frontend and backend seamlessly  
- Easy local setup with one command  

## **Installation**

### Prerequisites
- Node.js (v18+ recommended)  
- MongoDB instance or Atlas cluster  
- Docker & Docker Compose (if using containerized setup)  

## Local Setup (Without Docker)
1. **Clone the repo**
```
git clone https://github.com/ashankgupta/blogwave-cms.git
cd BlogWave-CMS
```
2. **Backend**
```
cd backend
npm install
# Create .env with MongoDB URI and JWT secret
node server.js
```
3. **Frontend**
```
cd ../frontend
npm install
npm run dev
```
4. Open http://localhost:3000 in your browser

## Docker Setup
```
docker-compose up --build
```
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Folder Structure
```
blogwave-cms/
├── backend/    # Node.js API, controllers, models, routes
├── frontend/   # Next.js frontend with animations
├── docker-compose.yaml
```

## Contributing

1. Fork the repo

2. Create a branch (git checkout -b feature/your-feature)

3. Commit your changes (git commit -m "Add feature")

4. Push to the branch (git push origin feature/your-feature)

5. Open a Pull Request

## License

This project is licensed under GNU License.
