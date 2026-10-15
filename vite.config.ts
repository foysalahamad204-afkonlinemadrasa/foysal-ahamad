import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { defineConfig, Plugin } from 'vite';

// Server-side persistent storage plugin
function academyStoragePlugin(): Plugin {
  const dbDir = path.resolve(__dirname, 'data');
  const dbFile = path.resolve(dbDir, 'academy_db.json');

  return {
    name: 'academy-storage-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        // Ensure data directory exists
        if (!fs.existsSync(dbDir)) {
          fs.mkdirSync(dbDir, { recursive: true });
        }

        const parseBody = (callback: (body: any) => void) => {
          let data = '';
          req.on('data', chunk => { data += chunk; });
          req.on('end', () => {
            try {
              callback(data ? JSON.parse(data) : {});
            } catch (e) {
              callback({});
            }
          });
        };

        const sendJson = (data: any, status = 200) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };

        if (req.url === '/api/db' && req.method === 'GET') {
          if (fs.existsSync(dbFile)) {
            try {
              const content = fs.readFileSync(dbFile, 'utf-8');
              return sendJson(JSON.parse(content));
            } catch (err) {
              console.error('Error reading db file:', err);
            }
          }
          return sendJson({ notFound: true }, 404);
        }

        if (req.url === '/api/db' && req.method === 'POST') {
          parseBody((body) => {
            try {
              fs.writeFileSync(dbFile, JSON.stringify(body, null, 2), 'utf-8');
              return sendJson({ success: true, timestamp: new Date().toISOString() });
            } catch (err) {
              console.error('Error writing db file:', err);
              return sendJson({ success: false, error: 'Write failed' }, 500);
            }
          });
          return;
        }

        // Dedicated search endpoint for admission IDs (e.g., FSDQ-2026-2161) and phone numbers
        if (req.url?.startsWith('/api/admissions/search')) {
          try {
            const parsedUrl = new URL(req.url, 'http://localhost');
            const rawQuery = (
              parsedUrl.searchParams.get('id') || 
              parsedUrl.searchParams.get('q') || 
              parsedUrl.searchParams.get('phone') || 
              ''
            ).trim();

            if (!rawQuery) {
              return sendJson({ found: false, message: 'অনুগ্রহ করে আবেদন নম্বর বা মোবাইল নম্বর লিখুন।' }, 400);
            }

            // Convert Bengali numerals to ASCII digits
            const bengaliDigits: Record<string, string> = {
              '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
              '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
            };
            const toAsciiDigits = (s: string) => s.replace(/[০-৯]/g, d => bengaliDigits[d] || d);

            const asciiQuery = toAsciiDigits(rawQuery).toUpperCase();
            const alphaQuery = asciiQuery.replace(/[^A-Z0-9]/g, '');
            const phoneDigits = asciiQuery.replace(/[^0-9]/g, '');

            if (fs.existsSync(dbFile)) {
              const content = fs.readFileSync(dbFile, 'utf-8');
              const db = JSON.parse(content);
              const admissions = Array.isArray(db.admissions) ? db.admissions : [];

              const found = admissions.find((app: any) => {
                const appId = toAsciiDigits((app.id || app.applicationId || '').toString()).toUpperCase();
                const appAlpha = appId.replace(/[^A-Z0-9]/g, '');
                
                // Match exact ID (e.g., FSDQ-2026-2161)
                if (appId === asciiQuery) return true;
                if (appAlpha && alphaQuery && appAlpha === alphaQuery) return true;
                // Match trailing ID digits (e.g., 2161)
                if (alphaQuery.length >= 4 && appAlpha.endsWith(alphaQuery)) return true;

                // Match phone number
                if (phoneDigits.length >= 7 && app.phone) {
                  const appPhoneDigits = toAsciiDigits(app.phone).replace(/[^0-9]/g, '');
                  if (appPhoneDigits.includes(phoneDigits)) return true;
                }

                return false;
              });

              if (found) {
                return sendJson({ found: true, application: found });
              }
            }

            return sendJson({ found: false, message: 'আবেদন পাওয়া যায়নি' }, 404);
          } catch (err) {
            console.error('Error during admission search:', err);
            return sendJson({ found: false, error: 'অনুসন্ধানে ত্রুটি হয়েছে' }, 500);
          }
        }

        // In-memory OTP store with expiration
        const otpStore = (global as any).__fsdq_otpStore || ((global as any).__fsdq_otpStore = new Map<string, { otp: string; expiresAt: number }>());

        if (req.url === '/api/auth/forgot-password' && req.method === 'POST') {
          parseBody(async (body) => {
            const email = (body.email || '').trim().toLowerCase();
            const allowedEmails = [
              'ahamadfoysal920@gmail.com',
              'foysalahamad204@gmail.com',
              'admin@fsdarulquran.com'
            ];
            if (!allowedEmails.includes(email)) {
              return sendJson({ success: false, error: 'অননুমোদিত বা নিবন্ধিত অ্যাডমিন ইমেইল নয়।' }, 400);
            }

            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
            otpStore.set(email, { otp, expiresAt });

            const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
            const smtpPort = parseInt(process.env.SMTP_PORT || '587');
            const smtpUser = process.env.SMTP_USER;
            const smtpPass = process.env.SMTP_PASS;

            let emailSent = false;
            if (smtpUser && smtpPass) {
              try {
                const transporter = nodemailer.createTransport({
                  host: smtpHost,
                  port: smtpPort,
                  secure: smtpPort === 465,
                  auth: { user: smtpUser, pass: smtpPass },
                });

                await transporter.sendMail({
                  from: `"FS Darul Quran Academy" <${smtpUser}>`,
                  to: email,
                  subject: 'অ্যাডমিন পাসওয়ার্ড রিসেট OTP কোড - FS Darul Quran',
                  text: `আপনার FS Darul Quran Online Academy অ্যাডমিন প্যানেল পাসওয়ার্ড রিসেট করার OTP কোড হলো: ${otp}\nএই কোডটি ৫ মিনিটের মধ্যে মেয়াদোত্তীর্ণ হবে।`,
                  html: `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #064E3B;">FS Darul Quran Online Academy</h2>
                    <p>আপনার অ্যাডমিন পাসওয়ার্ড রিসেট করার অনুরোধ করা হয়েছে।</p>
                    <div style="background: #F3F4F6; padding: 15px; font-size: 24px; font-weight: bold; letter-spacing: 3px; text-align: center; color: #064E3B; border-radius: 8px; margin: 20px 0;">
                      ${otp}
                    </div>
                    <p>এই ওটিপি কোডটি ৫ মিনিট পর্যন্ত কার্যকর থাকবে। কারো সাথে শেয়ার করবেন না।</p>
                  </div>`,
                });
                emailSent = true;
              } catch (err: any) {
                console.error('Nodemailer send error:', err);
              }
            } else {
              console.log(`[REAL GMAIL SETUP NOTICE]: OTP for ${email} is ${otp}. To send real emails automatically to Gmail, configure SMTP_USER and SMTP_PASS in your environment variables (.env).`);
            }

            return sendJson({
              success: true,
              emailSent,
              message: emailSent
                ? `আপনার নিবন্ধিত ইমেইলে (${email}) সফলভাবে OTP পাঠানো হয়েছে।`
                : `OTP জেনারেট হয়েছে। অনুগ্রহ করে আপনার জিমেইল ইনবক্স বা কনসোল চেক করুন। (লাইভ জিমেইল পাঠানোর জন্য .env ফাইলে SMTP_USER ও SMTP_PASS সেট করুন)`,
            });
          });
          return;
        }

        if (req.url === '/api/auth/verify-otp' && req.method === 'POST') {
          parseBody((body) => {
            const email = (body.email || '').trim().toLowerCase();
            const otp = (body.otp || '').trim();

            const record = otpStore.get(email);
            if (!record) {
              return sendJson({ success: false, error: 'কোনো ওটিপি অনুরোধ পাওয়া যায়নি বা মেয়াদ শেষ হয়ে গেছে।' }, 400);
            }
            if (Date.now() > record.expiresAt) {
              otpStore.delete(email);
              return sendJson({ success: false, error: 'ওটিপির মেয়াদ শেষ হয়ে গেছে। আবার চেষ্টা করুন।' }, 400);
            }
            if (record.otp !== otp) {
              return sendJson({ success: false, error: 'ওটিপি সঠিক নয়।' }, 400);
            }

            return sendJson({ success: true, message: 'ওটিপি সফলভাবে যাচাই হয়েছে।' });
          });
          return;
        }

        if (req.url === '/api/auth/reset-password' && req.method === 'POST') {
          parseBody((body) => {
            const email = (body.email || '').trim().toLowerCase();
            const otp = (body.otp || '').trim();
            const newPassword = body.newPassword || '';

            const record = otpStore.get(email);
            if (!record || record.otp !== otp || Date.now() > record.expiresAt) {
              return sendJson({ success: false, error: 'ওটিপি অবৈধ বা মেয়াদোত্তীর্ণ।' }, 400);
            }
            if (newPassword.trim().length < 6) {
              return sendJson({ success: false, error: 'নতুন পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের হতে হবে।' }, 400);
            }

            try {
              if (fs.existsSync(dbFile)) {
                const content = fs.readFileSync(dbFile, 'utf-8');
                const dbObj = JSON.parse(content);

                // Hash password securely using Web Crypto API equivalent in node crypto
                const crypto = require('crypto');
                const newHash = crypto.createHash('sha256').update(newPassword.trim()).digest('hex');

                dbObj.siteSettings = {
                  ...dbObj.siteSettings,
                  adminPasswordHash: newHash,
                };

                fs.writeFileSync(dbFile, JSON.stringify(dbObj, null, 2), 'utf-8');
                otpStore.delete(email);
                return sendJson({ success: true, message: 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।' });
              } else {
                return sendJson({ success: false, error: 'ডাটাবেজ ফাইল পাওয়া যায়নি।' }, 500);
              }
            } catch (err: any) {
              console.error('Password reset error:', err);
              return sendJson({ success: false, error: 'পাসওয়ার্ড পরিবর্তন করতে সমস্যা হয়েছে।' }, 500);
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), academyStoragePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
