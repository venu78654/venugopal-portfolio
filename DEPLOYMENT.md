# Deployment Guide

This project is a static Next.js site (`output: 'export'`). `npm run build` writes plain HTML/CSS/JS to `./out`.
Below are three ways to put it online. **Option A (GitHub Pages)** is free and fully automated by the
included workflow.

---

## 0. Before you deploy (2 minutes)

1. Open `lib/data.ts` and set your real **LinkedIn** and **GitHub** URLs in `PROFILE`.
2. Check the email address, metrics and experience text.
3. Run it locally once:

   ```bash
   npm install
   npm run build
   npm start          # open the URL it prints and click around
   ```

---

## Option A — GitHub Pages (free, automatic)

### 1. Create the repository

1. Go to <https://github.com/new>.
2. Repository name:
   - `venugopal-portfolio` → site will be at `https://<username>.github.io/venugopal-portfolio/`
   - or `<username>.github.io` → site will be at `https://<username>.github.io/` (recommended for a personal portfolio)
3. Keep it **Public**, don't add a README (this project has one), click **Create repository**.

### 2. Push the code

From inside the project folder:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main
```

> First push asks you to sign in. If you use a password prompt, paste a
> **Personal Access Token** (GitHub → Settings → Developer settings → Tokens) instead of your password,
> or use GitHub Desktop / `gh auth login`.

### 3. Turn on Pages

1. In the repo, open **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Go to the **Actions** tab. The *Deploy to GitHub Pages* workflow runs automatically
   (or click **Run workflow**). It takes about 1–2 minutes.
4. When it's green, the live URL is shown on the workflow run and in **Settings → Pages**.

That's it. **Every `git push` to `main` redeploys the site.**

### How the sub-path works

For a repo like `venugopal-portfolio`, GitHub serves the site from `/venugopal-portfolio/`. The workflow
reads that path from `actions/configure-pages` and passes it to the build as `BASE_PATH`, which
`next.config.mjs` uses for `basePath` and `assetPrefix`. You don't need to change anything.
If you build locally with `npm run build`, `BASE_PATH` is empty and the site works from `/`.

### Optional: custom domain (e.g. venugopal.dev)

1. Buy the domain (Namecheap, GoDaddy, Cloudflare, Google Domains, etc.).
2. **Settings → Pages → Custom domain** → enter `venugopal.dev` → Save.
3. At your DNS provider add:
   - Four `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - A `CNAME` record for `www` → `<username>.github.io`
4. Wait for DNS (minutes to a few hours), then tick **Enforce HTTPS**.
5. Add a file `public/CNAME` containing just `venugopal.dev` so the setting survives redeploys.

With a custom domain the site is served from `/`, and `configure-pages` returns an empty base path
automatically.

---

## Option B — Vercel (fastest, also free)

1. Push the code to GitHub (step A.1 and A.2 above).
2. Go to <https://vercel.com/new>, sign in with GitHub and **Import** the repository.
3. Framework preset: **Next.js** (auto-detected). Leave build settings as they are.
4. Click **Deploy**. You get a `*.vercel.app` URL in about a minute, and every push redeploys.
5. Custom domain: **Project → Settings → Domains → Add**.

Do **not** set `BASE_PATH` on Vercel; the site is served from `/`.

---

## Option C — Any static host (Netlify, Cloudflare Pages, S3…)

```bash
npm run build
```

Upload the contents of `./out`. On Netlify / Cloudflare Pages use:

- Build command: `npm run build`
- Output / publish directory: `out`

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Page loads but has no styles on GitHub Pages | Pages **Source** must be **GitHub Actions**, not "Deploy from a branch". Re-run the workflow. |
| Workflow fails at `npm ci` | Commit `package-lock.json` (it's included in this project). |
| Workflow fails with a Pages permission error | **Settings → Actions → General → Workflow permissions**: allow *Read and write*; then re-run. |
| Photo missing | Keep the file at `public/venugopal-portrait.webp`; it's imported in `components/About.tsx` and `Hero.tsx`. |
| Old version still showing | Hard refresh (Ctrl/Cmd + Shift + R); GitHub's CDN can cache for a few minutes. |

---

## Updating the site later

```bash
# edit files…
git add .
git commit -m "Update projects"
git push
```

GitHub Actions (or Vercel) rebuilds and redeploys automatically.
