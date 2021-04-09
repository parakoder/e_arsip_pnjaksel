/* eslint-disable react/jsx-no-target-blank */
import React from 'react'; // useState
import { Modal, ModalBody } from 'reactstrap';
import './modalConf.scss';
// import { OnError } from '../toast/CustomToast';
// import DatePicker from 'react-datepicker';
import { BsDownload } from 'react-icons/bs';
import { IoDocumentTextOutline } from 'react-icons/io5';
import '../../styles/archive.scss';
import { DownloadFile } from '../../configs/handler/DownloadHandler';

function ModalViewPDF(props) {
    console.log('props.data', props.data);

    const onSaveExport = (id) => {
        DownloadFile({ file_name: id + '.zip' }, 'zip')
            .then((res) => {
                console.log('res download', res);
                console.log('res download', res);
                const url = window.URL.createObjectURL(
                    new Blob([res.data], { type: 'application/zip' })
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', id + '.zip');
                document.body.appendChild(link);
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onPDFDownload = (file) => {
        DownloadFile({ file_name: file }, 'pdf')
            .then((res) => {
                console.log('res download', res);
                const url = window.URL.createObjectURL(
                    new Blob([res.data], { type: 'application/pdf' })
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file);
                document.body.appendChild(link);
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Modal
            isOpen={props.modal}
            toggle={props.toggle}
            className='c-modal-view-pdf'
            size='md'
            backdrop='static'
            centered
        >
            <ModalBody className='modal-view-body'>
                <div className='modal-view-body-header'>Lihat Berkas PDF</div>
                <div className='modal-view-body-content'>
                    {props.data &&
                        props.data.data.map((o) => (
                            <div className='form-group'>
                                <div className='text'>{o}</div>
                                <div
                                    onClick={() => onPDFDownload(o)}
                                    className='text'
                                >
                                    <IoDocumentTextOutline
                                        size={30}
                                        color='black'
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            </div>
                        ))}
                </div>

                <div className='modal-view-body-action'>
                    <div
                        className='apply'
                        onClick={() => onSaveExport(props.data.id)}
                    >
                        <BsDownload
                            size={20}
                            color={'#FAFAFA'}
                            style={{
                                marginRight: '10px',
                            }}
                        />
                        Simpan Semua Dokumen
                    </div>

                    <button className='cancel'>
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
    );
}

export default ModalViewPDF;
