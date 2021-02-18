import Input from './components/Input';
import Results from './components/Results';
import './App.css';
import db from './firebase';
import { useEffect, useState } from 'react';

const App = () => {
  const [placeData, setData] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    db.collection('reviews').orderBy('average', 'desc').onSnapshot(snapshot => {
      setData(snapshot.docs.map(doc => doc.data()))
      setloading(false)
    })
  }, [loading])


  useEffect(() => {
    const proxyurl = "https://young-basin-20621.herokuapp.com/";
    const url = "https://pokeapi.co/api/v2/pokemon/ditto"

    const interval = setInterval(() => {
      console.log('This will run every 30 mins!');
      fetch(proxyurl + url)
        .then(res => res.json())
        .then(r => console.log(r))
    }, 1800000);
    return () => clearInterval(interval);
  }, []);





  return (
    <div className="App">
      <Input placeData={placeData} loading={loading} />
      <Results placeData={placeData} loading={loading} />
    </div>
  );
}

export default App;