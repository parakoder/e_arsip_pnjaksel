/* eslint-disable react/jsx-no-target-blank */
import React from 'react'; // useState
import { Modal } from 'reactstrap';
import './modalConf.scss';
import LoadingOverlay from 'react-loading-overlay-ts';

function ModalLoading({ modal, isLoading }) {
    return (
        <Modal isOpen={modal} size='md' backdrop='static' centered>
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
