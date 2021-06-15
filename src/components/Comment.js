import { useState } from 'react'
// This is DEV
const Comment = ({ cleanRating, staffRating, adheranceRating, extraData }) => {

    const [showComment, setShowComment] = useState(false)
    const rankingStyles = { color: cleanRating === 5 || cleanRating === 4 ? 'green' : cleanRating === 3 ? 'orange' : 'red' }

    return (
        <>
            <button id='comment-button' onClick={() => setShowComment(!showComment)}>Info</button>
            {showComment ?

                <div className='comment-container' key={extraData.reference}>
                    <div className="comment-ratings" key={extraData.reference}>
                        <span>Cleanliness: <span style={rankingStyles}>{cleanRating}</span></span>
                        <span>Adherance: <span style={rankingStyles}>{adheranceRating}</span></span>
                        <span>Staff: <span style={rankingStyles}>{staffRating}</span></span>
                    </div>

                    <div className="comment-extra" key={extraData.name}>
                        {extraData.opening_hours && extraData.opening_hours.periods.map((item, index) => {
                            let today = new Date()
                            if ((today.getDay() === index) && (item.close.day === index)) {
                                return (
                                    item.close.day === index && (today.getHours() >= item.open.time / 100 && today.getHours() <= item.close.time / 100)
                                        ? <span key={extraData.name} style={{ color: 'green' }}>Open</span> : <span style={{ color: 'red' }}>Closed</span>
                                )
                            } else if (today.getDay() === index && item.close.day !== index) {
                                let substring = item.close.time.slice(0, 1)
                                let nextDay = new Date()
                                nextDay.setDate(today.getDate() + 1)
                                nextDay.setHours(substring)
                                return (
                                    today.getHours() >= item.open.time && today < nextDay ? <span key={extraData.name + "1"} style={{ color: 'green' }}>Open</span> : <span style={{ color: 'red' }}>Closed</span>
                                )
                            } return null;
                        })}

                        <a href={"tel:" + extraData.formatted_phone_number}><span>{extraData.formatted_phone_number}</span></a>
                        {extraData.website ? <a href={extraData.website} target="_blank" rel="noopener noreferrer">{extraData.website.length < 30 ? <span>{extraData.website}</span> : <span>Website</span>}</a> : null}
                    </div>
                </div>

                : null}
        </>
    )
}
export default Comment;