# Hosting & Deployment – Conversation Summary

Summary of decisions and recommendations for hosting the MGG event-planning static site (Astro).

---

## 1. Hosting choice

- **Do not use Azure Kubernetes (AKS)** for this project. The site is a static Astro build; AKS would be unnecessary cost and complexity.
- **Recommended:** **Azure Static Web Apps** (or a Linux VPS if you prefer the existing deployment-maintain agent workflow).
- Alternatives: Vercel, Netlify, Cloudflare Pages (all good for static/JAMstack).

---

## 2. Azure Static Web Apps – costs

| Plan     | Monthly cost | Bandwidth   | Notes |
|----------|--------------|------------|-------|
| **Free** | $0           | 100 GB/sub | No SLA; site stops if over quota (no overage charges). |
| **Standard** | $9/app/month | 100 GB included | Overage: $0.20/GB. SLA, more storage, 5 custom domains. |

- SSL is **included** on both Free and Standard (no extra cost).
- For a typical static event site, Free is often enough; Standard is for production/SLA.

---

## 3. Speed & overage

- **Speed:** Static Web Apps serves from Azure’s edge; performance is good for static sites.
- **Free tier:** If you exceed the 100 GB quota, the site **stops being served** until the next period. **No automatic charges.**
- **Standard tier:** Overage is **billed automatically** at $0.20/GB after 100 GB.

---

## 4. Quoting for the client

- **Option A (recommended):** Quote build separately; hosting as “Azure Static Web Apps – Free ($0) or Standard ($9/month); you set it up, client pays Azure (or you invoice actual cost, no markup).”
- **Option B:** If you’re responsible for hosting, quote **$15/month** on Standard to cover the $9 base + a buffer for overage; set **Azure budget alerts** so you’re not surprised by usage.
- **Example line:** *“Hosting (Azure Static Web Apps, Standard): $15/month. Covers base plan and normal traffic; we’ll only adjust if traffic grows significantly.”*

---

## 5. Custom domain (DNS)

- **www** (e.g. www.clientdomain.com): client adds a **CNAME** record pointing to `your-app-name.azurestaticapps.net` (Azure shows the exact hostname when you add the custom domain).
- **Apex/root** (e.g. clientdomain.com): Azure will show either an **A record** (IP) or **ALIAS/ANAME** – follow the instructions in the Static Web App **Custom domains** blade.
- After DNS is correct, add the domain in Azure; SSL is provisioned automatically.

---

## 6. Reference

- Official pricing: [Azure Static Web Apps pricing](https://azure.microsoft.com/en-us/pricing/details/app-service/static/)
- Project: static Astro site (`output: "static"`); current deploy via FTP (`deploy.js`). Moving to Azure Static Web Apps would replace FTP with GitHub Actions (or similar) deploying the `dist/` output.
