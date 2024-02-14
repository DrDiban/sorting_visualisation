import React from "react"

export default function Bar(props) {

    const old_value = props.old_value
    const new_value = props.new_value
    const type = props.type

    let bottom_value = 0
    let top_value = 0
    let bottom_color = 'grey'
    let top_color = 'black'
    let full_value = old_value
    let full_color = 'grey'
    if (type==="start_point"){
        full_value = old_value
        full_color = 'red'
    }

    else if (type==="i_pos_value_check"){
        full_value = old_value
        full_color = 'yellow'
    }

    else if (type==="j_pos_value_check"){
        full_value = old_value
        full_color = 'yellow'
    }

    
    else if (type==="swap_position_i_j" || type==="swap_position_lo_j" ){
        if (old_value>new_value){
            bottom_value = new_value
            bottom_color = 'black'
            top_value = old_value - new_value
            top_color = 'grey'
        }
    
        else if (old_value<new_value){
            bottom_value = old_value
            top_value = new_value -old_value
        }
    
        else{
            bottom_value = new_value
            bottom_color = 'black'
        }
    }
    else if (type==="ordered"){
        full_value = new_value
        full_color = 'black'
    }

    

    return (
        <div className="container">
            {(type === "swap_position_i_j" || type === "swap_position_lo_j") && (
                <>
                <div className="bar-arr-2" style={{ height: `${top_value}px`, backgroundColor: `${top_color}` }}></div>
                <div className="bar-arr" style={{ height: `${bottom_value}px`, backgroundColor: `${bottom_color}` }}></div>
                </>
            )}

            {type !== "swap_position_i_j" && type !== "swap_position_lo_j" && (
                <div className="bar-arr" style={{ height: `${full_value}px`, backgroundColor: `${full_color}` }}></div>
            )}
        </div>
    )
}