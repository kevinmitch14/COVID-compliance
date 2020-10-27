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
  const commentHandler = (event) => {
    setInput(event.target.value);
  }

  const menuHandler = () => {
    setMenu(!extraMenu)
  }

  const onPlaceChange = (result) => {
    setPlace(result);
  }

  const onDateChange = (event) => {
    event.preventDefault();
    setDate(event.target.value);
  }

  const onStaffChange = (event) => {
    event.preventDefault();
    setStaffRating(event.target.value);
  }

  const onCleanChange = (event) => {
    event.preventDefault();
    setCleanRating(event.target.value);
  }

  const onAdheranceChange = (event) => {
    event.preventDefault();
    setAdheranceRating(event.target.value);
  }

  // const onUpload = (event) => {
  async function onUpload() {

    const reviewsRef = db.collection('reviews')
    const snap = await reviewsRef.where('place', '==', place.name.toUpperCase()).get();
    if (!snap.empty) {
      // Logic to add to document
      snap.forEach(doc => {
        console.log(doc.id)
        console.log(doc.data().userComment);
        db.collection('reviews').doc(doc.id).update({
          count: parseInt(doc.data().count + 1),
          cleanRating: (parseInt(doc.data().cleanRating) + parseInt(cleanRating)),
          adheranceRating: parseInt(doc.data().adheranceRating) + parseInt(adheranceRating),
          staffRating: parseInt(doc.data().staffRating) + parseInt(staffRating),
          accumRating: Math.round(parseInt(doc.data().cleanRating) + parseInt(doc.data().staffRating) + parseInt(doc.data().adheranceRating) + (
            parseInt(cleanRating) + parseInt(staffRating) + parseInt(adheranceRating))),
          userComment: doc.data().userComment.concat(userComment)

        })
      })

      return;
    }



    if (place !== "" && date !== "" && cleanRating !== 0 && adheranceRating !== 0 && staffRating !== 0) {

      db.collection('reviews').add({
        place: place.name.toUpperCase(),
        date: date,
        cleanRating: parseInt(cleanRating),
        adheranceRating: parseInt(adheranceRating),
        staffRating: parseInt(staffRating),
        accumRating: (parseInt(cleanRating) + parseInt(adheranceRating) + parseInt(staffRating)),
        userComment: userComment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        viewComment: false,
        extraData: place,
        count: 1

      })
    }
  }

  const handleReset = () => {
    Array.from(document.querySelectorAll('input')).forEach(
      input => (input.value = "")
    );
    setPlace('')
    setDate('')
    setAdheranceRating(0)
    setCleanRating(0)
    setStaffRating(0)
    setInput('')
    setMenu(false)
    Array.from(document.querySelectorAll("textarea")).forEach(
      input => (input.value = "")
    );
  }


  return (
    <div className="App">
      <Input
      // onPlaceChange={onPlaceChange}
      // onDateChange={onDateChange}
      // onCleanChange={onCleanChange}
      // onStaffChange={onStaffChange}
      // onAdheranceChange={onAdheranceChange}

      // ratings={[adheranceRating, cleanRating, staffRating]}
      // place={place}
      // date={date}

      // onUpload={onUpload}
      // onClear={handleReset}
      // menuHandler={menuHandler}
      // commentHandler={commentHandler}

      // menu={extraMenu}

      />

      <Results
        data={data}
      />


    </div>
  );
}

export default App;
