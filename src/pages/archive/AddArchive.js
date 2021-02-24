import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import './archive.scss'

function AddArchive(props) {
    return (
        <div className='c-main'>
            <div className='container-fluid custom-container-fluid fade show mb-5'>
                <div className="c-archive-back-btn">
                    <div className="archive-back-btn"
                        onClick={() => props.history.push('/sys/archive')}
                    >
                        <IoIosArrowBack 
                            size={20}
                            color={"#000000"}
                            style={{marginRight: '18px', marginTop: '-2px'}}
                        />
                        Kembali ke Arsip
                    </div>
                </div>

                <div className="c-archive-form row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                        <div className="form-input-group mb-30px">
                            <p className="text-input-title-1">Nomor Perkara</p>
                            <input 
                                className="form-input-1"
                            />
                        </div>
                        <div className="form-input-group mb-30px">
                            <p className="text-input-title-1">BOX</p>
                            <input 
                                className="form-input-1"
                            />
                        </div>
                        <div className="form-input-group mb-30px">
                            <p className="text-input-title-1">Nama Terdakwa</p>
                            <input 
                                className="form-input-1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddArchive
