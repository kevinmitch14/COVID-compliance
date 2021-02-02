import { CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Comment from '../components/Comment'
import db from '../firebase'

const Results = () => {
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        db.collection('reviews').orderBy('average', 'desc').onSnapshot(snapshot => {
            setData(snapshot.docs.map(doc => doc.data()))
            setloading(false)
        })
    }, [loading])

    const SVGstyle = { display: 'block', margin: 'auto', padding: '50px' }


    const resultsList = data.map((item, index) => {
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
            {loading ? <CircularProgress style={SVGstyle} /> :
                data.length < 1 ?
                    <p id="empty-message">No entries yet!</p>
                    : resultsList}
        </div >
    )
}

export default Results;

