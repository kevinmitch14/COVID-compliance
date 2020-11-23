import React, { useState } from 'react';
import './Input.css';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Autocomplete from 'react-google-autocomplete';
import db from '../firebase';
import firebase from 'firebase'



const Input = (props) => {

    // const [dateValidation, setDateValidation] = useState(true)
    const [place, setPlace] = useState('');

    const [adheranceRating, setAdheranceRating] = useState(0);
    const [cleanRating, setCleanRating] = useState(0);
    const [staffRating, setStaffRating] = useState(0);

    const [userComment, setInput] = useState([]);
    const [extraMenu, setMenu] = useState(false);
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
        setMenu(false)
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



        if (place !== "" && cleanRating !== 0 && adheranceRating !== 0 && staffRating !== 0) {

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




    return (
        <>
            <div className='Container' key={''}>

                <div className='Input' style={{ display: 'flex' }}>


                    <Autocomplete
                        apiKey={'AIzaSyBhcUiOcSbio-KNInHy-n3sUoCFtjMyL1c'}
                        placeholder={"Enter location"}
                        onPlaceSelected={(place) => {
                            console.log(place)
                            const id = place.place_id
                            const proxyurl = "https://cors-anywhere.herokuapp.com/";
                            // const proxyurl = "";
                            const url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + id + "&key=AIzaSyBhcUiOcSbio-KNInHy-n3sUoCFtjMyL1c"; // site that doesn’t send Access-Control-*
                            fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
                                .then(response => response.json())
                                // .then(response => console.log(response))
                                .then(contents => contents.result)
                                .then((result) => setPlace(result))
                                .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
                        }}
                        types={['establishment']}
                        componentRestrictions={{ country: "irl" }}
                    />


                    {/* <input className="secondary" type="date"
                        id="l" placeholder="dd/mm/yyyy"
                        onChange={(event) => setDate(event.target.value)}
                        onBlur={() => {
                            // moment(props.date).isAfter(moment().format("MMM Do YY")) &&
                            moment(date).isValid() ? setDateValidation(true) : setDateValidation(false)
                        }}
                    >
                    </input> */}


                    {/* <TextField
                        id="date"
                        type="date"
                        // defaultValue="dd/mm/yyyy"
                        defaultValue={moment().format('L')}
                        variant="filled"
                        style={{
                            backgroundColor: 'white',
                            padding: '0',
                        }}
                    /> */}

                </div>

                <div className='Ratings'>
                    <p>Cleanliness<Rating
                        style={{ padding: '10px' }}
                        name="simple-controlled2"
                        value={Number(cleanRating)}
                        onChange={(event) => setCleanRating(event.target.value)}
                    /></p>

                    <p>Adherance<Rating
                        style={{ padding: '10px', fill: 'red' }}
                        name="simple-controlled3"
                        value={Number(adheranceRating)}
                        onChange={(event) => setAdheranceRating(event.target.value)}
                    />
                    </p>

                    <p>Staff<Rating
                        style={{ padding: '10px' }}
                        name="simple-controlled1"
                        value={Number(staffRating)}
                        onChange={(event) => setStaffRating(event.target.value)}
                    />
                    </p>


                </div>


                <div className='test'>

                    <p onClick={() => setMenu(!extraMenu)}>Additional Comments</p>
                    <ArrowDropDownIcon
                        fontSize="large"
                        onClick={() => setMenu(!extraMenu)} />

                    <Button
                        style={{ width: '20%', margin: 'auto', position: 'relative', backgroundColor: '#2e285a', textDecoration: 'none' }}
                        className="jim"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            onUpload();
                            handleReset();
                        }}
                    >
                        Upload
                    </Button>

                </div>

                {/* {dateValidation ? null : <p style={{ color: '#ff4d4d', fontWeight: 'bold', fontSize: 'large' }}>Please enter a valid date.</p>} */}

            </div>

            {
                extraMenu ?

                    <div className="TextArea">
                        <textarea
                            placeholder="Enter Comment here..."
                            onChange={(event) => setInput(event.target.value)}></textarea>
                    </div>
                    : null
            }
        </>
    )
}

export default Input;