import React, { useState } from 'react'
import Chip from '@material-ui/core/Chip';
import { onRemove, onSelect } from '../slices/chips';
import { useDispatch } from 'react-redux';

const ChipWrapper = ({ chipActiveHandler, chipDeleteHandler, id, label }) => {

    const [chipActive, setChipActive] = useState(false)

    const dispatch = useDispatch()

    return (
        <div>
            <Chip
                label={label}
                clickable
                onClick={() => { dispatch(onSelect(label)); setChipActive(true) }}
                style={chipActive ? { fontSize: '16px', backgroundColor: '#35b999' } : { fontSize: '16px', backgroundColor: '#04363d', color: 'white', border: '1px solid white' }}
                onDelete={() => { dispatch(onRemove(label)); setChipActive(false) }}
                deleteIcon={'X'}
                size={'medium'}
            />
        </div>
    )
}

export default ChipWrapper
