const express = require('express');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

if (!process.env.JWT_SECRET) {
  console.warn('Warning: JWT_SECRET not set in .env — set it before using auth.');
}

router.post('/google', async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) {
    return res.status(400).json({
      error: { code: 'MISSING_TOKEN', message: 'idToken required' }
    });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();

    // Verify email is verified by Google
    if (!payload.email_verified) {
      return res.status(401).json({
        error: { code: 'EMAIL_NOT_VERIFIED', message: 'Google email not verified' }
      });
    }

    const user = {
      sub: payload.sub,
      name: payload.name,
      email: payload.email,
      picture: payload.picture
    };

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Set httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ ok: true, user });
  } catch (err) {
    console.error('Google token verify error:', err.message);
    res.status(401).json({
      error: { code: 'INVALID_ID_TOKEN', message: 'Failed to verify Google token' }
    });
  }
});

/**
 * GET /auth/me
 * Returns user from JWT (cookie or Authorization header)
 */
router.get('/me', (req, res) => {
  // lightweight check for cookie first
  const token = req.cookies?.token || (req.header('Authorization')?.replace('Bearer ', ''));
  if (!token) return res.status(401).json({ error: 'UNAUTHENTICATED' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = { name: payload.name, email: payload.email, picture: payload.picture, sub: payload.sub };
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: 'UNAUTHENTICATED' });
  }
});

router.get('/check', async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      ok: true,
      user: {
        sub: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture
      }
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired access token" });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});

module.exports = router;
