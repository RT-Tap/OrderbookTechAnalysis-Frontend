import React, { forwardRef, useRef } from 'react'
import ReactiveGridItemSizeWithForwardRef from './GridLayoutWithCustomComponentWithForwardRef'

const FuncWrapperComponentForRefrence = () => {
    const parentComponentRef = useRef()

    return (
        <>
        <button onClick={() => parentComponentRef.current.resetGrid()}>Reset Layout</button>
        <button onClick={() => parentComponentRef.current.addGridItem()}>Add Grid Element</button>
        <button onClick={() => console.log('Removing item')}>Remove Grid Element</button>
        <ReactiveGridItemSizeWithForwardRef ref={parentComponentRef} />
        </>
    )
}

export default FuncWrapperComponentForRefrence