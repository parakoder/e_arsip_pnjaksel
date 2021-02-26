import React, { useState } from 'react';
import { IoIosArrowBack, IoMdCloudUpload, IoMdClose } from 'react-icons/io';

import { IoDocumentOutline } from 'react-icons/io5';
import { RiCalendar2Line } from 'react-icons/ri';
import Gap from '../../components/Gap';
import './archive.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

function AddArchive(props) {
	const [date, setDate] = useState(new Date());

	const [showCalendar, setShowCalendar] = useState(false);

	const [dataArchive, setDataArchive] = useState({
		no_perkara: '',
		no_box: '',
		nama_terdakwa: '',
		tgl_pengiriman: date,
		file: '',
	});

	const onChangeCalendar = (date) => {
		setDate(date);
		setDataArchive({ ...dataArchive, tgl_pengiriman: date.toString() });
		setShowCalendar(false);
	};

	const browseHandler = (e) => {
		console.log('errweradawd', e.name);
		setDataArchive({ ...dataArchive, file: e.name });
	};

	return (
		<div className='c-main'>
			<div className='container-fluid custom-container-fluid fade show mb-5'>
				<div className='c-archive-back-btn'>
					<div
						className='archive-back-btn'
						onClick={() => props.history.push('/sys/archive')}
					>
						<IoIosArrowBack
							size={20}
							color={'#000000'}
							style={{ marginRight: '18px', marginTop: '-2px' }}
						/>
						Kembali ke Arsip
					</div>
				</div>

				<div className='c-archive-form row'>
					<div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
						<div className='form-input-group mb-30px'>
							<p className='text-input-title-1'>Nomor Perkara</p>
							<input
								className='form-input-1'
								placeholder='Masukkan Nomor Perkara'
								value={dataArchive.no_perkara}
								onChange={(e) =>
									setDataArchive({ ...dataArchive, no_perkara: e.target.value })
								}
							/>
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
					</div>
					<div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
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
						<div className='form-input-group mb-30px'>
							<p className='text-input-title-1'>Upload PDF Arsip</p>
							<div className='wrapperUpload'>
								{dataArchive.file === '' ? (
									<>
										<label htmlFor='upload-pdf' className='txtBrowse'>
											<IoMdCloudUpload size={30} color='#5F764F' /> <br />
											Browse your Document
										</label>
										<input
											type='file'
											accept='application/pdf'
											id='upload-pdf'
											onChange={(e) => browseHandler(e.target.files[0])}
										/>
									</>
								) : (
									<div className='wrapperUploaded'>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
										>
											<div>{dataArchive.file}</div>
											<IoMdClose
												onClick={() =>
													setDataArchive({ ...dataArchive, file: '' })
												}
												color='red'
											/>
										</div>
										<div
											style={{
												display: 'flex',
												alignSelf: 'flex-end',
												flexDirection: 'row',
												alignItems: 'center',
											}}
										>
											<IoMdCloudUpload size={20} color='#5F764F' />
											<Gap width={10} />
											<div style={{ color: '#5F764F' }}>
												Upload Dokumen Lain
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
					<Gap height={50} />
					<div className='addFooter row'>
						<div
							className='btn-submit mb-20px col-sm-12'
							onClick={() => console.log('dataarchive', dataArchive)}
						>
							<IoDocumentOutline
								size={20}
								color='white'
								style={{ marginRight: 5 }}
							/>
							<div>Submit Data</div>
						</div>

						<div className='btn-cancel ml-20px col-sm-12'>Cancel</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddArchive;
