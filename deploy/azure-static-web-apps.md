# Azure Static Web Apps – Project Setup

No changes are required to your Astro app code. A few configuration steps ensure builds and the contact form work.

---

## 1. Build configuration (Azure portal)

When creating the Static Web App, use:

| Field | Value |
|-------|--------|
| **App location** | `/` |
| **Api location** | *(leave blank)* |
| **Output location** | `dist` |

Build command is `npm run build` (Azure’s Custom preset uses this by default).

---

## 2. Build-time environment variables

### n8n webhook

The contact form uses `PUBLIC_N8N_WEBHOOK_URL` (see `src/components/ContactForm.astro`). That value is inlined at **build time**, so the GitHub Actions build must have access to it.

**.env is gitignored**, so the build on Azure will not see your local `.env`. Do this instead:

1. **GitHub:** In the repo (e.g. `MGG-Website`) go to **Settings → Secrets and variables → Actions**. Add **secrets**:
   - `PUBLIC_N8N_WEBHOOK_URL` = your n8n webhook URL (e.g. `https://brendan.bls.co.za/webhook/mgg-enquiries`)
   - `PUBLIC_SITE_URL` = `https://mgg.co.za` — used for SEO canonicals, OG tags, and sitemap

### Site URL (SEO, canonicals, sitemap)

Set `PUBLIC_SITE_URL` to `https://mgg.co.za`. It is used for canonical URLs, Open Graph URLs, structured data, and the sitemap. Add it as a GitHub Actions secret and pass it into the build step alongside `PUBLIC_N8N_WEBHOOK_URL` (see below).

2. **Workflow:** After the first deployment, Azure will have created a workflow under `.github/workflows/` (e.g. `azure-static-web-apps-<name>.yml`). Open it and add the secrets to the **build** step so the build sees the env vars.

   Find the step that runs the app build (often a step with `npm run build` or that uses `app_build_command`). Add an `env` block to that step:

   ```yaml
   - name: Build And Deploy
     id: builddeploy
     uses: Azure/static-web-apps-deploy@v1
     with:
       # ... existing inputs (azure_static_web_apps_api_token, repo_token, etc.) ...
     env:
       PUBLIC_N8N_WEBHOOK_URL: ${{ secrets.PUBLIC_N8N_WEBHOOK_URL }}
       PUBLIC_SITE_URL: ${{ secrets.PUBLIC_SITE_URL }}
   ```

   If the build step uses a different name or structure, add the same `env` block to the step that runs the front-end build.

3. **Redeploy:** Push a commit or trigger the workflow again so the next build uses the secret.

---

## 3. Optional: `staticwebapp.config.json`

You don’t need this for a basic static Astro site. Add it only if you want:

- Redirects (e.g. `http` → `https`, or `www` → apex)
- Custom headers (e.g. security headers)
- SPA-style fallback for client-side routes

If you add it, place `staticwebapp.config.json` in the **repository root**. [Azure docs: configuration](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration).

---

## 4. Deploy flow

**When you push to GitHub, the live site updates automatically.** No manual deploy step is needed.

- **Push to `main`** → the Azure Static Web Apps CI/CD workflow runs → it builds with `npm run build` (using `PUBLIC_N8N_WEBHOOK_URL` from secrets) → it uploads the `dist/` output to Azure → the live site is updated at your Static Web App URL (e.g. `https://<name>.azurestaticapps.net` or your custom domain).
- You can watch runs under **GitHub → Actions** and deployment status in the Azure portal (**mgg-website** overview).
- **FTP:** Your existing `deploy.js` and `npm run deploy:temp` / `deploy:prod` scripts are not used for Azure; use them only if you still deploy to an FTP host separately.

---

## Summary

| Item | Action |
|------|--------|
| Astro app code | No change |
| Azure Create wizard | App location `/`, Api location blank, Output location `dist` |
| n8n webhook | Add `PUBLIC_N8N_WEBHOOK_URL` in GitHub Actions secrets and in the workflow build step `env` |
| `staticwebapp.config.json` | Optional; add only for redirects/headers |
| `deploy.js` / FTP | Keep as-is if you still use FTP; not used for Azure SWA |
