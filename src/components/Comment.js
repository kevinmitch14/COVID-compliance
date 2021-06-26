import { useState } from 'react'
// This is DEV
const Comment = ({ cleanRating, staffRating, adheranceRating, extraData }) => {

    const [showComment, setShowComment] = useState(false)

    return (
        <>
            <button id='comment-button' onClick={() => setShowComment(!showComment)}>Info</button>
            {showComment ?

                <div className='comment-container' key={extraData.reference}>
                    <div className="comment-ratings" key={extraData.reference}>
                        <span key='clean'>Cleanliness: <span key='clean' style={{ color: cleanRating >= 4 ? 'green' : cleanRating >= 3 && adheranceRating < 4 ? 'orange' : 'red' }}>{cleanRating}</span></span>
                        <span key='adherance'>Adherance: <span key='adherance' style={{ color: adheranceRating >= 4 ? 'green' : adheranceRating >= 3 && adheranceRating < 4 ? 'orange' : 'red' }}>{adheranceRating}</span></span>
                        <span key='staff'>Staff: <span key='staff' style={{ color: staffRating >= 4 ? 'green' : staffRating >= 3 && staffRating < 4 ? 'orange' : 'red' }}>{staffRating}</span></span>
                    </div>

                    <div className="comment-extra" key={extraData.name}>
                        {extraData.opening_hours && extraData.opening_hours.periods.map((item, index) => {
                            let today = new Date()
                            if ((today.getDay() === index) && (item.close.day === index)) {
                                return (
                                    item.close.day === index && (today.getHours() >= item.open.time / 100 && today.getHours() <= item.close.time / 100)
                                        ? <span key={extraData.name} style={{ color: 'green' }}>Open</span> : <span key={extraData.name} style={{ color: 'red' }}>Closed</span>
                                )
                            } else if (today.getDay() === index && item.close.day !== index) {
                                let substring = item.close.time.slice(0, 1)
                                let nextDay = new Date()
                                nextDay.setDate(today.getDate() + 1)
                                nextDay.setHours(substring)
                                return (
                                    today.getHours() >= item.open.time && today < nextDay ? <span key={extraData.name + "1"} style={{ color: 'green' }}>Open</span> : <span key={extraData.name} style={{ color: 'red' }}>Closed</span>
                                )
                            } return null;
                        })}

                        <a href={"tel:" + extraData.formatted_phone_number}><span key={extraData.name}>{extraData.formatted_phone_number}</span></a>
                        {extraData.website ? <a href={extraData.website} target="_blank" rel="noopener noreferrer">{extraData.website.length < 30 ? <span key={extraData.name}>{extraData.website}</span> : <span key={extraData.name}>Website</span>}</a> : null}
                    </div>
                </div>

                : null}
        </>
    )
}
export default Comment;