import { useState, useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Autocomplete from 'react-google-autocomplete';
import db from '../firebase';
import firebase from 'firebase/app'
//Dev

const Input = ({ placeData }) => {

    const [place, setPlace] = useState('');
    const [county, setCounty] = useState('');
    const [rating, setRating] = useState('')
    const [rank, setRank] = useState('')


    useEffect(() => {
        setRank('')
        setRating('')
        placeData.forEach((item, index) => {
            if (place && place.name.toUpperCase() === item.place) {
                setRating(parseInt(item.average))
                setRank(parseInt(index))
            }
        })
    }, [place, placeData])

    const [adheranceRating, setAdheranceRating] = useState(0);
    const [cleanRating, setCleanRating] = useState(0);
    const [staffRating, setStaffRating] = useState(0);

    const [userComment, setInput] = useState([]);
    const [date, setDate] = useState('');


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
        Array.from(document.querySelectorAll("textarea")).forEach(
            input => (input.value = "")
        );
    }

    async function onUpload() {

        const reviewsRef = db.collection('reviews')
        const snap = await reviewsRef.where('place', '==', place.name.toUpperCase()).get();
        if (!snap.empty) {
            // Logic to add to document
            snap.forEach(doc => {
                console.log(doc.id)
                db.collection('reviews').doc(doc.id).update({
                    count: parseInt(doc.data().count + 1),
                    cleanRating: (parseInt(doc.data().cleanRating) + parseInt(cleanRating)),
                    adheranceRating: parseInt(doc.data().adheranceRating) + parseInt(adheranceRating),
                    staffRating: parseInt(doc.data().staffRating) + parseInt(staffRating),
                    accumRating: parseInt(doc.data().accumRating) + ((parseInt(cleanRating) + parseInt(adheranceRating) + parseInt(staffRating))),
                    userComment: doc.data().userComment.concat(userComment),
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
            })
            return;
        }



        if (place !== "" && cleanRating !== 0 && adheranceRating !== 0 && staffRating !== 0) {
            db.collection('reviews').add({
                place: place.name.toUpperCase(),
                date: date,
                cleanRating: parseInt(cleanRating),
                adheranceRating: parseInt(adheranceRating),
                staffRating: parseInt(staffRating),
                accumRating: ((parseInt(cleanRating) + parseInt(adheranceRating) + parseInt(staffRating))),
                userComment: userComment,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                viewComment: false,
                extraData: place,
                count: 1,
                county: county,
                average: ((parseInt(cleanRating) + parseInt(staffRating) + parseInt(adheranceRating)) / 3)
            })
        }
    }

    return (
        <div className='Input'>
            <div className="search">
                <Autocomplete
                    apiKey={'AIzaSyBhcUiOcSbio-KNInHy-n3sUoCFtjMyL1c'}
                    placeholder={"Search Hotels, Restaurants, Landmarks..."}
                    onPlaceSelected={(place) => {
                        console.log(place)
                        const id = place.place_id
                        const proxyurl = "https://cors-anywhere.herokuapp.com/";
                        // const proxyurl = "https://young-basin-20621.herokuapp.com/";
                        const url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + id + "&key=AIzaSyBhcUiOcSbio-KNInHy-n3sUoCFtjMyL1c"; // site that doesn’t send Access-Control-*
                        fetch(proxyurl + url)
                            .then(response => response.json())
                            .then(contents => contents.result)
                            .then((result) => setPlace(result))
                            .then(place.address_components.forEach((item2) => {
                                if (item2.types.includes("administrative_area_level_1")) {
                                    setCounty(item2.long_name.split(" ")[1])
                                }
                            }))
                            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
                    }}
                    types={['establishment']}
                    componentRestrictions={{ country: "irl" }}
                />

                <button onClick={() => {
                    onUpload();
                    handleReset();
                }}>Upload</button>
            </div>

            {place &&
                <div className="spotlight-info">

                    <div className="left">
                        {console.log(100)}
                        <h4 className="place-name">{place.name}</h4>
                        {rating ? <p>Rating:  <span className="place-rating">{(Math.round(((rating)) * 10) / 10)}</span></p> : <p>Rating: <span className="place-rating">N/A</span></p>}
                        {typeof rank === 'number' ? <p>Ranking:  <span className="place-ranking">#{rank + 1}</span></p> : <p>Ranking:  <span className="place-ranking">N/A</span></p>}
                    </div>

                    <div className="right">
                        <p>Cleanliness: <span><Rating
                            name="clean"
                            value={Number(cleanRating)}
                            onChange={(event) => setCleanRating(event.target.value)}
                            icon={<FiberManualRecordIcon />} /></span></p>

                        <p>Adherance: <span><Rating
                            name="adherance"
                            value={Number(adheranceRating)}
                            onChange={(event) => setAdheranceRating(event.target.value)}
                            icon={<FiberManualRecordIcon />} /></span></p>

                        <p>Staff: <span><Rating
                            name="staff"
                            value={Number(staffRating)}
                            onChange={(event) => setStaffRating(event.target.value)}
                            icon={<FiberManualRecordIcon />} /></span></p>
                    </div>
                </div>}
        </div>
    )
}

export default Input;