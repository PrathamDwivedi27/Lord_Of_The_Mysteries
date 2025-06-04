import redisClient from "../config/redis.js";

const WINDOW_SIZE_IN_SECONDS = 60;
const MAX_REQUESTS_PER_WINDOW = 30;

export const rateLimiter = async (req, res, next) => {
  const ip = req.ip;
  const key = `rate_limit:${ip}`;

  try {
    let requests = await redisClient.get(key); // Get current request count

    if (requests === null) {
      // First request from this IP
      await redisClient.set(key, 1, 'EX', WINDOW_SIZE_IN_SECONDS);
      requests = 1;
    } else {
      requests = await redisClient.incr(key); // Increment if already exists
    }

    console.log(`Requests from ${ip}: ${requests}`);

    if (parseInt(requests) > MAX_REQUESTS_PER_WINDOW) {
      return res.status(429).json({
        success: false,
        message: "Too many requests, please try again later.",
        error: null
      });
    }

    return next(); // Proceed if within limit

  } catch (error) {
    console.error("Rate Limiter Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error (Rate Limiter)",
      error: error.message,
    });
  }
};
