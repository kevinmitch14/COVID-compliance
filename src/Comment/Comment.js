import React, { useEffect, useState } from 'react'
import StarRateIcon from '@material-ui/icons/StarRate';
import './Comment.css'

const Comment = ({ comment, cleanRating, staffRating, adheranceRating, extraData }) => {

    // const [showComment, setShowComment] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [showComment, setShowComment] = useState(false)
    console.log(width)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleResize);
        console.log("Running")
        if (width < 500) {
            setShowComment(true)
        }
        if (width > 500) {
            setShowComment(false)
        }
        return () => {
            window.removeEventListener("resize", handleResize)
        };
    }, [width])

    return (
        <>

            <button onClick={() => setShowComment(!showComment)}>i</button>
            {showComment ?
                [
                    <div className="Comment" key={extraData.reference}>
                        <span>Cleanliness: {cleanRating}<StarRateIcon /></span>
                        <span>Adherance : {adheranceRating}<StarRateIcon /></span>
                        <span>Staff: {staffRating}<StarRateIcon /></span>
                    </div>,

                    <div className="extraData" key={extraData.name}>
                        {extraData.opening_hours && extraData.opening_hours.periods.map((item, index) => {
                            let today = new Date()
                            if ((today.getDay() === index) && (item.close.day === index)) {
                                return (
                                    item.close.day === index && (today.getHours() >= item.open.time / 100 && today.getHours() <= item.close.time / 100)
                                        ? <span key={extraData.name} style={{ color: 'green' }}>Open</span> : <span style={{ color: 'red' }}>Closed</span>
                                )
                            } else if (today.getDay() === index && item.close.day !== index) {
                                // Manipulating data to use in setHours()
                                let substring = item.close.time.slice(0, 1)
                                let nextDay = new Date()
                                nextDay.setDate(today.getDate() + 1)
                                nextDay.setHours(substring)
                                console.log(today)
                                console.log(nextDay)
                                return (
                                    today.getHours() >= item.open.time && today < nextDay ? <span key={extraData.name + "1"} style={{ color: 'green' }}>Open</span> : <span style={{ color: 'red' }}>Closed</span>
                                )
                            } return null;
                        })}

                        <a href={"tel:" + extraData.formatted_phone_number}><span>{extraData.formatted_phone_number}</span></a>
                        {extraData.website ? <a href={extraData.website} target="_blank" rel="noopener noreferrer">{extraData.website.length < 30 ? <span>{extraData.website}</span> : <span>Website</span>}</a> : null}
                    </div>,
                ]
                : null}
        </>
    )
}
export default Comment;