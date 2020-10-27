import React, { useState } from 'react'
import StarRateIcon from '@material-ui/icons/StarRate';
import './Comment.css'



const Comment = ({ comment, cleanRating, staffRating, adheranceRating, extraData }) => {

    const [showComment, setShowComment] = useState(false)


    return (
        <>
            <button onClick={() => setShowComment(!showComment)}>i</button>
            {/* <div style={{ display: 'flex', flexBasis: '100%' }}></div> */}
            {showComment ?
                // <div className='Info'>
                [<div className="Comment" key={extraData.reference}>
                    {/* {comment != "" ? <span>Additional Comments: {comment}</span> : null} */}
                    <span>Cleanliness: {cleanRating}<StarRateIcon /></span>
                    <span>Adherance : {adheranceRating}<StarRateIcon /></span>
                    <span>Staff: {staffRating}<StarRateIcon /></span>
                </div>,

                < div className="extraData" key={extraData.name}>
                    {extraData.opening_hours && extraData.opening_hours.periods.map((item, index) => {
                        let today = new Date()
                        if ((today.getDay() === index) && (item.close.day === index)) {
                            return (
                                item.close.day === index && (today.getHours() >= item.open.time / 100 && today.getHours() <= item.close.time / 100) ? <span key={extraData.name} style={{ color: 'green' }}>Open</span> : <span style={{ color: 'red' }}>Closed</span>
                            )
                        }

                        else if (today.getDay() === index && item.close.day !== index) {
                            // Manipulating data to use in setHours()
                            let substring = item.close.time.slice(0, 1)
                            let nextDay = new Date()
                            nextDay.setDate(today.getDate() + 1)
                            nextDay.setHours(substring)
                            console.log(nextDay.getDay() + " " + nextDay.getHours())
                            console.log(today.getDay() + " " + today.getHours())


                            return (
                                today < nextDay ? <span key={extraData.name + "1"} style={{ color: 'green' }}>Open</span> : <span style={{ color: 'red' }}>Closed</span>
                            )


                        }



                        return null;
                    })}

                    {/* {extraData.opening_hours ? extraData.opening_hours.open_now ? <span style={{ color: 'green' }}>Open</span> : <span style={{ color: 'red' }}>Closed</span> : null} */}
                    <a href={"tel:" + extraData.formatted_phone_number}><span>{extraData.formatted_phone_number}</span></a>
                    {extraData.website ? <a href={extraData.website} target="_blank" rel="noopener noreferrer">{extraData.website.length < 30 ? <span>{extraData.website}</span> : <span>Website</span>}</a> : null}
                </div>,
                ]
                : null}

        </>
    )
}

export default Comment;