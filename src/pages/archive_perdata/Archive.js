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
import DatePicker from 'react-datepicker';

function Archive(props) {
	const [dtTableArchive, setDtTableArchive] = useState(null);

	const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(true);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((json) => setDtTableArchive(json));
	}, []);

	const toggleModalDel = () => {
		setModalDeleteIsOpen(!modalDeleteIsOpen);
	};

	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(null);
	const onChange = (dates) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
	};

	return (
		<div className='c-main'>
			{modalDeleteIsOpen ? (
				<ModalDeleteArchive modal={modalDeleteIsOpen} toggle={toggleModalDel} />
			) : null}
			<div className='container-fluid custom-container-fluid fade show mb-5'>
				<div className='wrapperArchive mb-20px'>
					<div className='headerArchive'>
						<button
							className='btn-tambah mr-20px mb-10px'
							onClick={() => props.history.push('./archive-perdata/tambah')}
						>
							<AiOutlinePlusCircle size={20} color='white' />
							<Gap width={5} />
							Tambah Data
						</button>
						<div className='headerTools '>
							<div className='wrapperInput mb-10px'>
								<FiSearch size={20} />
								<Gap width={10} />
								<input className='input' placeholder='Cari Data' />
							</div>
							<div className='wrapperFilter-date  mb-10px ml-20px'>
								<RiCalendar2Line
									style={{
										position: 'absolute',
										zIndex: '2',
										margin: '10px 0px 0px 10px',
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
									// inline
								/>
							</div>

							<button className='print-btn  mb-10px ml-20px'>
								<FiLogOut
									size={20}
									style={{ marginRight: '10px', marginTop: '-3px' }}
								/>
								Export
							</button>
						</div>
					</div>
					<div></div>
				</div>

				<div className='c-table-main'>
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
									Tanggal Peringiriman
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
							{dtTableArchive === null
								? null
								: dtTableArchive.map((dt, i) => (
										<tr key={i} className='table-main-nth-child'>
											<td className='table-main-td'>{dt.id}</td>
											<td
												className='table-main-td'
												style={{ textAlign: 'left' }}
											>
												{dt.website}
											</td>
											<td className='table-main-td'>{dt.website}</td>
											<td className='table-main-td'>{dt.name}</td>
											<td className='table-main-td'>{dt.name}</td>
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
														props.history.push('/sys/archive-perdata/edit')
													}
												/>
											</td>
										</tr>
								  ))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Archive;
