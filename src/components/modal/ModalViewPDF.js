/* eslint-disable react/jsx-no-target-blank */
import React from 'react'; // useState
import { Modal, ModalBody } from 'reactstrap';
import './modalConf.scss';
// import { OnError } from '../toast/CustomToast';
// import DatePicker from 'react-datepicker';
import { BsDownload } from 'react-icons/bs';
// import { RiCalendar2Line } from 'react-icons/ri';
// import moment from 'moment';
import { IoDocumentTextOutline } from 'react-icons/io5';
import '../../styles/archive.scss';
import { DownloadFile } from '../../configs/handler/DownloadHandler';

function ModalViewPDF(props) {
    // const [fileDownload, setFileDownload] = useState('');

    // function base64ToArrayBuffer(base64) {
    // 	var binaryString = window.atob(base64);
    // 	var binaryLen = binaryString.length;
    // 	var bytes = new Uint8Array(binaryLen);
    // 	for (var i = 0; i < binaryLen; i++) {
    // 		var ascii = binaryString.charCodeAt(i);
    // 		bytes[i] = ascii;
    // 	}
    // 	return bytes;
    // }

    // function saveByteArray(reportName, byte) {
    // 	var blob = new Blob([byte], {
    // 		type:
    // 			'application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    // 			'application/vnd.ms-excel',
    // 	});
    // 	var link = document.createElement('a');
    // 	link.href = window.URL.createObjectURL(blob);
    // 	var fileName = reportName;
    // 	link.download = fileName;
    // 	link.click();
    // }

    console.log('props.data', props.data);

    const onSaveExport = (id) => {
        DownloadFile({ file_name: id + '.zip' })
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
        const splitc = file.replace(/\s/g, '%20');
        DownloadFile({ file_name: file })
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


                // var blob=new Blob([res.data], {type:"application/pdf"});
                // var link=document.createElement('a');
                // link.href=window.URL.createObjectURL(blob);
                // link.download="Report_"+new Date()+".pdf";
                // link.click();                link.click();


                // const file = new Blob([res.data], { type: 'application/pdf' });

                // const fileURL = URL.createObjectURL(file);
    
                // window.open(fileURL, "_blank");
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
