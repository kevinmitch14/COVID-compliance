import React, { useState, useEffect } from 'react';
import Input from './Input/Input';
import Results from './Results/Results';
import './App.css';
import db from './firebase';

const App = () => {

  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true)

  useEffect(() => {
    // This fires when app loads
    db.collection('reviews').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setData(snapshot.docs.map(doc => doc.data()))
      console.log(loading)
      setloading(false)
    })

  }, [loading])

  return (
    <div className="App" >
      <Input />

      <Results
        data={data}
        loading={loading}
      />

    </div>
  );
}

export default App;