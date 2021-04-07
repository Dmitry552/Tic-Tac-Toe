
import { useEffect, useState } from 'react';
import './Allert.scss';

export const Allert = (props: {message: string, colorChange?: 'red' | 'green' | 'yellow'}): JSX.Element => {
  const [shown, setShown] = useState<boolean>(true);

  useEffect(()=> {
    setTimeout(()=> {
      setShown(false)
    }, 3000)
    if (props.message) {
      setShown(true)
    }
  }, [props.message])

  return (
    <div className="allert">
      {shown && 
        <div className={`allert_message ${props.colorChange}`}>
          <p>{props.message}</p> 
        </div>
      }
    </div>
  )
}