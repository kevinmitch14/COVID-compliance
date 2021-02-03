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


  return (
    <div className="App">
      <Input placeData={placeData} loading={loading} />
      <Results placeData={placeData} loading={loading} />
    </div>
  );
}

export default App;