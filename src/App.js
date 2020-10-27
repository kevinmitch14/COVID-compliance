import React, { useState, useEffect } from 'react';
import './App.css';
import Input from './Input/Input';
import Results from './Results/Results';
import db from './firebase';
import firebase from 'firebase'

// AIzaSyBhcUiOcSbio-KNInHy-n3sUoCFtjMyL1c

const App = () => {


  // When and Where
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');

  // Ratings
  const [adheranceRating, setAdheranceRating] = useState(0);
  const [cleanRating, setCleanRating] = useState(0);
  const [staffRating, setStaffRating] = useState(0);
  const [data, setData] = useState([]);

  const [userComment, setInput] = useState([]);
  const [extraMenu, setMenu] = useState(false);

  // When app loads, we need to listen to DB and fetch new todos as they get added/removed
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
