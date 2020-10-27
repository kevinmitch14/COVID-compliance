import React, { useState, useEffect } from 'react';
import './App.css';
import Input from './Input/Input';
import Results from './Results/Results';
import db from './firebase';

const App = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    // This fires when app loads
    db.collection('reviews').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setData(snapshot.docs.map(doc => doc.data()))
    })
  }, [])

  // Handling input





  return (
    <div className="App">
      <Input

      />

      <Results
        data={data}
      />


    </div>
  );
}

export default App;
