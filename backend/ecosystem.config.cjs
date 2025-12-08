module.exports = {
  apps: [
    {
      name: "backend_server",
      script: "index.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3142,
        MONGODB_URI: "mongodb://localhost:27017/",
        JWT_SECRET_KEY: "qwertyuiopmbvsfghj545k"
      }
    }
  ]
};