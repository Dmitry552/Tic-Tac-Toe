
import { useEffect, useState } from 'react';
import './Allert.scss';

export const Allert = (props: {message: string, colorChange?: string}): JSX.Element => {
  const [shown, setShown] = useState<boolean>(true);

  const style: React.CSSProperties = {
    color: props.colorChange,
    border: `1px solid ${props.colorChange}`,
    boxShadow: `0 0 20px 0px ${props.colorChange}`
  }

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
        <div className="allert_message" style = {props.colorChange ? style : undefined}>
          <p>{props.message}</p> 
        </div>
      }
    </div>
  )
}