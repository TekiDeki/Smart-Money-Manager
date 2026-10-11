# Smart Money Manager

**Smart Money Manager** is an intuitive, web-based financial tool designed to help you monitor your wealth, income, and expenses with real-time analytics and interactive charts.

🌐 **Live Demo:** [https://TekiDeki.github.io/Smart-Money-Manager/](https://TekiDeki.github.io/Smart-Money-Manager/)

## ✨ Features

- 📊 **Real-time analytics** – Track your financial activity as it happens
- 📈 **Interactive charts** – Visualize your spending habits dynamically
- 💰 **Income & expense tracking** – Monitor daily expenses and monthly income
- 🗂️ **Transaction categorization** – Organize spending into buckets like Food, Rent, and Entertainment
- 🔍 **Spending insights** – Understand your behavior and make smarter decisions
- 📱 **Installable PWA** – Add it to your home screen and use it like a native app
- 🔒 **Secure & efficient** – Your financial data, protected

## 🚀 Live Demo

The application is hosted on **GitHub Pages** and runs entirely in your browser:

👉 **[https://TekiDeki.github.io/Smart-Money-Manager/](https://TekiDeki.github.io/Smart-Money-Manager/)**

No installation, no server, no dependencies — just open the link and start managing your money.

## 📱 Install on Mobile

Smart Money Manager is a **Progressive Web App (PWA)**, which means you can install it directly from your browser — no app store needed.

### 🤖 Android (Chrome / Edge / Brave)

1. Open **[https://TekiDeki.github.io/Smart-Money-Manager/](https://TekiDeki.github.io/Smart-Money-Manager/)** in Chrome.
2. Tap the **⋮ menu** (three dots, top-right).
3. Select **"Install app"** or **"Add to Home screen"**.
4. Confirm by tapping **"Install"**.
5. The app icon will appear on your home screen — tap it to launch full-screen.

### 🍎 iPhone / iPad (Safari)

1. Open **[https://TekiDeki.github.io/Smart-Money-Manager/](https://TekiDeki.github.io/Smart-Money-Manager/)** in **Safari** (must be Safari, not Chrome).
2. Tap the **Share button** (□ with ↑ arrow) at the bottom.
3. Scroll down and tap **"Add to Home Screen"**.
4. Name it (e.g. *Smart Money Manager*) and tap **"Add"**.
5. The icon will appear on your home screen and open like a standalone app.

### 💻 Desktop (Chrome / Edge)

1. Open the live demo link.
2. Click the **install icon** (⊕ or monitor icon) in the address bar.
3. Click **"Install"**.
4. The app opens in its own window, just like a native desktop app.

> **Tip:** Once installed, the app works offline thanks to the service worker (`sw.js`) and launches in full-screen mode without browser UI.

## 📦 Run Locally

Since the app is a standalone `index.html` file, you can run it locally in two ways:

### Option 1: Open directly in browser

Just double-click `index.html` — it works out of the box.

### Option 2: Serve with a local server (recommended)

```bash
# Clone the repository
git clone https://github.com/TekiDeki/Smart-Money-Manager.git
cd Smart-Money-Manager

# Start a simple local server (Python 3)
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

> ⚠️ **Note:** For the PWA features (install prompt, offline mode) to work, the app must be served over **HTTPS** or **localhost**. Opening `index.html` directly via `file://` will disable the service worker.

## 🛠️ Tech Stack

- **HTML5** – Structure
- **CSS3** – Styling
- **JavaScript (Vanilla)** – Logic and interactivity
- **Chart.js / D3.js** – Interactive data visualizations
- **Service Worker** – Offline support
- **Web App Manifest** – Installable PWA

## 📁 Project Structure

```
Smart-Money-Manager/
├── index.html          # Standalone app (HTML + CSS + JS)
├── manifest.json       # PWA manifest (name, icons, theme)
├── sw.js               # Service worker (offline caching)
├── icon-192.png        # App icon (192×192)
├── icon-512.png        # App icon (512×512)
├── LICENSE             # Apache License 2.0
└── README.md           # This file
```

## 📖 Usage

1. Open the app in your browser (or launch it from your home screen)
2. Add your income and expense transactions
3. Assign each transaction to a category (Food, Rent, Entertainment, etc.)
4. View real-time charts and analytics on your dashboard
5. Analyze trends to improve your spending habits

## 🚀 Deploy Your Own

Want to host your own copy? It's easy with **GitHub Pages**:

1. Fork or clone this repository
2. Go to **Settings → Pages**
3. Under **Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` and folder `/ (root)`
4. Click **Save**
5. Your site will be live at `https://<your-username>.github.io/Smart-Money-Manager/`

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## 📄 License

This project is licensed under the **Apache License 2.0** — see the [LICENSE](LICENSE) file for details.

## 📬 Contact

- **GitHub:** [@TekiDeki](https://github.com/TekiDeki)
- **Live App:** [TekiDeki.github.io/Smart-Money-Manager](https://TekiDeki.github.io/Smart-Money-Manager/)

---

**Take control of your financial future today with a smart, secure, and efficient money manager.**
