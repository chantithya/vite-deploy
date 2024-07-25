import { Routes, Route } from "react-router-dom";
import InstagramFeed from "./components/InstagramFeed";
import InstagramNewFeed from "./components/InstagramNewFeed";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main className="container my-5">
        <Routes>
          <Route path="/" element={<InstagramFeed />} />
          <Route path="/new-feed/:id" element={<InstagramNewFeed />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
