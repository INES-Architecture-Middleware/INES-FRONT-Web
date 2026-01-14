import { useEffect, useState } from 'react'
import './Pokeball.scss'

const Pokeball = (props) => {
    const [color, setColor] = useState("#6E6E6E")

    useEffect(()=>{
        if(props.color) setColor(props.color)
        else setColor("#6E6E6E")
    }, [props.color])

    return (
        <div className="PokeballContainer">
            <div className="Pokeball" style={{backgroundColor:color}}>
                <div className="BallSeparator"/>
                <div className="BallCenter">
                    <div className="Center" style={{backgroundColor:color}}/>
                </div>
            </div>
        </div>
    )
}

export default Pokeball