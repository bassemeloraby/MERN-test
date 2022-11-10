import React from "react";
import {createRoot} from 'react-dom/client'

function App() {
    const animals = [{name:"bassm" ,species:"cat"},{name:"lolo" ,species:"dog"}]
    return (
        <div>
        <h1>hello</h1>
        <p>hay,hfhhd love</p>
        {animals.map(function(animal){
            return <AnimalCard name={animal.name} species={animal.species}/>
        })}
        </div>
    )
}

function AnimalCard(props){
  return <p> hi my name is {props.name} and kind is {props.species} </p>   
}

const root = createRoot(document.getElementById("App"))
root.render(<App />)