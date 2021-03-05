import React, {  } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import './modalConf.scss'
import { OnSuccess } from '../../components/toast/CustomToast'
// import { RiDeleteBinLine } from "react-icons/ri";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

function ModalDeleteArchive(props) {


    return (
        <Modal isOpen={props.modal} toggle={props.toggle} className="c-modal-del" size="md" backdrop="static" centered>
            <ModalBody className="modal-del-body">
                <div className="modal-del-body-header">
                    Hapus Data
                </div>
                <div className="modal-del-body-content">
                    Apa Anda yakin ingin menghapus data ? 
                     <br />
                    Tindakan ini tidak bisa dikembalikan.
                </div>

                <div className="modal-del-body-action">
                    <button className="apply"
                        onClick={() => {
                            OnSuccess({
                                icon: <IoCheckmarkCircleSharp
                                    size={22}
                                    color={'#27AE60'}
                                />,
                                title: 'Data Perkara berhasil di Simpan',
                                text: 'Data perkara 36 966 692 783 berhasil di Hapus dari Arsip' 
                            }) 
                                
                         
                        }}
                    >
                        Ya, Hapus
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
