import React, { useRef } from 'react'
import GridLayout from './components/GridLayout'

const App = () => {
    const buttonsRef = useRef()

    return (
        <>
            <div style={{textAlign: 'center', backgroundColor:'blue'}}>NavBar goes here</div>
            <button onClick={() => buttonsRef.current.resetGrid()}>Reset Layout</button>
            <form className='AddElementDropDownForm'>
                <select id="AddElementTypeSelection" className='AddElementTypeOption' >
                    <option value={'Something'}>1</option>
                    <option value={'Something Else'}>Two</option>
                    <option value={'Something third'}>Three</option>
                </select>
            </form>
            <button onClick={() => buttonsRef.current.addGridItem(document.getElementById("AddElementTypeSelection").value)}>Add Grid Element</button>
            <GridLayout ref={buttonsRef} />
            <hr color="black" />
        </>
    )
}

export default App