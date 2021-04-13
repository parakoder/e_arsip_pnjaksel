/* eslint-disable react/jsx-no-target-blank */
import React from 'react'; // useState
import { Modal, ModalBody } from 'reactstrap';
import './modalConf.scss';
import LoadingOverlay from 'react-loading-overlay-ts';

function ModalLoading({ modal, toggle, isLoading }) {
    return (
        <Modal
            isOpen={modal}
            toggle={toggle}
            // className='c-modal-view-pdf'
            size='md'
            backdrop='static'
            centered
        >
            <div style={{ backgroundColor: 'black' }}>
                <LoadingOverlay
                    text='Proses Submit Data'
                    active={isLoading}
                    spinner
                />
            </div>
        </Modal>
    );
}

export default ModalLoading;
