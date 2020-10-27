import React, { useState } from 'react';
import './Results.css';
import Comment from '../Comment/Comment';
import StarRateIcon from '@material-ui/icons/StarRate';



const Results = ({ data }) => {

    const [filterInput, setFilterInput] = useState('')


    console.log(data.filter(item => item.place.startsWith(filterInput.toUpperCase())));


    // const results = data.map((item, index) => {
    const results = data.filter(item => item.place.startsWith(filterInput.toUpperCase())).map((item, index) => {
        // if (item.place !== '' && item.date !== '' && item.accumRating !== '')

        return (

            <div className='Results' key={item.extraData.reference}>
                <div className='ResultsInner' key={index}>


                    {/* <span>{item.place}</span> */}
                    {item.place.length > 15 ? <span style={{ fontSize: 'small' }}>{item.place}</span> : <span>{item.place}</span>}

                    <span style={{ display: 'flex', alignItems: 'center' }}>{Math.round(((item.accumRating / item.count) / 3) * 10) / 10}<StarRateIcon /></span>

                    <span>{item.count}</span>

                    <Comment

                        // Math.round(num * 100) / 100
                        // comment={item.userComment}
                        cleanRating={Math.round(item.cleanRating / item.count * 10) / 10}
                        staffRating={Math.round(item.staffRating / item.count * 10) / 10}
                        adheranceRating={Math.round(item.adheranceRating / item.count * 10) / 10}
                        extraData={item.extraData} />
                </div>
            </div>

        )
    })

    return (
        <div>
            <div className='filterArea'>

                <input id="filter"
                    value={filterInput}
                    type="text"
                    style={{ height: '50px' }}
                    placeholder="Filter by name"
                    onChange={event => setFilterInput(event.target.value)}>
                </input>
            </div>


            <div className='Header'>
                <span>Place</span>
                <span>Rating</span>
                <span># of reviews</span>
                <span></span>
            </div>

            {results}

            {/* onChange render the filter list??? */}


        </div >
    )
}


export default Results;

