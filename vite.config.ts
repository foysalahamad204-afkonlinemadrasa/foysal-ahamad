import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
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
