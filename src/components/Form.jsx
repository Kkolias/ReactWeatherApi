import './Form.css';
import React from 'react';
import { useState } from 'react';


export default function Form(props) {
    const [ input, setInput ] = useState('');

    const handleChange = (e) => {
        setInput(e.target.value);
        // console.log(input)
    }
    const handleSubmit = (event) => {
        // console.log(input)
        props.onSubmit(input);
        event.preventDefault();
    }

  return (
    <div>
        
        <form onSubmit={handleSubmit}>
        <div className="input-group">
            <input title="zip code or city" type="text" className="input-field" onChange={handleChange} placeholder="Search for city" aria-label="" aria-describedby="basic-addon1"/>
            <div className="input-group-append">
                <button className="btn btn-success" type="submit">Search</button>
            </div>
            
        </div>
        </form>
    </div>
  )
}
