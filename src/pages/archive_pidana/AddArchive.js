import React, { useState } from 'react';
import { IoIosArrowBack, IoMdCloudUpload, IoMdClose } from 'react-icons/io';

import { IoDocumentOutline } from 'react-icons/io5';
import { RiCalendar2Line } from 'react-icons/ri';
import Gap from '../../components/Gap';
import './archive.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import ModalConfirmation from '../../components/modal/ModalConfirmation';
import { useHistory } from 'react-router';
import { YearPicker } from 'react-dropdown-date';

function AddArchive(props) {
	const [date, setDate] = useState(new Date());

	let history = useHistory();

	const [showCalendar, setShowCalendar] = useState(false);

	const [dataArchive, setDataArchive] = useState({
		no_perkara: '',
		no_box: '',
		nama_terdakwa: '',
		tgl_pengiriman: date,
		file: [],
	});

	const onChangeCalendar = (date) => {
		setDate(date);
		setDataArchive({ ...dataArchive, tgl_pengiriman: date.toString() });
		setShowCalendar(false);
	};

	const browseHandler = (e) => {
		console.log('errweradawd', e);
		let newArr = [...dataArchive.file];

		for (let index = 0; index < e.length; index++) {
			const element = e[index];
			newArr.push(element);
		}
		// e.map((file) => {
		// 	newArr.push(file.name);
		// 	return newArr;
		// });
		setDataArchive({ ...dataArchive, file: newArr });
	};

	const onDeleteFile = (i) => {
		const arrFile = [...dataArchive.file];
		const filteredFile = arrFile.filter((val, idx) => idx !== i);
		setDataArchive({ ...dataArchive, file: filteredFile });
	};

	const [year, setYear] = useState(2021);


	const onSubmitData = () => {
		
		var fd = new FormData()

		dataArchive.file.map(item => fd.append('files', item.file));

		console.log('body nya', fd)
		
	}

	console.log('filess', dataArchive.file);

	return (
		<div className='c-main'>
			<div className='container-fluid custom-container-fluid fade show mb-5'>
				<div className='c-archive-back-btn'>
					<div className='archive-back-btn' onClick={() => history.goBack()}>
						<IoIosArrowBack
							size={20}
							color={'#000000'}
							style={{ marginRight: '18px', marginTop: '-2px' }}
						/>
						Kembali ke Arsip Pidana
					</div>
				</div>

				<div className='c-archive-form row'>
					<div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
						<div className='form-input-group mb-30px'>
							<p className='text-input-title-1'>Nomor Perkara</p>
							<div className='form-input-perkara'>
								<input
									placeholder='1234'
									className='input-sub-perkara'
									maxLength='4'
									type='text'
									pattern='\d*'
								/>
								<span className='input-txt-perkara'>/ PDN /</span>
								<input
									placeholder='SUS'
									className='input-sub-perkara'
									maxLength='3'
								/>
								<span className='input-txt-perkara'>/</span>
								<YearPicker
									defaultValue={'Tahun'}
									start={1980} // default is 1900
									end={2030} // default is current year
									reverse // default is ASCENDING
									required={true} // default is false
									value={year} // mandatory
									onChange={(year) => {
										// mandatory
										setYear(year);
									}}
									id={'year'}
									name={'year'}
									classes={'classes'}
									optionClasses={'option classes'}
								/>
								<span className='input-txt-perkara'>/ PNJS</span>
							</div>
							{/* <input
								className='form-input-1'
								placeholder='Masukkan Nomor Perkara'
								value={dataArchive.no_perkara}
								onChange={(e) =>
									setDataArchive({ ...dataArchive, no_perkara: e.target.value })
								}
							/> */}
						</div>
						<div className='form-input-group mb-30px'>
							<p className='text-input-title-1'>BOX</p>
							<input
								className='form-input-1'
								placeholder='Masukkan Nomor BOX'
								value={dataArchive.no_box}
								onChange={(e) =>
									setDataArchive({ ...dataArchive, no_box: e.target.value })
								}
							/>
						</div>
						<div className='form-input-group mb-30px'>
							<p className='text-input-title-1'>Nama Terdakwa</p>
							<input
								className='form-input-1'
								placeholder='Masukkan Nama Terdakwa'
								value={dataArchive.nama_terdakwa}
								onChange={(e) =>
									setDataArchive({
										...dataArchive,
										nama_terdakwa: e.target.value,
									})
								}
							/>
						</div>
						<div className='form-input-group mb-30px'>
							<p className='text-input-title-1'>Tanggal Pengiriman</p>
							<div className='wrapperDate'>
								<div className='iconDate'>
									<RiCalendar2Line color='#FFF' size={25} />
								</div>
								<input
									onClick={() => setShowCalendar(!showCalendar)}
									className='form-input-1'
									contentEditable='false'
									style={{
										borderTopLeftRadius: '0px',
										borderBottomLeftRadius: '0px',
									}}
									placeholder='Pilih Tanggal Pengiriman'
									value={moment(date).format('yyyy-MM-DD')}
									onChange={() => {
										setShowCalendar(!showCalendar);
										setDataArchive({ ...dataArchive, tgl_pengiriman: date });
									}}
								/>
							</div>
							{showCalendar ? (
								<div style={{ display: 'flex', position: 'absolute' }}>
									<Calendar
										calendarType='ISO 8601'
										onChange={onChangeCalendar}
										value={date}
									/>
								</div>
							) : null}
						</div>
					</div>
					<div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
						<div className='form-input-group mb-30px'>
							<p className='text-input-title-1'>Upload PDF Arsip Pidana</p>
							<div className='wrapperUpload'>
								{dataArchive.file.length === 0 ? (
									<>
										<label htmlFor='upload-pdf' className='txtBrowse'>
											<IoMdCloudUpload size={30} color='#5F764F' /> <br />
											Browse your Document
										</label>
										<input
											type='file'
											accept='application/pdf'
											id='upload-pdf'
											multiple
											onChange={(e) => browseHandler(e.target.files)}
										/>
									</>
								) : (
									<div className='wrapperUploaded'>
										<div className='list-file'>
											{dataArchive &&
												dataArchive.file.map((val, i) => {
													return (
														<div key={i} className='doc-uploaded'>
															<div className='txt-filename'>{val.name}</div>
															<IoMdClose
																onClick={() => onDeleteFile(i)}
																color='red'
																style={{ display: 'flex', flex: 0.5 }}
															/>
														</div>
													);
												})}
										</div>
										<label htmlFor='upload-pdf' className='btn-reupload'>
											<IoMdCloudUpload size={20} color='white' />
											<Gap width={10} />
											<div style={{ color: 'white' }}>Upload Dokumen Lain</div>
										</label>
										<input
											type='file'
											accept='application/pdf'
											id='upload-pdf'
											multiple
											onChange={(e) => browseHandler(e.target.files)}
										/>
										{/* <div
											className='btn-reupload'
											onChange={(e) => browseHandler(e.target.files[0])}
										>

										</div> */}
									</div>
								)}
							</div>
						</div>
					</div>
					<Gap height={50} />
					<div className='addFooter row'>
						<div
							className='btn-submit mb-20px col-sm-12'
							onClick={() => {
								onSubmitData()
								console.log('dataarchive', dataArchive)
							}}
							data-bs-toggle='modal'
							data-bs-target='#submitModal'
						>
							<IoDocumentOutline
								size={20}
								color='white'
								style={{ marginRight: 5 }}
							/>
							<div>Submit Data</div>
						</div>

						<div
							className='btn-cancel ml-20px col-sm-12'
							data-bs-toggle='modal'
							data-bs-target='#cancelModal'
						>
							Cancel
						</div>
					</div>
					<ModalConfirmation
						id='cancelModal'
						title='Batalkan Proses Input Data'
						description='Apa Anda yakin ingin membatalkan inputan? Anda harus menginput datanya kembali apabila membatalkan.'
						classBtnYes='btn-modal-yes-green'
						txtBtnYes='Ya, Batalkan'
						txtBtnNo='Cancel'
						onSubmit={() => history.goBack()}
					/>
					<ModalConfirmation
						id='submitModal'
						title='Submit Data'
						description='Apa kamu yakin untuk mensubmit Data kedalam Arsip?'
						classBtnYes='btn-modal-yes-green'
						txtBtnYes='Submit'
						txtBtnNo='Cancel'
						onSubmit={() => alert('Berhasil Submit')}
					/>
				</div>
			</div>
		</div>
	);
}

export default AddArchive;
