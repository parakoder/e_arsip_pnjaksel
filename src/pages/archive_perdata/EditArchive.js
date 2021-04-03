import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoMdCloudUpload, IoMdClose } from 'react-icons/io';

import { IoDocumentOutline } from 'react-icons/io5';
import { RiCalendar2Line, RiDeleteBinLine } from 'react-icons/ri';
import Gap from '../../components/Gap';
import '../../styles/archive.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import ModalConfirmation from '../../components/modal/ModalConfirmation';
import { useHistory, useLocation } from 'react-router';
import { YearPicker } from 'react-dropdown-date';
import {
	DeleteArsipPerdata,
	EditArsipPerdata,
} from '../../configs/handler/ArsipHandler';
import Select from 'react-select';
import { OnError, OnSuccess } from '../../components/toast/CustomToast';
function EditArchive(props) {
	let history = useHistory();

	let location = useLocation();

	console.log('loc', location.state);

	let locState = location.state;

	const [showCalendar, setShowCalendar] = useState(false);

	const [dataArchive, setDataArchive] = useState({
		no_perkara: '',
		no_box: locState.box,
		nama_terdakwa: locState.nama_terdakwa,
		tgl_pengiriman: locState.tanggal_pengiriman,
		file: locState.file,
		klasifikasi_perkara: locState.klasifikasi_perkara,
	});
	const options = [
		{ value: 'Pdt. G', label: 'Pdt. G' },
		{ value: 'Pdt. P', label: 'Pdt. P' },
		{ value: 'Pdt. G.S', label: 'Pdt. G.S' },
	];

	const [additionalFile, setAdditionalFile] = useState([]);

	const [noper1, setNoper1] = useState('');
	const [noper2, setNoper2] = useState('');

	const [date, setDate] = useState(locState.tanggal_pengiriman);
	const [year, setYear] = useState(new Date().getFullYear());

	const [isNoperError, setIsNoperError] = useState(false);
	const [isBoxError, setIsBoxError] = useState(false);
	const [isTerdakwaError, setIsTerdakwaError] = useState(false);

	useEffect(() => {
		const splitNoper = locState.no_perkara.split('/');
		setNoper1(splitNoper[0]);
		setNoper2(splitNoper[2]);
		setYear(splitNoper[3]);
		return () => {};
	}, [locState.no_perkara]);

	const onChangeCalendar = (date) => {
		setDate(date);
		setDataArchive({ ...dataArchive, tgl_pengiriman: date.toString() });
		setShowCalendar(false);
	};

	const browseHandler = (e) => {
		console.log('errweradawd', e);
		let newArr = [...additionalFile];

		for (let index = 0; index < e.length; index++) {
			const element = e[index];
			newArr.push(element);
		}
		setAdditionalFile(newArr);
	};

	const onDeleteFile = (i) => {
		const arrFile = [...dataArchive.file];
		const filteredFile = arrFile.filter((val, idx) => idx !== i);
		setDataArchive({ ...dataArchive, file: filteredFile });
	};

	const onDeleteAdditionalFile = (i) => {
		const arrFile = [...additionalFile];
		const filteredFile = arrFile.filter((val, idx) => idx !== i);
		console.log('additionaldataFIle', filteredFile);
		setAdditionalFile(filteredFile);
	};

	const onDeleteArsip = () => {
		DeleteArsipPerdata({ id: locState.id })
			.then((res) => {
				console.log('res del', res);
				if (res.status === 200) {
					history.goBack();
				}
			})
			.catch((err) => console.log('err del', err));
	};

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const onUpdateData = () => {
		if (noper1 === '' || noper2 === '') {
			setIsNoperError(true);
		}

		if (dataArchive.no_box === '') {
			setIsBoxError(true);
		}

		if (dataArchive.nama_terdakwa === '') {
			setIsTerdakwaError(true);
		}

		if (
			noper1 !== '' &&
			noper2 !== '' &&
			dataArchive.no_box !== '' &&
			dataArchive.nama_terdakwa !== ''
		) {
			let noper = noper1 + '/pdt/' + noper2 + '/' + year + '/pnjs';
			let formatTglPengiriman = moment(dataArchive.tgl_pengiriman).format(
				'yyyy-MM-DD'
			);

			console.log('left_over', dataArchive.file.toString());

			const uploadInput = document.getElementById('upload-pdf');
			console.log('uploadInput', uploadInput);

			var fd = new FormData();
			fd.append('id_arsip', locState.id);
			fd.append('no_perkara', noper.toUpperCase());
			fd.append('box', dataArchive.no_box);
			fd.append(
				'nama_terdakwa',
				capitalizeFirstLetter(dataArchive.nama_terdakwa)
			);
			fd.append('tanggal_pengiriman', formatTglPengiriman);
			fd.append('left_over', dataArchive.file.toString());
			fd.append('klasifikasi_perkara', dataArchive.klasifikasi_perkara);
			if (additionalFile.length > 0) {
				for (let i = 0; i < additionalFile.length; i++) {
					fd.append('file', additionalFile[i]);
				}
			}

			EditArsipPerdata(fd)
				.then((res) => {
					console.log('res edit data', res);
					if (res.status === 200) {
						OnSuccess({
							title: 'Berhasil',
							text: 'Berhasil Mengubah Arsip Perdata',
						});
						history.goBack();
					}
				})
				.catch((err) => {
					OnError({ title: 'Gagal', text: err.message });
					if (err.request.status === 403) {
						OnError({
							title: 'Error Code: 403',
							text: 'Kesalahan Autentikasi, silahkan Login Kembali',
						});
						history.replace('/login');
						localStorage.clear();
					}
				});
		} else {
			OnError({ title: 'Kesalahan', text: 'Mohon Input Semua Field' });
		}
	};

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
						Kembali ke Arsip Perdata
					</div>
				</div>

				<div className='c-archive-form row'>
					<div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
						<div className='form-input-group mb-30px'>
							<p className='text-input-title-1'>Nomor Perkara</p>
							<div
								className={
									isNoperError
										? 'form-input-perkara-error'
										: 'form-input-perkara'
								}
							>
								<input
									placeholder='1234'
									className='input-sub-perkara'
									maxLength='4'
									type='text'
									pattern='\d*'
									value={noper1}
									onChange={(e) => {
										setNoper1(e.target.value);
										if (e.target.value.length === 0) {
											setIsNoperError(true);
										} else {
											setIsNoperError(false);
										}
									}}
								/>
								<span className='input-txt-perkara'>/ PDT /</span>
								<input
									placeholder='SUS'
									className='input-sub-perkara'
									maxLength='3'
									value={noper2}
									onChange={(e) => {
										setNoper2(e.target.value);
										if (e.target.value.length === 0) {
											setIsNoperError(true);
										} else {
											setIsNoperError(false);
										}
									}}
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
						</div>
						<div className='form-input-group mb-30px'>
							<p className='text-input-title-1'>BOX</p>
							<input
								className={isBoxError ? 'form-input-error' : 'form-input-1'}
								placeholder='Masukkan Nomor BOX'
								value={dataArchive.no_box}
								onChange={(e) => {
									setDataArchive({ ...dataArchive, no_box: e.target.value });
									if (e.target.value.length === 0) {
										setIsBoxError(true);
									} else {
										setIsBoxError(false);
									}
								}}
							/>
						</div>
						<div className='form-input-group mb-30px'>
							<p className='text-input-title-1'>Klasifikasi Perkara</p>
							<Select
								options={options}
								placeholder='Klasifikasi Perkara'
								className='form-select-1'
								value={options.find(
									(o) => o.value === dataArchive.klasifikasi_perkara
								)}
								onChange={(e) =>
									setDataArchive({
										...dataArchive,
										klasifikasi_perkara: e.value,
									})
								}
							/>
						</div>
						<div className='form-input-group mb-30px'>
							<p className='text-input-title-1'>Nama Terdakwa</p>
							<input
								className={
									isTerdakwaError ? 'form-input-error' : 'form-input-1'
								}
								placeholder='Masukkan Nama Terdakwa'
								value={dataArchive.nama_terdakwa}
								onChange={(e) => {
									setDataArchive({
										...dataArchive,
										nama_terdakwa: e.target.value,
									});
									if (e.target.value.length === 0) {
										setIsTerdakwaError(true);
									} else {
										setIsTerdakwaError(false);
									}
								}}
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
										setDataArchive({
											...dataArchive,
											tgl_pengiriman: date,
										});
									}}
								/>
							</div>
							{showCalendar ? (
								<div
									style={{
										display: 'flex',
										position: 'absolute',
									}}
								>
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
							<p className='text-input-title-1'>Upload PDF Arsip Perdata</p>
							<div className='wrapperUpload'>
								{dataArchive.file.length === 0 &&
								additionalFile.length === 0 ? (
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
															<div className='txt-filename'>{val}</div>
															<IoMdClose
																onClick={() => onDeleteFile(i)}
																color='red'
																style={{
																	display: 'flex',
																	flex: 0.5,
																}}
															/>
														</div>
													);
												})}
											{additionalFile &&
												additionalFile.map((item, idx) => {
													return (
														<div key={idx} className='doc-uploaded'>
															<div className='txt-filename'>{item.name}</div>
															<IoMdClose
																onClick={() => onDeleteAdditionalFile(idx)}
																color='red'
																style={{
																	display: 'flex',
																	flex: 0.5,
																}}
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
									</div>
								)}
							</div>
						</div>
					</div>
					<Gap height={50} />
					<div className='addFooter row'>
						<div
							className='btn-submit mb-20px col-sm-12'
							data-bs-toggle='modal'
							data-bs-target='#updateModal'
						>
							<IoDocumentOutline
								size={20}
								color='white'
								style={{ marginRight: 5 }}
							/>
							<div>Submit Data</div>
						</div>

						<div
							className='btn-delete mb-20px ml-20px col-sm-12'
							data-bs-toggle='modal'
							data-bs-target='#deleteModal'
						>
							<RiDeleteBinLine
								size={20}
								color='white'
								style={{ marginRight: 5 }}
							/>
							<div>Delete</div>
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
						id='updateModal'
						title='Update Data'
						description='Apa kamu yakin untuk mengupdate Data kedalam Arsip?.'
						classBtnYes='btn-modal-yes-green'
						txtBtnYes='Submit'
						txtBtnNo='Cancel'
						onSubmit={onUpdateData}
					/>
					<ModalConfirmation
						id='deleteModal'
						title='Hapus Data'
						description='Apa Anda yakin ingin menghapus data? Tindakan ini tidak bisa
										dikembalikan.'
						classBtnYes='btn-modal-yes-red'
						txtBtnYes='Ya, Hapus'
						txtBtnNo='Cancel'
						onSubmit={onDeleteArsip}
					/>
					<ModalConfirmation
						id='cancelModal'
						title='Batalkan Proses Input Data'
						description='Apa Anda yakin ingin membatalkan inputan? Anda harus menginput datanya kembali apabila membatalkan.'
						classBtnYes='btn-modal-yes-green'
						txtBtnYes='Ya, Batalkan'
						txtBtnNo='Cancel'
						onSubmit={() => history.goBack()}
					/>
				</div>
			</div>
		</div>
	);
}

export default EditArchive;
