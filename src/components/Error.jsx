import React from 'react'
import './Error.css';

export default function Error(props) {
  return (
    <div>
      <div className='error-msg'>{props.showError}</div>
    </div>
  )
}
