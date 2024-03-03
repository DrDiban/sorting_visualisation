import React from "react"

export default function Bar(props) {

    const old_value = props.old_value
    const new_value = props.new_value
    let bottom_value = 0
    let top_value = 0
    let bottom_color = 'grey'
    let top_color = 'black'
    if (old_value > new_value) {
        bottom_value = new_value
        bottom_color = 'black'
        top_value = old_value - new_value
        top_color = 'grey'
    }

    else if (old_value < new_value) {
        bottom_value = old_value
        top_value = new_value - old_value
    }

    else {
        bottom_value = new_value
        bottom_color = 'black'
    }

    return (


        <div className="container" >
            <div style={{ color: "pink", textAlign: "center", fontSize: `${props.fontSize}px` }}>{props.old_value}</div>
            <div className="bar-arr-2" style={{ height: `${top_value}px`, backgroundColor: `${top_color}` , width:`${props.barWidth}px`}}></div>
            <div className="bar-arr" style={{ height: `${bottom_value}px`, backgroundColor: `${bottom_color}`, lineHeight: `${bottom_value}px` , width:`${props.barWidth}px`}}></div>
            
        </div>
    )
}