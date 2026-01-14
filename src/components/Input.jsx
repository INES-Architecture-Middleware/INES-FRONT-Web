import React, { useContext } from 'react'
import "./Input.scss"
import { useIntl } from 'react-intl'
import SearchIcon from './../assets/search.svg'
import SearcWhitehIcon from './../assets/search-white.svg'
import Body from './Body'

const Input = (props) => {
    const intl = useIntl()

    let classNames = "Input" +
        (props.error ? ' error' : "")

    const handleValueChange = (e) => {
        props.onChange(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && props.onEnterPress){
            props.onEnterPress()
        }
    }

    return (
        <div className={'InputContainer' + (props.disabled ? " disabled" : "")}>
            {props.title && <div className="InputTitle"><Body error={props.error ? intl.formatMessage({id:props.error}) : null} disabled={props.disabled}>{intl.formatMessage({id:props.title})}</Body></div> }
            {props.type === "textarea" ? 
                <textarea disabled={props.disabled} className={classNames} type={props.type ? props.type : 'text'} value={props.value} onKeyDown={handleKeyDown} onChange={handleValueChange} required={props.required} placeholder={props.placeholder ? intl.formatMessage({id:props.placeholder}) : ""}/>
                :
                <div className={"InputContent" + (props.type === "search" ? " search" : "") + (props.error ? " error" : "")}>
                    <input disabled={props.disabled} className={classNames} type={props.type ? props.type : 'text'} value={props.value} onKeyDown={handleKeyDown} onChange={handleValueChange} required={props.required} placeholder={props.placeholder ? intl.formatMessage({id:props.placeholder}) : ""}/>
                    {props.type === "search" && <div className="SearchIcon"><img src={SearcWhitehIcon} alt="Search"/></div>}
                </div>
            }
        </div>
    )
}

export default Input