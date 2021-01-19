import React from 'react';
// import './Results.css'
import { CircularProgress } from '@material-ui/core';
import Comment from '../Comment/Comment'

const Results = ({ data, loading }) => {

    // const [filterInput, setFilterInput] = useState('')
    // const [countyInput, setCountyInput] = useState('')

    // const counties = ['Antrim', 'Armagh', 'Carlow', 'Cavan', 'Clare', 'Cork', 'Donegal', 'Down', 'Dublin',
    //     'Fermanagh', 'Galway', 'Kerry', 'Kildare', 'Kilkenny', 'Laois', 'Leitrim', 'Limerick', 'Longford', 'Louth', 'Mayo', 'Meath',
    //     'Monaghan', 'Offaly', 'Roscommon', 'Sligo', 'Tipperary', 'Tyrone', 'Waterford', 'Westmeath', 'Wexford', 'Wicklow']

    // const dropDown =
    //     <select name="counties" onChange={(event) => setCountyInput(event.target.value)} style={{ height: '54px', marginLeft: '10%', borderRadius: '5px', border: '1px solid black' }}>
    //         <option value="">All Counties</option>
    //         {counties.map((item) => {
    //             return (
    //                 <option value={item} key={item}>
    //                     {item}
    //                 </option>
    //             )
    //         })}

    //     </select>

    // const j = []

    // console.log(j)
    // let x = null
    // countyInput === "" ? x = data : x = j


    // const results = x.filter(item => item.place.startsWith(filterInput.toUpperCase())).map((item, index) => {
    const results = data.map((item, index) => {
        return (
            <div className='result-card' key={index}>

                <div className="name">
                    <p id="card-name">{item.place}</p>
                    <p id="card-county">County {item.county}</p>
                </div>

                <div className="rating">
                    <span id="first">{(Math.floor(Math.round(((item.accumRating / 3) / item.count) * 10) / 10))}.</span><span id="last">{Math.round(((Math.round(((item.accumRating / 3) / item.count) * 10) / 10) - Math.floor(Math.round(((item.accumRating / 3) / item.count) * 10) / 10).toFixed()) * 10)}</span>
                </div>

                <div className="reviews">
                    {item.count > 1 ? <span>{item.count} reviews</span> : <span>{item.count} review</span>}
                </div>

                <Comment
                    cleanRating={Math.round(item.cleanRating / item.count * 10) / 10}
                    staffRating={Math.round(item.staffRating / item.count * 10) / 10}
                    adheranceRating={Math.round(item.adheranceRating / item.count * 10) / 10}
                    extraData={item.extraData}
                />
            </div>
        )
    })

    return (
        <div className="container">
            {loading ? <CircularProgress style={{ display: 'block', margin: 'auto', padding: '50px' }} /> :
                data.length < 1 ?
                    <p style={{ padding: '50px', fontSize: 'large' }}>No entries yet!</p>
                    : results}
        </div >
    )
}

export default Results;

