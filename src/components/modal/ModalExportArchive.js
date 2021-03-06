import React, { useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import './modalConf.scss'
import {  OnError } from '../../components/toast/CustomToast'
import DatePicker from 'react-datepicker';
import { BsDownload } from "react-icons/bs";
import { RiCalendar2Line } from 'react-icons/ri';

function ModalDeleteArchive(props) {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(null);
	const onChange = (dates) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
	};


    return (
        <Modal isOpen={props.modal} toggle={props.toggle} className="c-modal-export" size="md" backdrop="static" centered>
            <ModalBody className="modal-export-body">
                <div className="modal-export-body-header">
                    Export
                </div>
                <div className="modal-export-body-content">
                    <div className="form-group">
                        <div className="text">Simpan Sebagai</div>
                        <input className="input" value="XLS" disabled/>
                    </div>
                    <div className="form-group">
                        <div className="text">Rentang Tanggal</div>
                        <div className='wrapper-select-date  mb-10px ml-20px'>
                            <RiCalendar2Line
                                size={20}
									style={{
										position: 'absolute',
										zIndex: '2',
                                        
										margin: '12px 0px 0px 12px',
									}}
								/>
								<DatePicker
									className='select-date'
									monthsShown={2}
									selected={startDate}
									onChange={onChange}
									startDate={startDate}
									endDate={endDate}
									selectsRange
									// inline
								/>
							</div>

                    </div>
                </div>

                <div className="modal-export-body-action">
                    <button className="apply"
                        onClick={() => {
                            OnError({
                                title: 'Data Perkara berhasil di Simpan',
                                text: 'Data perkara 36 966 692 783 berhasil di Hapus dari Arsip' 
                            }) 
                                
                         
                        }}
                    >
                        <BsDownload
                            size={20}
                            color={'#FAFAFA'}
                            style={{
                                marginRight: '10px'
                            }}
                        />
                            Simpan
                    </button>

                    <button className="cancel">
                        <span
                            style={{ cursor: 'pointer' }}
                            onClick={() => props.toggle()}
                        >
                            Cancel
                        </span>
                    </button>
                </div>
            </ModalBody>           
        </Modal>
    )
}

export default ModalDeleteArchive
