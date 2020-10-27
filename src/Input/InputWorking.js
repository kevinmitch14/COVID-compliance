import React, { useState } from 'react';
import './Input.css';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import moment from 'moment';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import Autocomplete from 'react-google-autocomplete';


const Input = (props) => {

    const [dateValidation, setDateValidation] = useState(true)

    return (
        <>
            <div className='Container' key={''}>

                <div className='Input' style={{ display: 'flex' }}>


                    <Autocomplete
                        apiKey={'AIzaSyBhcUiOcSbio-KNInHy-n3sUoCFtjMyL1c'}
                        style={{}}
                        placeholder={"Enter location"}
                        // onPlaceSelected={(place) => {
                        //     console.log(place);
                        // }}
                        onPlaceSelected={(place) => {
                            console.log(place.place_id);
                            const id = place.place_id
                            const proxyurl = "https://cors-anywhere.herokuapp.com/";
                            const url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + id + "&key=AIzaSyBhcUiOcSbio-KNInHy-n3sUoCFtjMyL1c"; // site that doesn’t send Access-Control-*
                            fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
                                .then(response => response.json())
                                .then(contents => contents.result)
                                .then((result) => props.onPlaceChange(result))
                                .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
                        }}
                        types={['establishment']}
                        componentRestrictions={{ country: "irl" }}
                    />

                    <input className="secondary" type="date"
                        onChange={props.onDateChange}
                        // onChange={(event) => setDate(event.target.value)}
                        onBlur={() => {
                            // moment(props.date).isAfter(moment().format("MMM Do YY")) &&
                            moment(props.date).isValid() ? setDateValidation(true) : setDateValidation(false)
                        }}
                    >
                    </input>
                </div>

                <div className='Ratings'>
                    <p>Cleanliness<Rating
                        style={{ padding: '10px' }}
                        name="simple-controlled2"
                        value={Number(props.ratings[1])}
                        onChange={props.onCleanChange}
                    /></p>

                    <p>Adherance<Rating
                        style={{ padding: '10px' }}
                        name="simple-controlled3"
                        value={Number(props.ratings[0])}
                        onChange={props.onAdheranceChange}
                    />
                    </p>

                    <p>Staff<Rating
                        style={{ padding: '10px' }}
                        name="simple-controlled1"
                        value={Number(props.ratings[2])}
                        onChange={props.onStaffChange}
                    />
                    </p>


                </div>


                <div className='test'>

                    <p onClick={props.menuHandler}>Additional Comments</p>
                    <ArrowDropDownIcon
                        fontSize="large"
                        color="primary"
                        onClick={props.menuHandler} />

                    <Button
                        style={{ width: '20%', margin: 'auto', position: 'relative' }}
                        className="jim"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            props.onUpload();
                            props.onClear();
                            // props.tester();
                        }}
                    >
                        Upload
                    </Button>

                </div>

                {dateValidation ? null : <p style={{ color: 'red' }}>Invalid date.</p>}

            </div>

            {
                props.menu ?

                    <div className="TextArea">
                        <textarea
                            onChange={props.commentHandler}></textarea>
                    </div>
                    : null
            }
        </>
    )
}

export default Input;