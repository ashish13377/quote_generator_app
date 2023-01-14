import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//Pages
import Home from './pages/Home';
import Bookmarks from './pages/Bookmarks';

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </Router>
    </div>
  )
}
