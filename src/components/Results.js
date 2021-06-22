import Comment from '../components/Comment'
import { CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';

const Results = ({ placeData, loading, actives }) => {

    const SVGstyle = { display: 'block', margin: 'auto', padding: '50px' }
    // placeData.forEach(element => {
    //     console.log(element.extraData.types[0])
    // });
    const [activeCats, setActiveCats] = useState([])


    useEffect(() => {
        let newArr = [...activeCats]
        actives.forEach((item) => item.active === true && !activeCats.includes(item.google_name) ? setActiveCats(prevState => [...prevState, item.google_name]) : console.log("No active"))
        actives.forEach((item) => {
            if (item.active === false && activeCats.includes(item.category)) {
                let deletedChip = item.category
                newArr.includes(deletedChip) ? newArr = newArr.filter((item) => item !== deletedChip) : console.log(100)
                setActiveCats(newArr)
            }
        })

    }, [activeCats, actives])

    // placeData.forEach((item) => console.log(item.extraData.types))
    const [filterItems, setFilterItems] = useState([])
    console.log(filterItems)
    console.log(activeCats)


    useEffect(() => {
        let newArr = []
        activeCats.forEach(element => {
            let p = element
            console.log(element)
            let x = placeData.filter((element) => element.extraData.types[0] === p)
            setFilterItems((prevState) => [...x])
            console.log(newArr)

        });
    }, [activeCats, placeData])


    console.log(filterItems)


    const resultsList = placeData.map((item, index) => {
        return (
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
            </div>
        )
    })
    // console.log(placeData)

    // const typeFilter = placeData.filter((item) => item.extraData.types[0] === 'bar')
    // console.log(typeFilter)

    return (
        <div className="container">
            {loading && <CircularProgress style={SVGstyle} />}
            {placeData ? resultsList : <p id="empty-message">No entries yet!</p>}
        </div >
    )
}

export default Results;

