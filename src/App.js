import React, { useState, useEffect } from 'react';
import Input from './components/Input';
import Results from './components/Results';
import './App.css';
import db from './firebase';

const App = () => {

  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    db.collection('reviews').orderBy('average', 'desc').onSnapshot(snapshot => {
      setData(snapshot.docs.map(doc => doc.data()))
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