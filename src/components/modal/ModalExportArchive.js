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
import { IoMdClose } from 'react-icons/io';
import '../../styles/archive.scss';

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

	const [fileNameExport, setFileNameExport] = useState('');

	const onSaveExport = () => {
		var fd = new FormData();
		fd.append('before', formattedStartDate);
		fd.append('after', formattedEndDate);
		fd.append('file_name', fileNameExport);

		if (startDate === null || endDate === null) {
			OnError({
				title: 'Terjadi Kesalahan',
				text: 'Silahkan Masukkan Tanggal',
			});
		}

		if (startDate === '' || endDate === '') {
			OnError({
				title: 'Terjadi Kesalahan',
				text: 'Silahkan Masukkan Tanggal',
			});
		}

		if (fileNameExport === '') {
			OnError({
				title: 'Terjadi Kesalahan',
				text: 'Silahkan Masukkan Nama',
			});
		}

		if (startDate !== '' && endDate !== '' && fileNameExport !== '') {
			if (props.title === 'Perdata') {
				ExportPerdata(fd)
					.then((res) => {
						console.log('bct response', res);
						const url = window.URL.createObjectURL(new Blob([res.data]));
						const link = document.createElement('a');
						link.href = url;
						link.setAttribute(
							'download',
							`${fileNameExport} (${formattedStartDate}-${formattedEndDate}).xlsx`
						);
						document.body.appendChild(link);
						link.click();
					})
					.catch((err) => {
						console.log('err export perdata', err);
					});
			} else if (props.title === 'Pidana') {
				ExportPidana(fd)
					.then((res) => {
						console.log('bct response', res);
						const url = window.URL.createObjectURL(new Blob([res.data]));
						const link = document.createElement('a');
						link.href = url;
						link.setAttribute(
							'download',
							`${fileNameExport} (${formattedStartDate}-${formattedEndDate}).xlsx`
						);
						document.body.appendChild(link);
						link.click();
					})
					.catch((err) => {
						console.log('err export perdata', err);
					});
			} else {
				OnError({
					title: 'Terjadi Kesalahan',
					text: 'Data tidak ditemukan',
				});
			}
		}
	};

	const onClearFilter = () => {
		setStartDate('');
		setEndDate('');
	};

	console.log('startDate', startDate);
	console.log('formattedStart', formattedStartDate);
	console.log('endDate', endDate);
	console.log('formattedEnd', formattedEndDate);

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
						<div className='wrapperFilter-date mb-10px ml-20px'>
							<RiCalendar2Line />
							<DatePicker
								className='filter-date'
								monthsShown={2}
								selected={startDate}
								onChange={onChange}
								startDate={startDate}
								endDate={endDate}
								selectsRange
								dateFormat='dd MMM'
								placeholderText={'1 Jan'}
								// inline
							></DatePicker>
							<div>-</div>
							<DatePicker
								className='filter-date'
								monthsShown={2}
								selected={endDate}
								onChange={onChange}
								startDate={startDate}
								endDate={endDate}
								selectsRange
								dateFormat='dd MMM'
								placeholderText='31 Des'
								// disabled
							/>
							{startDate !== '' || endDate !== '' ? (
								<IoMdClose color='red' size={20} onClick={onClearFilter} />
							) : null}
						</div>
					</div>
					<div className='form-group'>
						<div className='text'>Nama File</div>
						<input
							className='input'
							placeholder='Arsip'
							onChange={(e) => setFileNameExport(e.target.value)}
						/>
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
