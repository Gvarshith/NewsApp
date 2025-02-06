import "./App.css";
import React from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
    const apikey = process.env.REACT_APP_NEWS_API;
    return (
      <div>
         <Router future={{ v7_relativeSplatPath: true }}>
          <Navbar pageSize={10} />
          <Routes>
            <Route exact path="/" element={<News key="general"  apikey={apikey} category="general" />} />
            <Route exact path="/business" element={<News key="business"  apikey={apikey} category="business" />} />
            <Route exact path="/sports" element={<News  key="sports"  apikey={apikey} category="sports" />} />
            <Route exact path="/health" element={<News key="health"   apikey={apikey} category="health" />} />
            <Route exact path="/entertainment" element={<News key="entertainment"   apikey={apikey} category="entertainment" />} />
            <Route exact path="/science" element={<News key="science"  apikey={apikey} category="science" />} />
            <Route exact path="/technology" element={<News  key="technology"  apikey={apikey} category="technology" />} />          
          </Routes>
        </Router>
      </div>
    );
  
}
export default App

