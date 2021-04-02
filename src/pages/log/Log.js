/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Gap from '../../components/Gap';
import './log.scss';
import { FiSearch } from 'react-icons/fi';
import { HiFilter } from 'react-icons/hi';
import { RiUserLine } from 'react-icons/ri';
import FilterAdmin from '../../components/log/FilterAdmin';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { GetLogData } from '../../configs/handler/LogHandler';
import moment from 'moment';
import PaginationComponent from '../../components/Pagination/PaginationComponent';
import { GetUserList } from '../../configs/handler/UsersHandler';
import DatePicker from 'react-datepicker';
import { IoMdClose } from 'react-icons/io';
function Log(props) {
	const [dtTableLog, setDtTableLog] = useState(null);

	const [filterAdminIsOpen, setFilterAdminIsOpen] = useState(false);

	const [totalItem, setTotalItem] = useState(0);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [formattedStartDate, setFormattedStartDate] = useState('');
	const [formattedEndDate, setFormattedEndDate] = useState('');
	const [findDataFilter, setFindDataFilter] = useState('');

	const [selectedFilterAdmin, setSelectedFilterAdmin] = useState([]);

	console.log('selectedFilterAdmin', selectedFilterAdmin);

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

	const getLogData = () => {
		// var findData = findDataFilter === '' ? null : findDataFilter;
		var findData =
			selectedFilterAdmin.length === 0 ? null : selectedFilterAdmin;
		var dateStart = startDate === '' ? null : formattedStartDate;
		var dateEnd = endDate === '' ? null : formattedEndDate;

		var ofset =
			pagination.page === 1 ? 0 : (pagination.page - 1) * pagination.limit;

		GetLogData({
			query: findData,
			before: dateStart,
			after: dateEnd,
			offset: ofset,
			limit: pagination.limit,
		})
			.then((res) => {
				if (res.status === 200) {
					setDtTableLog(res.data);
					setTotalItem(res.total_item);
				}
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// useEffect(() => {
	// 	fetch('https://jsonplaceholder.typicode.com/users')
	// 		.then((response) => response.json())
	// 		.then((json) => setDtTableLog(json));
	// }, []);

	const [listUser, setListUser] = useState([]);

	useEffect(() => {
		GetUserList()
			.then((res) => {
				console.log('reslistuser', res);
				if (res.status === 200) {
					setListUser(res.data);
				}
			})
			.catch((err) => console.log('errlistuser', err));
		return () => {
			console.log('unmount user list');
		};
	}, []);

	const onClearFilter = () => {
		setStartDate('');
		setEndDate('');
	};

	const onChangeDate = (dates) => {
		const [start, end] = dates;

		var formatStart = moment(start).format('yyyy-MM-DD').toString();
		var formatEnd = moment(end).format('yyyy-MM-DD').toString();

		setFormattedStartDate(formatStart);
		setFormattedEndDate(formatEnd);
		setStartDate(start);
		setEndDate(end);
	};

	useEffect(() => {
		debounceOnFilter();
		return () => console.log('unmount perdata');
	}, [
		pagination.page,
		findDataFilter,
		startDate,
		endDate,
		listUser,
		selectedFilterAdmin,
	]);

	const debounceOnFilter = AwesomeDebouncePromise(getLogData, 700);

	return (
		<div className='c-main'>
			<div className='container-fluid custom-container-fluid fade show mb-5'>
				<div className='wrapperLog mb-15px'>
					<div className='headerLog'>
						<div className='wrapperInput mb-15px '>
							<FiSearch size={20} />
							<Gap width={10} />
							<input
								className='input'
								placeholder='Cari Data'
								onChange={(e) => setFindDataFilter(e.target.value)}
							/>
						</div>
						{/* <Gap width={20} /> */}
						<div className='wrapperFilter-date mb-15px ml-20px'>
							{/* <HiFilter size={20} /> */}
							<img
								src={require('../../assets/icons/ic_calendar.png').default}
								alt='ic_calendar.png'
								style={{ width: 16 }}
							/>
							<Gap width={10} />
							<DatePicker
								className='filter-date'
								monthsShown={2}
								selected={startDate}
								onChange={onChangeDate}
								startDate={startDate}
								endDate={endDate}
								selectsRange
								dateFormat='dd MMM'
								placeholderText={'1 Jan'}
								// inline
							/>
							<div>-</div>
							<DatePicker
								className='filter-date'
								monthsShown={2}
								selected={endDate}
								onChange={onChangeDate}
								startDate={startDate}
								endDate={endDate}
								selectsRange
								dateFormat='dd MMM'
								placeholderText='31 Des'
								// disabled
							/>
							<IoMdClose color='red' size={20} onClick={onClearFilter} />
						</div>
						{/* <Gap width={20} /> */}

						<div className='group-wrapperFilterAdmin'>
							<div
								className='wrapperFilterAdmin mb-15px ml-20px'
								onClick={() => setFilterAdminIsOpen(!filterAdminIsOpen)}
							>
								<RiUserLine size={20} />
								<Gap width={10} />
								<div>Semua Admin</div>
							</div>

							{filterAdminIsOpen ? (
								<FilterAdmin
									listAdmin={listUser}
									// onCheckName={(e) => setFindDataFilter(e.toString())}
									dtAdmin={selectedFilterAdmin}
									setDtAdmin={(e) => setSelectedFilterAdmin(e.toString())}
								/>
							) : null}
						</div>
					</div>
					<div></div>
				</div>

				<div className='c-table-main mb-5'>
					<table className='table-main'>
						<thead className='table-main-thead'>
							<tr>
								<th className='table-main-th' style={{ width: '5%' }}>
									No.
								</th>
								<th className='table-main-th' style={{ width: '30%' }}>
									User
								</th>
								<th className='table-main-th' style={{ width: '15%' }}>
									Tanggal
								</th>
								<th className='table-main-th' style={{ width: '15%' }}>
									Waktu
								</th>
								<th className='table-main-th' style={{ width: '30%' }}>
									Aktifitas
								</th>
							</tr>
						</thead>

						<tbody className='table-main-tbody'>
							{dtTableLog === null
								? null
								: dtTableLog.map((dt, i) => (
										<tr key={i}>
											<td className='table-main-td'>{i + 1}</td>
											<td
												className='table-main-td'
												style={{ textAlign: 'left' }}
											>
												{dt.user}
											</td>
											<td className='table-main-td'>{dt.tanggal}</td>
											<td className='table-main-td'>
												{moment(dt.waktu, 'hh:mm').format('HH:mm')}
											</td>
											<td className='table-main-td'>{dt.aktifitas}</td>
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

export default Log;
