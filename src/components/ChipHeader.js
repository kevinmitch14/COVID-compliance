import React from 'react'
import ChipWrapper from '../components/ChipWrapper'

const ChipHeader = () => {
    return (
        <div className='ChipHeader'>
            <ChipWrapper label="Restaurants" id={0} />
            <ChipWrapper label="Bars" id={4} />
            <ChipWrapper label="Most Reviewed" id={3} />
            <ChipWrapper label="Landmarks" id={2} />
            <ChipWrapper label="Hotels" id={1} />
            <ChipWrapper label="Retail" id={5} />
        </div>
    )
}

export default ChipHeader
