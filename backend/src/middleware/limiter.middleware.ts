import rateLimit from 'express-rate-limit';

export const noteCreateRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, //1m
  max: 5,
  message: { message: 'You have exceeded the 5 notes submission per minuts!' },
  standardHeaders: true,
  legacyHeaders: false,
})

export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, //1m
  max: 100,
  message: { message: 'You have exceeded the 100 requests per minuts!' },
  standardHeaders: true,
  legacyHeaders: false,
});