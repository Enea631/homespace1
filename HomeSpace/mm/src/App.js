import './App.css';
import { Routes, Route } from 'react-router-dom';
import Footer from './component/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Navb from './component/Navb';
import Terms from './component/Terms';
import PropertyList from './pages/PropertyList'
import PropertyDetail from './pages/PropertyDetail'

function App() {
  return (
    <div className="App">
      <Navb />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/PropertyList" element={<PropertyList />} />
          <Route path="/PropertyDetail" element={<PropertyDetail />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
