import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Header from './components/navigation/Header.jsx';
import Footer from './components/navigation/Footer.jsx';
import Challenge from './components/challenges/Challenge.jsx';
import Home from './components/home/Home.jsx';

// Dynamically import all metadata.json files
const context = require.context(
  './components/challenges/data', // folder to search
  true,                           // search subfolders
  /metadata\.json$/               // match files named metadata.json
);

const challengedb = context.keys().map((key) => {
  const data = context(key);
  return {
    uid: data.uid,
    title: data.title,
    module: data.module,
    data, // full JSON for Challenge component
  };
});

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Dynamic Challenge Routes */}
          {challengedb.map((challenge) => (
            <Route
              key={challenge.uid}
              path={`/${challenge.uid}`}
              element={<Challenge data={challenge.data} />}
            />
          ))}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
