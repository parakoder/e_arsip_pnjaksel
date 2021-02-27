import React from "react";
import { toast } from 'react-toastify'
import '../../styles/customStyle.scss'


const cssToast = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}
const cToastBody = {
    display: 'flex',
    height: '100%',
    padding: '18px 20px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#25282B',
    alignItems: 'center'
}

const toastImgFrame = {
    marginRight: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}



const toastContent = {

}


export const OnSuccess = (props) => {
    var text = props ? props.text : ''
    return (
        toast.success(
            (
                <div style={cToastBody}>
                    {props.icon ?
                        <div style={toastImgFrame}>
                            {props.icon}
                        </div>
                        : null
                    }
                    <div style={toastContent}>
                           {text}
                    </div>
                </div>
            ), cssToast
        )
    )
}