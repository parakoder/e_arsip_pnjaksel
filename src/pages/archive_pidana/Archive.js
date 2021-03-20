/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Gap from '../../components/Gap';
import { FiSearch } from 'react-icons/fi';
import { RiCalendar2Line } from 'react-icons/ri';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import './archive.scss';
import { MdModeEdit } from 'react-icons/md';
import { CgFileDocument } from 'react-icons/cg';
import ModalDeleteArchive from '../../components/modal/ModalDeleteArchive';
import ModalExportArchive from '../../components/modal/ModalExportArchive';
import CalendarContainer from 'react-datepicker';
import DatePicker from 'react-datepicker';
import { GetArsipPidana } from '../../configs/handler/ArsipHandler';
import PaginationComponent from '../../components/Pagination/PaginationComponent'
import AwesomeDebouncePromise from 'awesome-debounce-promise';


function Archive(props) {
	const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
	const [modalExportisOpen, setModalExportisOpen] = useState(false);

	const [dataPidana, setDataPidana] = useState(null);

	const toggleModalDel = () => {
		setModalDeleteIsOpen(!modalDeleteIsOpen);
	};

	const toggleModalExport = () => {
		setModalExportisOpen(!modalExportisOpen);
	};

	const [findDataFilter, setFindDataFilter] = useState(null)

    const [dateCodePick, setDateCodePick] = useState(null)

	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const onChange = (dates) => {
		console.log('dates', dates);
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
	};

	const [pagination, setPagination] = useState({
		page: 1,
		limit: 20,
	})


	const changePagePaginate = page => {
		setPagination({
			...pagination,
			page: page
		})
	}

	const getDtArsipPidana = () => {

        var findData = findDataFilter === null ? null : findDataFilter
        var dateStart = startDate === null ? null : startDate
        var dateEnd = endDate === null ? null : endDate
        var dateCode = dateCodePick === null ? null : dateCodePick

        var ofset  = pagination.page === 1 ? 0 : ((pagination.page - 1) * pagination.limit)

        GetArsipPidana({
            query: findData,
            befor: dateStart,
            after: dateEnd,
            date_code: dateCode,
            offset: ofset,
            limit: pagination.limit
        })
        .then((res) => {
            if (res.status === 200) {
                setDataPidana(res.data);
            }
            // console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

	useEffect(() => {
        debounceOnFilter()
    }, [pagination.page, findDataFilter, startDate, endDate, dateCodePick ]);


    const debounceOnFilter = AwesomeDebouncePromise(getDtArsipPidana, 700);

	return (
		<div className='c-main'>
			{modalDeleteIsOpen ? (
				<ModalDeleteArchive modal={modalDeleteIsOpen} toggle={toggleModalDel} />
			) : null}

			{modalExportisOpen ? (
				<ModalExportArchive
					modal={modalExportisOpen}
					toggle={toggleModalExport}
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
								<input className='input' placeholder='Cari Data'
									onChange={(e) => setFindDataFilter(e.target.value)}
								/>
							</div>
							<div className='wrapperFilter-date  mb-10px ml-20px'>
								<RiCalendar2Line
									style={{
										marginLeft: 10,
									}}
								/>
								<DatePicker
									className='filter-date'
									monthsShown={2}
									selected={startDate}
									onChange={onChange}
									startDate={startDate}
									endDate={endDate}
									selectsRange
									dateFormat='dd MMM'
								>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'space-around',
											backgroundColor: '#F0F0F0',
											position: 'absolute',
											left: -115,
											height: 235,
											maxHeight: 235,
											padding: '25px 25px',
											border: '1px solid #768E7C',
											borderRadius: 5,
										}}
									>
										<div>Hari Ini</div>
										<div>Kemarin</div>
										<div>Minggu Ini</div>
										<div>Bulan Ini</div>
										<div>Bulan Lalu</div>
										<div>Tahun Ini</div>
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
								// disabled
								/>
							</div>

							<button
								className='print-btn  mb-10px ml-20px'
								onClick={() => toggleModalExport()}
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
								<th className='table-main-th' style={{ width: '5%' }}>
									No.
								</th>
								<th className='table-main-th' style={{ width: '22%' }}>
									No. Perkara
								</th>
								<th className='table-main-th' style={{ width: '8%' }}>
									BOX
								</th>
								<th className='table-main-th' style={{ width: '22%' }}>
									Nama Terdakwa
								</th>
								<th className='table-main-th' style={{ width: '17%' }}>
									Tanggal Pengiriman
								</th>
								<th className='table-main-th' style={{ width: '13%' }}>
									PDF
								</th>
								<th className='table-main-th' style={{ width: '13%' }}>
									Edit
								</th>
							</tr>
						</thead>

						<tbody className='table-main-tbody'>
							{dataPidana === null
								? null
								: dataPidana.map((dt, i) => (
									<tr key={i} className='table-main-nth-child'>
										<td className='table-main-td'>{i + 1}</td>
										<td
											className='table-main-td'
											style={{ textAlign: 'left' }}
										>
											{dt.no_perkara}
										</td>
										<td className='table-main-td'>{dt.box}</td>
										<td className='table-main-td'>
											{dt.nama_tergugat.toString()},{' '}
											{dt.nama_penggugat.toString()},{' '}
											{dt.nama_turut_tergugat.toString()}
										</td>
										<td className='table-main-td'>{dt.tanggal_pengiriman}</td>
										<td className='table-main-td'>
											<CgFileDocument
												size={22}
												style={{
													cursor: 'pointer',
												}}
											/>
										</td>
										<td className='table-main-td'>
											<MdModeEdit
												size={22}
												style={{
													cursor: 'pointer',
												}}
												onClick={() =>
													props.history.push('/sys/archive-pidana/edit')
												}
											/>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
				<PaginationComponent
					totalItems={
						86
					}
					pageSize={pagination.limit}
					onSelect={changePagePaginate}
					activePage={pagination.page}
					className="pagination justify-content-center mb-0"
					listClassName="justify-content-center mb-0"
				/>
			</div>
		</div>
	);
}

export default Archive;
