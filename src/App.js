import Input from './components/Input';
import Results from './components/Results';
import './App.css';
import db from './firebase';
import { useEffect, useState } from 'react';
import ChipHeader from './components/ChipHeader';

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
    const url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJefl6pGoJZ0gR8J7k13w4xzk&key=AIzaSyBhcUiOcSbio-KNInHy-n3sUoCFtjMyL1c";

    const fetchData = async () => {
      await fetch(proxyurl + url)
    }
    fetchData()
  }, []);




  return (
    <div className="App">
      <Input placeData={placeData} loading={loading} />
      <ChipHeader />
      <Results placeData={placeData} loading={loading} />
    </div>
  );
}

export default App;