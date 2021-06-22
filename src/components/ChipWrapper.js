import React, { useState } from 'react'
import Chip from '@material-ui/core/Chip';

const ChipWrapper = ({ chipActiveHandler, chipDeleteHandler, id, label }) => {

    const [chipActive, setChipActive] = useState(false)


    const wrappedChip =
        <Chip

            label={label}
            clickable
            onClick={(e) => { setChipActive(!chipActive); chipActiveHandler(id) }}
            style={chipActive ? { backgroundColor: '#35b999' } : { backgroundColor: '#04363d', color: 'white', border: '1px solid white' }}
            onDelete={(e) => { setChipActive(false); chipDeleteHandler(id) }}
            deleteIcon={'X'}

        />
    return (
        <div>
            {wrappedChip}
        </div>
    )
}

export default ChipWrapper
