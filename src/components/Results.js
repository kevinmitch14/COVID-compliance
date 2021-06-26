import Comment from '../components/Comment'
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

const Results = ({ placeData, loading }) => {

    const SVGstyle = { display: 'block', margin: 'auto', padding: '50px' }
    const chips = useSelector(state => state.chip)
    const [filtered, setFiltered] = useState([])

    const dict = {
        'Restaurants': ['restaurant', 'food'],
        'Hotels': 'lodging',
        'Landmarks': 'tourist_attraction',
        'Most Reviewed': 'reviewed',
        'Bars': 'bar',
        'Retail': ["furniture_store", "department_store", "supermarket"]
    }

    const chipRed = useRef(() => { })

    chipRed.current = () => {
        chips.activeCats.forEach((item) => {
            let placeType = dict[item]
            console.log(placeType)
            let filteredPlaces = placeData.filter((item) => placeType.includes(item.extraData.types[0]) || placeType.includes(item.extraData.types[1]))

            setFiltered(prevState => [...prevState, ...filteredPlaces])
        })
    }

    useEffect(() => {
        chipRed.current()
        return () => {
            setFiltered([])
        }
    }, [chips.activeCats])

    const boilerPlate = (item, index) => (
        <div className='result-card' key={index}>

            <div className="name">
                <p id="card-name">{item.place}</p>
                <p id="card-county">{item.county}</p>
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
        </div >
    )


    const resultsList = chips.activeCats.includes("Most Reviewed") ? placeData.sort((a, b) => (a.average < b.average) ? 1 : -1).sort((a, b) => (a.count < b.count) ? 1 : -1).map((item, index) => {
        return (
            boilerPlate(item, index)
        )
    })
        :
        chips.activeCats.length !== 0 && !chips.activeCats.includes("Most Reviewed") ?
            filtered.sort((a, b) => (a.average < b.average) ? 1 : -1)
                .map((item, index) => {
                    return (
                        boilerPlate(item, index)
                    )
                })
            :
            chips.activeCats.length === 0 ? placeData.sort((a, b) => (a.average < b.average) ? 1 : -1)
                .map((item, index) => {
                    return (
                        boilerPlate(item, index)
                    )
                }) : null


    return (
        <div className="container">
            {loading && <CircularProgress style={SVGstyle} />}
            {placeData ? resultsList : <p id="empty-message">No entries yet!</p>}
        </div >
    )
}

export default Results;

