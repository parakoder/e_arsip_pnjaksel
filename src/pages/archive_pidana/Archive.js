/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Gap from '../../components/Gap';
import { FiSearch } from 'react-icons/fi';
import { RiCalendar2Line } from 'react-icons/ri';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { IoDocumentTextOutline } from 'react-icons/io5';
import '../../styles/archive.scss';
import { MdModeEdit } from 'react-icons/md';
import { CgFileDocument } from 'react-icons/cg';
import ModalDeleteArchive from '../../components/modal/ModalDeleteArchive';
import ModalExportArchive from '../../components/modal/ModalExportArchive';
import DatePicker from 'react-datepicker';
import { GetArsipPidana } from '../../configs/handler/ArsipHandler';
import PaginationComponent from '../../components/Pagination/PaginationComponent';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import moment from 'moment';
import { useHistory } from 'react-router';
import { OnError } from '../../components/toast/CustomToast';
import ModalViewPDF from '../../components/modal/ModalViewPDF';

function Archive(props) {
	let history = useHistory();
	const [modalExportisOpen, setModalExportisOpen] = useState(false);
	const [modalViewPDFisOpen, setModalViewPDFisOpen] = useState(false);

	const [dataPidana, setDataPidana] = useState(null);

	const [dataFilePDFPerItem, setDataFilePDFPerItem] = useState(null);
	const toggleModalViewPDF = (data, id) => {
		setModalViewPDFisOpen(!modalViewPDFisOpen);
		setDataFilePDFPerItem({ data, id });
	};

	const toggleModalExport = () => {
		setModalExportisOpen(!modalExportisOpen);
	};

	const [findDataFilter, setFindDataFilter] = useState('');

	const [dateCodePick, setDateCodePick] = useState(null);

	const [startDate, setStartDate] = useState('');
	const [formattedStartDate, setFormattedStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [formattedEndDate, setFormattedEndDate] = useState('');
	const onChange = (dates) => {
		console.log('dates', dates);
		const [start, end] = dates;
		var formatStart = moment(start).format('yyyy-MM-DD').toString();
		var formatEnd = moment(end).format('yyyy-MM-DD').toString();

		setFormattedStartDate(formatStart);
		setFormattedEndDate(formatEnd);

		setStartDate(start);
		setEndDate(end);
	};

	const [totalItem, setTotalItem] = useState(0);

	const [pagination, setPagination] = useState({
		page: 1,
		limit: 20,
	});

	const changePagePaginate = (page) => {
		setPagination({
			...pagination,
			page: page,
		});
	};

	const getDtArsipPidana = () => {
		var findData = findDataFilter === '' ? null : findDataFilter;
		var dateStart = formattedStartDate === '' ? null : formattedStartDate;
		var dateEnd = formattedEndDate === '' ? null : formattedEndDate;
		var dateCode = dateCodePick === null ? null : dateCodePick;

		var ofset =
			pagination.page === 1 ? 0 : (pagination.page - 1) * pagination.limit;

		GetArsipPidana({
			query: findData,
			befor: dateStart,
			after: dateEnd,
			date_code: dateCode,
			offset: ofset,
			limit: pagination.limit,
		})
			.then((res) => {
				if (res.status === 200) {
					setDataPidana(res.data);
					setTotalItem(res.total_item);
				}
				// console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
				if (err.request.status === 403) {
					OnError({
						title: 'Error Code: 403',
						text: 'Kesalahan Autentikasi, silahkan Login Kembali',
					});
					history.replace('/login');
					localStorage.clear();
				}
			});
	};

	useEffect(() => {
		debounceOnFilter();
		return () => console.log('unmount pidana');
	}, [pagination.page, findDataFilter, startDate, endDate, dateCodePick]);

	const debounceOnFilter = AwesomeDebouncePromise(getDtArsipPidana, 700);

	const onClearFilter = () => {
		// setFindDataFilter(null);
		setDateCodePick(null);
		setStartDate('');
		setEndDate('');
	};

	const onClearSearch = () => {
		setFindDataFilter('');
	};

	return (
		<div className='c-main'>
			{modalExportisOpen ? (
				<ModalExportArchive
					modal={modalExportisOpen}
					toggle={toggleModalExport}
					title='Pidana'
				/>
			) : null}

			{modalViewPDFisOpen ? (
				<ModalViewPDF
					modal={modalViewPDFisOpen}
					toggle={toggleModalViewPDF}
					data={dataFilePDFPerItem}
				/>
			) : null}

			<div className='container-fluid custom-container-fluid fade show mb-5'>
				<div className='wrapperArchive mb-20px'>
					<div className='headerArchive'>
						<button
							className='btn-tambah mr-20px mb-10px'
							onClick={() => props.history.push('./archive-pidana/tambah')}
						>
							<AiOutlinePlusCircle size={20} color='white' />
							<Gap width={5} />
							Tambah Data
						</button>
						<div className='headerTools '>
							<div className='wrapperInput mb-10px'>
								<FiSearch size={20} />
								<Gap width={10} />
								<input
									className='input'
									placeholder='Cari Data'
									onChange={(e) => setFindDataFilter(e.target.value)}
									value={findDataFilter}
								/>
								<Gap width={10} />
								{findDataFilter !== '' ? (
									<IoMdClose color='red' size={20} onClick={onClearSearch} />
								) : null}
							</div>
							<div className='wrapperFilter-date  mb-10px ml-20px'>
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
								>
									<div className='date-code-container'>
										<div
											onClick={() => setDateCodePick('hi')}
											className='date-code'
											style={{
												backgroundColor:
													dateCodePick === 'hi' ? '#8BA577' : '#F0F0F0',
												color: dateCodePick === 'hi' ? 'white' : 'black',
											}}
										>
											Hari Ini
										</div>
										<div
											onClick={() => setDateCodePick('km')}
											className='date-code'
											style={{
												backgroundColor:
													dateCodePick === 'km' ? '#8BA577' : '#F0F0F0',

												color: dateCodePick === 'km' ? 'white' : 'black',
											}}
										>
											Kemarin
										</div>
										<div
											onClick={() => setDateCodePick('mi')}
											className='date-code'
											style={{
												backgroundColor:
													dateCodePick === 'mi' ? '#8BA577' : '#F0F0F0',

												color: dateCodePick === 'mi' ? 'white' : 'black',
											}}
										>
											Minggu Ini
										</div>
										<div
											className='date-code'
											onClick={() => setDateCodePick('bi')}
											style={{
												backgroundColor:
													dateCodePick === 'bi' ? '#8BA577' : '#F0F0F0',

												color: dateCodePick === 'bi' ? 'white' : 'black',
											}}
										>
											Bulan Ini
										</div>
										<div
											onClick={() => setDateCodePick('bl')}
											className='date-code'
											style={{
												backgroundColor:
													dateCodePick === 'bl' ? '#8BA577' : '#F0F0F0',
												color: dateCodePick === 'bl' ? 'white' : 'black',
											}}
										>
											Bulan Lalu
										</div>
										<div
											onClick={() => setDateCodePick('ti')}
											className='date-code'
											style={{
												backgroundColor:
													dateCodePick === 'ti' ? '#8BA577' : '#F0F0F0',
												color: dateCodePick === 'ti' ? 'white' : 'black',
											}}
										>
											Tahun Ini
										</div>
									</div>
								</DatePicker>
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

							<button
								className='print-btn  mb-10px ml-20px'
								onClick={toggleModalExport}
							>
								<FiLogOut
									size={20}
									style={{
										marginRight: '10px',
										marginTop: '-3px',
									}}
								/>
								Export
							</button>
						</div>
					</div>
					<div></div>
				</div>

				<div className='c-table-main mb-30px'>
					<table className='table-main'>
						<thead className='table-main-thead'>
							<tr>
								<th
									className='table-main-th'
									style={{ width: '5%', position: 'sticky', top: 0 }}
								>
									No.
								</th>
								<th className='table-main-th' style={{ width: '22%' }}>
									No. Perkara
								</th>
								<th className='table-main-th' style={{ width: '8%' }}>
									BOX
								</th>
								<th className='table-main-th' style={{ width: '17%' }}>
									Klasifikasi Perkara
								</th>
								<th className='table-main-th' style={{ width: '22%' }}>
									Nama Tergugat
								</th>
								<th className='table-main-th' style={{ width: '22%' }}>
									Nama Penggugat
								</th>
								<th className='table-main-th' style={{ width: '22%' }}>
									Nama Turut Tergugat
								</th>
								<th className='table-main-th' style={{ width: '17%' }}>
									Tanggal Pengiriman
								</th>
								<th
									className='table-main-th'
									style={{ width: '13%', position: 'sticky', top: 0 }}
								>
									PDF
								</th>
								<th
									className='table-main-th'
									style={{ width: '13%', position: 'sticky', top: 0 }}
								>
									Edit
								</th>
							</tr>
						</thead>

						<tbody className='table-main-tbody'>
							{dataPidana === null
								? null
								: dataPidana.map((dt, i) => (
										<tr key={i} className='table-main-nth-child'>
											<td
												className='table-main-td'
												style={{ position: 'sticky', top: 0 }}
											>
												{i + 1}
											</td>
											<td
												className='table-main-td'
												style={{ textAlign: 'left' }}
											>
												{dt.no_perkara}
											</td>
											<td className='table-main-td'>{dt.box}</td>
											<td className='table-main-td'>
												{dt.klasifikasi_perkara}
											</td>
											<td className='table-main-td'>
												{dt.nama_tergugat.toString()}
											</td>
											<td className='table-main-td'>
												{dt.nama_penggugat.toString()}
											</td>
											<td className='table-main-td'>
												{dt.nama_turut_tergugat.toString()}
											</td>
											<td className='table-main-td'>{dt.tanggal_pengiriman}</td>
											<td
												className='table-main-td'
												style={{ position: 'sticky', top: 0 }}
											>
												<IoDocumentTextOutline
													size={22}
													style={{
														cursor: 'pointer',
													}}
													onClick={() => toggleModalViewPDF(dt.file, dt.id)}
												/>
											</td>
											<td
												className='table-main-td'
												style={{ position: 'sticky', top: 0 }}
											>
												<MdModeEdit
													size={22}
													style={{
														cursor: 'pointer',
													}}
													onClick={() =>
														history.push({
															pathname: '/sys/archive-pidana/edit',
															state: dt,
														})
													}
												/>
											</td>
										</tr>
								  ))}
						</tbody>
					</table>
				</div>
				<PaginationComponent
					totalItems={totalItem}
					pageSize={pagination.limit}
					onSelect={changePagePaginate}
					activePage={pagination.page}
					className='pagination justify-content-center mb-0'
					listClassName='justify-content-center mb-0'
				/>
			</div>
		</div>
	);
}

export default Archive;
