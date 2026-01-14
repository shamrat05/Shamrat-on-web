# Md. Shamrat Hossain - Portfolio & Blog

A modern, high-performance portfolio and blog website built with **Eleventy (11ty)** and a custom **Modular Component Architecture**.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌟 Features

*   **⚡ High Performance:** Static site generation using Eleventy.
*   **🎨 Modular Design:** CSS and JS split into maintainable modules (see [Architecture](./PROJECT_ARCHITECTURE.md)).
*   **📱 Fully Responsive:** Optimized for Mobile, Tablet, and Desktop.
*   **🌙 Dark/Light Mode:** User-preference aware theme switching.
*   **✍️ Markdown Blog:** Easy content management via Markdown files.
*   **🔍 SEO Optimized:** Includes Schema.org data, sitemaps, and meta tags.

## 🚀 Quick Start

### Prerequisites
*   Node.js (v18 or higher)
*   npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/shamrat-portfolio.git
    cd shamrat-portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run locally (Development Mode):**
    ```bash
    npm start
    ```
    The site will be available at `http://localhost:8080`.

## 🛠️ Build & Deployment

### Production Build
To generate the production-ready site in the `_site` folder:

```bash
npm run build
```

This command runs two processes:
1.  **Eleventy Build:** Compiles HTML/content.
2.  **Asset Minification:** Uses `esbuild` to bundle and minify CSS/JS.

### Deployment (Vercel)
This project is configured for Vercel.
*   **Build Command:** `npm run build`
*   **Output Directory:** `_site`

## 📂 Project Structure

For a detailed breakdown of the file structure and modules, please refer to **[PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md)**.

## 📝 Content Management

*   **Blog Posts:** Add new `.md` files to `src/content/blog/`.
*   **Images:** Place images in `src/assets/images/`.

## 📄 License

This project is licensed under the MIT License.