# 📊 Chapter Performance Dashboard - Backend

## 🧩 **Objective**

Build a **RESTful API-based backend** for a **Chapter Performance Dashboard**.  
This project simulates real-world backend requirements like:

- **Clean API design**  
- **Data filtering and search**  
- **Caching and rate limiting**  
- **Performance optimization**  
- **CI/CD deployment on AWS EC2**  

---

## 🔗 **EC2 Deployment Link**

👉 **[View EC2 Deployment](http://3.7.101.224:3000/)**  

---

## 🔗 **Postman API Collection**

👉 **[View Postman Collection](https://documenter.getpostman.com/view/39632752/2sB2x2JZFn)**  

---

## 🚀 **Features & Best Practices**

- ✅ **Modular MVC architecture**
- ✅ **MongoDB indexing** for faster search and filter operations
- ✅ **Aggregation pipelines** to handle complex queries efficiently
- ✅ **Winston logger** for request and error logging
- ✅ **Redis caching** for repeated requests
- ✅ **Redis-based rate limiting** to prevent abuse
- ✅ **Environment-based config management** with `.env`
- ✅ **Graceful server shutdown** and DB disconnection
- ✅ **PM2** for process management in production
- ✅ **GitHub Actions CI/CD** — auto-deploy to EC2 on each push to `main`
- ✅ **Deployed on AWS EC2** with MongoDB Atlas and Redis

---

## 📁 **Folder Structure**

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
```

---

## 👨‍💻 **About Me**

I'm a **passionate backend developer** focused on building robust and scalable APIs.  
I love working with **Node.js, MongoDB, Redis**, and cloud services like **AWS**.  
This project demonstrates my understanding of **production-ready backend systems**.

📧 **[pratham27dw@gmail.com](mailto:pratham27dw@gmail.com)**  
🔗 [**LinkedIn**](https://www.linkedin.com/in/prathamdwivedi) | [**GitHub**](https://github.com/PrathamDwivedi27)