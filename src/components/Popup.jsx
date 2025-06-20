
import { useEffect, useState } from 'react'
import './Popup.scss'

const Popup = (props) => {
    const [open, setOpen] = useState(false)

    useEffect(()=>{
        if(props.content) setOpen(true)
        else setOpen(false)
    }, [props.content])

    return (
        <div className={'Popup' + (open ? " open" : "")}>
            <div className="PopupContent">
                {props.content && props.content}
            </div>
        </div>
    )
}

export default Popup