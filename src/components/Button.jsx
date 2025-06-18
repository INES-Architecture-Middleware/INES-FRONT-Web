import "./Button.scss"
import Body from './Body'
import { useIntl } from "react-intl"
import { useState } from "react"

const Button = (props) => {
    const intl = useIntl()

    const [hover, setHover] = useState(false)

    const handleClick = (e) => {
        if(props.onClick && !props.disabled) props.onClick()
    }

    let cn = "Button" +
        (props.type === "secondary" ? " secondary" : (props.type === "tercery" ? " tercery" : " primary")) +
        (props.justifyLeft ? " justifyLeft" : "") +
        (props.iconButton ? " iconButton" : "") +
        (props.disabled ? " disabled" : "") +
        (props.size ? (" " + props.size) : " medium")

    if(!props.onClick || (!props.label && !props.icon)) return null

    return (
        <div className={cn + (hover ? " hover" : "")} onClick={handleClick} onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>
            {props.icon && <div className="ButtonIcon"><img src={props.icon} alt="Icone du bouton" /></div> }
            {props.label && <Body underline={props.type === "tercery"} hover={props.type === 'tercery'} primary={((props.type === "primary" || !props.type) && !hover) || props.type === "tercery"} center={props.type !== "tercery"} white={((props.type === "primary" || !props.type) && hover)}>{intl.formatMessage({id:props.label})}</Body>}
        </div>
    )
}

export default Button