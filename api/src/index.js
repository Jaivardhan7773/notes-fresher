require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(cookieParser());

const WEB_URL = (process.env.WEB_URL || '').replace(/\/+$/, '');
if (!WEB_URL) {
  throw new Error('WEB_URL is required (e.g. https://notes-fresher.vercel.app)');
}


const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);

    const o = origin.replace(/\/+$/, '');
    if (o === WEB_URL) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie'],
};

app.use(cors(corsOptions));

app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (err.isJoi) {
    return res.status(422).json({
      error: {
        code: 'VALIDATION_ERROR',
        details: err.details.map(d => ({ field: d.path.join('.'), message: d.message }))
      }
    });
  }
  res.status(err.status || 500).json({ error: err.message || 'SERVER_ERROR' });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
