import React, { useRef } from 'react'
import GridLayout from './components/GridLayout'

const App = () => {
    const buttonsRef = useRef()

    return (
        <>
            <div style={{textAlign: 'center', backgroundColor:'blue'}}>NavBar goes here</div>
            <button onClick={() => buttonsRef.current.resetGrid()}>Reset Layout</button>
            <button onClick={() => buttonsRef.current.addGridItem()}>Add Grid Element</button>
            <button onClick={() => console.log('Removing item')}>Remove Grid Element</button>
            <GridLayout ref={buttonsRef} />
            <hr color="black" />
        </>
    )
}

export default App