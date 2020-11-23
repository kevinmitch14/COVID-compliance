import React, { useEffect, useState } from 'react';
import './Results.css';
import Comment from '../Comment/Comment';
import StarRateIcon from '@material-ui/icons/StarRate';
import { CircularProgress } from '@material-ui/core';

const Results = ({ data, loading }) => {

    const [filterInput, setFilterInput] = useState('')
    const [countyInput, setCountyInput] = useState('')

    // console.log(data.filter(item => item.place.startsWith(filterInput.toUpperCase())));

    const counties = ['Antrim', 'Armagh', 'Carlow', 'Cavan', 'Clare', 'Cork', 'Donegal', 'Down', 'Dublin',
        'Fermanagh', 'Galway', 'Kerry', 'Kildare', 'Kilkenny', 'Laois', 'Leitrim', 'Limerick', 'Longford', 'Louth', 'Mayo', 'Meath',
        'Monaghan', 'Offaly', 'Roscommon', 'Sligo', 'Tipperary', 'Tyrone', 'Waterford', 'Westmeath', 'Wexford', 'Wicklow']

    const dropDown =
        <select name="counties" onChange={(event) => setCountyInput(event.target.value)} style={{ height: '54px', marginLeft: '10%', borderRadius: '5px', border: '1px solid black' }}>
            {/* <select name="counties" onChange={(event) => console.log(event.target.value)}> */}
            <option value="">All Counties</option>
            {counties.map((item) => {
                return (
                    <option value={item} key={item}>
                        {item}
                    </option>
                )
            })}

        </select>

    const j = []


    data.map((item) => {
        item.extraData.address_components.map((item2) => {
            if (item2.types.includes("administrative_area_level_1")) {
                let countyName = item2.long_name.split(" ")[1]
                if (countyName === countyInput) {
                    console.log("Match")
                    j.push(item)
                    console.log(j)
                }
            }
        })
    })
    let x = null
    countyInput === "" ? x = data : x = j


    // const results = data.map((item, index) => {
    const results = x.filter(item => item.place.startsWith(filterInput.toUpperCase())).map((item, index) => {
        // if (item.place !== '' && item.date !== '' && item.accumRating !== '')

        return (

            < div className='Results' key={item.extraData.reference} >
                <div className='ResultsInner' key={index}>
                    {item.place.length > 10 ? <span style={{ fontSize: "small" }}>{item.place}</span> : <span>{item.place}</span>}

                    <span style={{ display: 'flex', alignItems: 'center' }}>{Math.round(((item.accumRating / item.count) / 3) * 10) / 10}<StarRateIcon /></span>

                    <span>{item.count}</span>

                    <Comment
                        cleanRating={Math.round(item.cleanRating / item.count * 10) / 10}
                        staffRating={Math.round(item.staffRating / item.count * 10) / 10}
                        adheranceRating={Math.round(item.adheranceRating / item.count * 10) / 10}
                        extraData={item.extraData}
                    />

                </div>
            </div >

        )
    })

    return (
        <div>
            <div className='filterArea'>

                <input id="filter"
                    value={filterInput}
                    type="text"
                    style={{ height: '50px', padding: '0', borderRadius: '5px', border: '1px solid black' }}
                    placeholder="Search"
                    onChange={event => setFilterInput(event.target.value)}>
                </input>
                {dropDown}
            </div>

            <div className='Header'>
                <span>Place</span>
                <span>Rating</span>
                <span>Reviews</span>
                <span></span>
            </div>

            {loading ? <CircularProgress style={{ display: 'block', margin: 'auto', padding: '50px' }} /> :
                x.length < 1 ?
                    <p style={{ padding: '50px', fontSize: 'large' }}>No entries yet in {countyInput}!</p>
                    : results}
        </div >
    )
}


export default Results;

