import React from 'react';
import { Link } from 'react-router-dom';

// Dynamically import all metadata.json files
const context = require.context('../../components/challenges/data', true, /metadata\.json$/);
const challengedb = context.keys().map((key) => {
  const data = context(key);
  return {
    uid: data.uid,
    title: data.title,
    module: data.module,
    data,
  };
});

const Home = () => {
  return (
    <div className="container">
      <div className="navCard">
        {challengedb.map(({ uid, title, module }) => (
          <Link key={uid} to={`/${uid}`} className="navCard_card">
            <h1>{uid}</h1>
            <h2>{title}</h2>
            <h3>{module}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
