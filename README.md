# UGA website

Install Node.js LTS, then open a terminal in this folder. No package installation is required.

```sh
npm start
```

Open http://localhost:3000. Stop the server with Ctrl+C. Use `npm run dev` to restart the server automatically when server code changes; refresh the browser after editing the page or styles.

```sh
npm test
```

This checks JavaScript syntax. To check the layout, open the browser's responsive device toolbar and try widths of 320, 375, 520, 768, 1024, and 1440 pixels. Check the navigation menu, service cards, gallery, contact section, and estimate dialog. Also try landscape orientation and 200% zoom.

If Node was just installed, reopen your terminal so `node` and `npm` are on PATH. In PowerShell, use `npm.cmd` if script execution policy blocks `npm.ps1`.

## Deploy to Netlify

The GitHub Actions workflow in `.github/workflows/netlify-deploy.yml` checks JavaScript syntax and deploys the static website to Netlify on every push to `main`. You can also run it manually from the repository's **Actions** tab by selecting **Deploy to Netlify**, then **Run workflow** on `main`.

One-time setup:

1. Create or choose the project in Netlify that should host this website.
2. Copy its Project ID (also called Site ID) from the project's configuration in Netlify.
3. Create a personal access token in your Netlify user settings under **Applications**. Use an account with access to that project.
4. In [this repository's Actions secrets](https://github.com/KokieTech/uga-garage-door-repairs-llc/settings/secrets/actions), add two repository secrets: `NETLIFY_AUTH_TOKEN` for the token and `NETLIFY_SITE_ID` for the project ID. Keep the token out of source control.
5. Run the workflow from GitHub Actions, or push a change to `main`. The deployment step logs the Netlify site and deployment URLs.

The workflow runs `npm run build` to assemble the homepage, service and location pages, and their assets in `dist/`. The local server and repository files are excluded. Edit the page copy and photo references in `page-content.mjs`; `pages.mjs` contains the two layouts. The local server uses those same layouts, so you can preview any route with `npm start` without building first.

If the Netlify project already has Git-based automatic publishing enabled, disable that automatic publishing when using this workflow to avoid duplicate deployments.
