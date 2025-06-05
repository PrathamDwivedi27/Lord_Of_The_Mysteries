# 📊 Chapter Performance Dashboard - Backend

## 🧩 Objective

Build a **RESTful API-based backend** for a **Chapter Performance Dashboard**.  
This project simulates real-world backend requirements like:

- Clean API design  
- Data filtering and search  
- Caching and rate limiting  
- Performance optimization  
- CI/CD deployment on AWS EC2  

---

## 🔗 Postman API Collection

👉 [View Postman Collection](#)  
(*Replace this with your actual Postman collection URL*)

---

## 🚀 Features & Best Practices

✅ **Modular MVC architecture**  
✅ **MongoDB indexing** for faster search and filter operations  
✅ **Aggregation pipelines** to handle complex queries efficiently  
✅ **Winston logger** for request and error logging  
✅ **Redis caching** for repeated requests  
✅ **Redis-based rate limiting** to prevent abuse  
✅ **Environment-based config management** with `.env`  
✅ **Graceful server shutdown** and DB disconnection  
✅ **PM2** for process management in production  
✅ **GitHub Actions CI/CD** — auto-deploy to EC2 on each push to `main`  
✅ **Deployed on AWS EC2** with MongoDB Atlas and Redis

---

## 📁 Folder Structure

```bash
📦 Project Root
├── 📁.github
│   └── 📁workflows
│       └── deploy.yml
├── 📁logs
│   ├── combined.log
│   └── error.log
├── 📁src
│   ├── 📁config
│   │   ├── db.js
│   │   ├── redis.js
│   │   └── server-config.js
│   ├── 📁controllers
│   │   └── chapter-controller.js
│   ├── 📁middleware
│   │   ├── isAdmin.js
│   │   ├── multer.js
│   │   └── rate-limiter.js
│   ├── 📁models
│   │   └── chapter-model.js
│   ├── 📁repository
│   │   └── chapter-repository.js
│   ├── 📁routes
│   │   ├── index.js
│   │   └── 📁v1
│   │       └── chapter-routes.js
│   ├── 📁services
│   │   └── chapter-service.js
│   ├── 📁utils
│   │   └── logger.js
│   └── app.js
├── package.json
└── .env
