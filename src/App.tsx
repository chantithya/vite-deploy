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
