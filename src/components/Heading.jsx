import './Heading.scss'

const Heading = (props) => {

    let classNames = "Heading" + (' ' + (props.size || 'h1'))
                               + (' ' + (props.weight || 'bold')) 
                               + (props.uppercase ? " uppercase" : "")
                               + (props.center ? " center" : "")
                               + (props.white ? " white" : "")

    return (
        props.size === "h2" ? <h2 className={classNames}>{props.children}</h2>
        : props.size === "h3" ? <h3 className={classNames}>{props.children}</h3>
        : props.size === "h4" ? <h4 className={classNames}>{props.children}</h4>
        : props.size === "h5" ? <h5 className={classNames}>{props.children}</h5>
        : props.size === "h6" ? <h6 className={classNames}>{props.children}</h6>
        : <h1 className={classNames}>{props.children}</h1>
    )
}

export default Heading