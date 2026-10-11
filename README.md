# PROGENESIS team profiles
- `npm install && npm run dev`
- Edit members in `data/team.js`; add photos to `public/team/` (portrait 4:5 works best).
- Each member gets `/team/<slug>`; QR codes at `/qr`.
- Deploy: push to GitHub, import in Vercel, set `NEXT_PUBLIC_SITE_URL=https://your-domain.com`, redeploy, then download QR codes from `/qr`.
