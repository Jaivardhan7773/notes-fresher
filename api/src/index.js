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

const allowedOrigins = [
   process.env.WEB_URL ,
   "https://notes-fresher.vercel.app"
]

app.use(cors({
    origin:allowedOrigins,
    credentials:true
}))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
