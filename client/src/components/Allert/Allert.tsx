
import { useEffect, useState } from 'react';
import './Allert.scss';

export const Allert = ({message}: {message: string}): JSX.Element => {
  const [mess, setMessage] = useState(message);

  useEffect(()=>{
    setTimeout(()=>{setMessage('')}, 3000)
  })

  return (
    <div className="allert">
      {mess && 
        <div className="allert_message">
          <p>{mess}</p> 
        </div>
      }
    </div>
  )
}