import Input from './components/Input';
import Results from './components/Results';
import './App.css';
import db from './firebase';
import { useEffect, useState } from 'react';
import ChipWrapper from './components/ChipWrapper';

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



  const [actives, setActives] = useState([
    { id: 0, category: "Restaurants", active: false, google_name: 'rest' },
    { id: 1, category: "Hotel", active: false, google_name: 'lodging' },
    { id: 2, category: "Landmarks", active: false, google_name: 'landmark' },
    { id: 3, category: "Most Reviewed", active: false, google_name: 'reviewed' },
    { id: 4, category: "Bars", active: false, google_name: 'bar' },
    { id: 5, category: "Retail", active: false, google_name: 'retail' }
  ])

  const chipActiveHandler = (id) => {
    let arr = [...actives]
    arr[id]['active'] = true
    setActives(arr)
  }


  const chipDeleteHandler = (id) => {
    let arr = [...actives]
    arr[id]['active'] = false
    setActives(arr)
  }


  return (
    <div className="App">
      <Input placeData={placeData} loading={loading} />


      <div style={{ display: 'flex', justifyContent: 'center', padding: '1.5em 4em', paddingBottom: '0em', gridTemplateColumns: '1fr 1fr 1fr', columnGap: '2em', rowGap: '1em' }}>
        <ChipWrapper label="Restaurants" chipActiveHandler={chipActiveHandler} chipDeleteHandler={chipDeleteHandler} id={0} />
        <ChipWrapper label="Hotels" chipActiveHandler={chipActiveHandler} chipDeleteHandler={chipDeleteHandler} id={1} />
        <ChipWrapper label="Landmarks" chipActiveHandler={chipActiveHandler} chipDeleteHandler={chipDeleteHandler} id={2} />
        <ChipWrapper label="Most Reviewed" chipActiveHandler={chipActiveHandler} chipDeleteHandler={chipDeleteHandler} id={3} />
        <ChipWrapper label="Bars" chipActiveHandler={chipActiveHandler} chipDeleteHandler={chipDeleteHandler} id={4} />
        <ChipWrapper label="Retail" chipActiveHandler={chipActiveHandler} chipDeleteHandler={chipDeleteHandler} id={5} />
      </div>

      <Results placeData={placeData} loading={loading} actives={actives} />
    </div>
  );
}

export default App;