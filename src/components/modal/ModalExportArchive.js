import React, { useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import './modalConf.scss';
import { OnError } from '../../components/toast/CustomToast';
import DatePicker from 'react-datepicker';
import { BsDownload } from 'react-icons/bs';
import { RiCalendar2Line } from 'react-icons/ri';
import moment from 'moment';
import {
	ExportPerdata,
	ExportPidana,
} from '../../configs/handler/ExportHandler';

function ModalDeleteArchive(props) {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(null);
	const [formattedStartDate, setFormattedStartDate] = useState('');
	const [formattedEndDate, setFormattedEndDate] = useState('');

	const onChange = (dates) => {
		const [start, end] = dates;

		var formatStart = moment(start).format('yyyy-MM-DD').toString();
		var formatEnd = moment(end).format('yyyy-MM-DD').toString();

		setFormattedStartDate(formatStart);
		setFormattedEndDate(formatEnd);

		setStartDate(start);
		setEndDate(end);
	};

	const [fileDownload, setFileDownload] = useState('');

	const onSaveExport = () => {
		var fd = new FormData();
		fd.append('before', formattedStartDate);
		fd.append('after', formattedEndDate);
		fd.append('file_name', 'Dummy Arsip');

		if (props.title === 'Perdata') {
			ExportPerdata(fd)
				.then((res) => {
					console.log('res sssssssssss', res)
				
					const byteArray = new Uint8Array(res);
					const a = window.document.createElement('a');
					a.href = window.URL.createObjectURL(
					  new Blob([byteArray], {
						type:
						  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					  }),
					);
					a.download = `Export Report Perdata ${new Date().toDateString()}.xlsx`;
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);
				}
			)
				// .then((resBlob) => console.log('resBlob', resBlob))
				.catch((err) => console.log('export err perdata', err));
		} else if (props.title === 'Pidana') {
			ExportPidana(fd)
				.then((res) => {
					console.log('export res pidana', res);
					// const type = res.headers['content-type']
                    const url = new Blob([res], {  encoding: 'UTF-8' })
                    const link = document.createElement('a')
                    link.href = window.URL.createObjectURL(url)
                    link.download = `Export Report Pidana ${new Date().toDateString()}.xlsx`;
                    // link.download = 'file.xlsx'
        
                    link.dispatchEvent(
                        new MouseEvent("click", {
                            bubbles: true,
                            cancelable: true,
                            view: window
                        })
                    );
        
                    setTimeout(function () {
                        // For Firefox it is necessary to delay revoking the ObjectURL
                        window.URL.revokeObjectURL(url);
                        link.remove();
                    }, 100);
				})
				.catch((err) => console.log('export err pidana', err));
		} else {
			OnError({
				title: 'Terjadi Kesalahan',
				text: 'Data tidak ditemukan',
			});
		}
	};

	return (
		<Modal
			isOpen={props.modal}
			toggle={props.toggle}
			className='c-modal-export'
			size='md'
			backdrop='static'
			centered
		>
			<ModalBody className='modal-export-body'>
				<div className='modal-export-body-header'>
					Export Arsip {props.title}
				</div>
				<div className='modal-export-body-content'>
					<div className='form-group'>
						<div className='text'>Simpan Sebagai</div>
						<input className='input' value='XLS' disabled />
					</div>
					<div className='form-group'>
						<div className='text'>Rentang Tanggal</div>
						<div className='wrapper-select-date mb-10px ml-20px'>
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

				<div className='modal-export-body-action'>
					<div
						className='apply'
						onClick={() => {
							// OnError({
							// 	title: 'Data Perkara berhasil di Simpan',
							// 	text:
							// 		'Data perkara 36 966 692 783 berhasil di Hapus dari Arsip',
							// });
							onSaveExport();
						}}
					>
						<BsDownload
							size={20}
							color={'#FAFAFA'}
							style={{
								marginRight: '10px',
							}}
						/>
						Simpan
					</div>

					<button className='cancel'>
						<span style={{ cursor: 'pointer' }} onClick={() => props.toggle()}>
							Cancel
						</span>
					</button>
				</div>
			</ModalBody>
		</Modal>
	);
}

export default ModalDeleteArchive;
