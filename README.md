# Deployment Guide for Vite + React + TypeScript Project



    
## 1. Setup Your Project 
1. Install Vite, React, TypeScript, and other dependencies:

```js
npm create vite@latest vite-deploy --template react-ts
cd vite-deploy
npm install bootstrap react-router-dom
```

## 2. Create Project Files
1. Create the directory for components:
```js
mkdir src/components
```

2. Create src/components/Header.tsx:

```js
import "bootstrap/dist/css/bootstrap.min.css";

const Header: React.FC = () => {
  return (
    <header className="bg-dark text-white py-3 shadow-sm">
      <div className="container">
        <h1 className="text-center">Liyao Instagram Updates</h1>
      </div>
    </header>
  );
};

export default Header;
```

3. Create src/components/Footer.tsx:

```js
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className="bg-dark text-white py-3 shadow-sm mt-auto">
      <div className="container text-center">
        <p>&copy; 2024 Liyao. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
```

4. Create src/components/InstagramFeed.tsx:

```js
import React, { useEffect, useState } from "react";
import "./InstagramFeed.css";

interface InstagramMedia {
  id: string;
  media_url: string;
  caption?: string;
}

const mockPosts: InstagramMedia[] = [
  { id: "1", media_url: "https://via.placeholder.com/300", caption: "Post 1 caption" },
  { id: "2", media_url: "https://via.placeholder.com/300", caption: "Post 2 caption" },
  { id: "3", media_url: "https://via.placeholder.com/300", caption: "Post 3 caption" },
  { id: "4", media_url: "https://via.placeholder.com/300", caption: "Post 4 caption" },
  { id: "5", media_url: "https://via.placeholder.com/300", caption: "Post 5 caption" },
  { id: "6", media_url: "https://via.placeholder.com/300", caption: "Post 6 caption" },
  { id: "7", media_url: "https://via.placeholder.com/300", caption: "Post 7 caption" },
  { id: "8", media_url: "https://via.placeholder.com/300", caption: "Post 8 caption" },
  { id: "9", media_url: "https://via.placeholder.com/300", caption: "Post 9 caption" },
];

const InstagramFeed: React.FC = () => {
  const [media, setMedia] = useState<InstagramMedia[]>(mockPosts);
  const domainUrl = "https://graph.instagram.com/me/media?";
  const fields = "fields=media_url,caption";
  const accessToken = "YOUR_ACCESS_TOKEN";

  useEffect(() => {
    const fetchInstagramData = async () => {
      try {
        const requestUrl = `${domainUrl}${fields}&access_token=${accessToken}`;
        const response = await fetch(requestUrl);

        if (!response.ok) {
          if (response.status === 400) {
            setMedia(mockPosts);
            return;
          }
          return;
        }

        const data = await response.json();
        setMedia(data.data);
      } catch {
        setMedia(mockPosts);
      }
    };

    fetchInstagramData();
  }, [accessToken]);

  return (
    <div className="instagram-feed row">
      {media.map((post) => (
        <div key={post.id} className="col-sm-6 col-md-4 col-lg-4 mb-4">
          <div className="card shadow-sm">
            <img src={post.media_url} className="card-img-top" alt={`Post ${post.id}`} />
            {post.caption && (
              <div className="card-body">
                <p className="card-text">{post.caption}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstagramFeed;

```

5. Update src/App.tsx:

```json
import Header from "./components/Header";
import InstagramFeed from "./components/InstagramFeed";
import Footer from "./components/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header />
      <main className="container my-5">
        <InstagramFeed />
      </main>
      <Footer />
    </div>
  );
}

export default App;

```

6. Update src/main.tsx:

```json
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```


## 3. Configure Vite for GitHub Pages

1. Create vite.config.ts in the root directory:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/vite-deploy/"
})
```


## 4. Setup GitHub Actions for Deployment

1. Create .github/workflows/deploy.yml:

```js
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          publish_branch: gh-pages
```

## 5. Push to GitHub and Deploy

1. Initialize a new Git repository, add all files, commit, and push:

```js
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/chantithya/vite-deploy.git
git push -u origin main
```

2. After pushing, GitHub Actions will automatically build and deploy your project to GitHub Pages.

