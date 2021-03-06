import React from "react";
import { toast } from 'react-toastify'
import '../../styles/customStyle.scss'
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdError } from "react-icons/md";

const cssToast = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}
const cToastBodySuccess = {
    display: 'flex',
    height: '100%',
    padding: '2px 20px 2px 12px',
    color: '#25282B',
    alignItems: 'center',
    borderLeft : '2px solid #27AE60'
}

const cToastBodyError = {
    display: 'flex',
    height: '100%',
    padding: '2px 20px 2px 12px',
    color: '#25282B',
    alignItems: 'center',
    borderLeft : '2px solid #CF212A'
}

const toastImgFrame = {
    marginRight: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const toastContent = {
    display: 'flex',
    flexDirection: 'column'
}

const toastHeader = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#25282B',
    // marginBottom: '5px'
}

const toastText = {
    fontSize: '12px',
    fontWeight: 'normal',
    color: '#A0A4A8'
}


export const OnSuccess = (props) => {
    var title = props.title ? props.title : ''
    var text = props.text ? props.text : ''
    return (
        toast.success(
            (
                <div style={cToastBodySuccess}>
                        <div style={toastImgFrame}>
                            {props.icon ? props.icon :
                                <IoCheckmarkCircleSharp
                                    size={22}
                                    color={'#27AE60'}
                                />
                            }
                            
                        </div>
                    <div style={{ toastContent }}>
                        <div style={toastHeader}>
                            {title}
                        </div>
                        <div style={toastText}>
                            {text}
                        </div>
                         
                    </div>
                </div>
            ), cssToast
        )
    )
};

export const OnError = (props) => {
    var title = props.title ? props.title : ''
    var text = props.text ? props.text : ''
    return (
        toast.error(
            (
                <div style={cToastBodyError}>
                        <div style={toastImgFrame}>
                            {props.icon ? props.icon :
                                <MdError
                                    size={22}
                                    color={'#CF212A'}
                                />
                            }
                        </div>
                    <div style={{ toastContent }}>
                        <div style={toastHeader}>
                            {title}
                        </div>
                        <div style={toastText}>
                            {text}
                        </div>
                         
                    </div>
                </div>
            ), cssToast
        )
    )
};