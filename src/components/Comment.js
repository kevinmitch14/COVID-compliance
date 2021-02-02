import { useState } from 'react'

const Comment = ({ comment, cleanRating, staffRating, adheranceRating, extraData }) => {

    const [showComment, setShowComment] = useState(false)

    return (
        <>
            <button id='comment-button' onClick={() => setShowComment(!showComment)}>i</button>
            {showComment ?
                <>
                    <div className='comment-container'>
                        <div className="comment-ratings" key={extraData.reference}>
                            <span><b>Cleanliness:</b> {cleanRating}</span>
                            <span><b>Adherance:</b> {adheranceRating}</span>
                            <span><b>Staff:</b> {staffRating}</span>
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
                </>
                : null}
        </>
    )
}
export default Comment;