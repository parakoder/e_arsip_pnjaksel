/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import Gap from '../../components/Gap';
import './home.scss';
import { Bar } from 'react-chartjs-2';
import {
	GraphPerYearHandler,
	GraphYearsHandler,
	GraphStat,
} from '../../configs/handler/GraphHandler';
import { GetLogActivity } from '../../configs/handler/HomeHandler';
import { GetArsipSum } from '../../configs/handler/ArsipHandler';
import moment from 'moment';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function Home(props) {
	const [dtTableHome, setDtTableHome] = useState(null);

	const [name, setName] = useState(null);

	useEffect(() => {
		const getName = async () => {
			const datUser = JSON.parse(localStorage.getItem('@user'));

			if (datUser !== null) {
				setName(datUser.name);
			}

			console.log('asjdnasdn', datUser);
		};

		getName();
	}, []);

	const getLogDt = () => {
		var row = 10;

		GetLogActivity(row)
			.then((res) => {
				if (res && res.data) {
					console.log('res log', res.data);
					setDtTableHome(res.data);
				}
			})
			.catch((err) => {
				console.log('err graph gome', err);
			});
	};

	useEffect(() => {
		getLogDt();
	}, []);

	const [year, setYear] = useState(new Date().getFullYear());
	const [yearAll, setYearAll] = useState(new Date().getFullYear());

	const [stateGraph, setStateGraph] = useState({
		labels: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		],
		datasets: [
			{
				label: 'Pidana',
				backgroundColor: 'rgba(207,33,42,1)',
				borderColor: 'rgba(207,33,42,1)',
				borderWidth: 1,
				data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			},
			{
				label: 'Perdata',
				backgroundColor: 'rgba(118,142,124,1)',
				borderColor: 'rgba(118,142,124,1)',
				borderWidth: 1,
				data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			},
		],
	});

	const [sumArsip, setSumArsip] = useState(null);

	useEffect(() => {
		GraphPerYearHandler(year)
			.then((res) => {
				console.log('res grapg gome', res);
				if (res.status === 200) {
					setStateGraph({
						...stateGraph,
						datasets: [
							{
								label: 'Pidana',
								backgroundColor: 'rgba(207,33,42,1)',
								borderColor: 'rgba(207,33,42,1)',
								borderWidth: 1,
								data: res.data.dataPidana,
							},
							{
								label: 'Perdata',
								backgroundColor: 'rgba(118,142,124,1)',
								borderColor: 'rgba(118,142,124,1)',
								borderWidth: 1,
								data: res.data.dataPerdata,
							},
						],
					});
				}
			})
			.catch((err) => {
				console.log('err graph gome', err);
			});
		return () => {};
	}, [year]);

	const [allGraph, setAllGraph] = useState({
		labels: ['Pidana', 'Perdata', 'Hukum', 'Kepegawaian', 'Umum dan Keuangan'],
		datasets: [
			{
				label: '',
				backgroundColor: [
					'rgba(207,33,42,1)',
					'rgba(118,142,124,1)',
					'rgba(57,47,8,1)',
					'rgba(13,70,27,1)',
					'rgba(248,224,134,1)',
				],
				borderWidth: 1,
				data: [0, 0, 0, 0, 0],
			},
		],
	});

	useEffect(() => {
		GraphStat(yearAll)
			.then((res) => {
				console.log('res graph all', res.data);
				if (res.status === 200) {
					setAllGraph({
						...allGraph,
						datasets: [
							{
								label: '',
								backgroundColor: [
									'rgba(207,33,42,1)',
									'rgba(118,142,124,1)',
									'rgba(57,47,8,1)',
									'rgba(13,70,27,1)',
									'rgba(248,224,134,1)',
								],
								borderWidth: 1,
								data: res.data.data,
							},
						],
					});
				}
			})
			.catch((err) => {
				console.log('err graph all', err);
			});
		return () => {};
	}, [yearAll]);

	useEffect(() => {
		GetArsipSum()
			.then((res) => {
				console.log('res arsip sum', res);
				if (res.status === 200) {
					setSumArsip(res.data);
				}
			})
			.catch((err) => {
				console.log('err arsip sum', err);
				setSumArsip(null);
			});

		return () => {};
	}, []);

	const [yearsArray, setYearsArray] = useState([]);

	useEffect(() => {
		GraphYearsHandler()
			.then((res) => {
				console.log('resss years', res);
				if (res.status === 200) {
					var a = res.data;
					console.log('sorting a', a.sort().reverse());
					setYearsArray(a.sort().reverse());
				}
			})
			.catch((err) => {
				console.log('err years', err);
			});
		return () => {};
	}, []);

	return (
		<div className='c-main'>
			<div className='container-fluid custom-container-fluid fade show mb-5'>
				<p className='txtWelcome'>Selamat Datang, {name}!</p>
				<div className='wrapperGraph row '>
					<div className='col-xl-8 col-lg-7 col-md-12 col-sm-12 mb-20px'>
						<div className='graph'>
							<div className='graph-header'>
								<div className='title'>Grafik Jumlah Arsip</div>
								<Dropdown
									options={yearsArray}
									onChange={(e) => setYear(e.value)}
									value={yearsArray.find(
										(o) => o === new Date().getFullYear().toString()
									)}
									placeholder='Tahun'
									controlClassName='classes'
									menuClassName='classes'
								/>
							</div>
							<div className='graph-content'>
								<Bar
									data={stateGraph}
									options={{
										legend: {
											display: true,
											position: 'right',
										},
									}}
								/>
							</div>
						</div>
					</div>
					<div className='col-xl-4 col-lg-5 col-md-12 col-sm-12 mb-20px'>
						<div className='cardRekap  '>
							<p className='titleRekap'>Rekap E-Arsip</p>
							<div className='infoRekap'>
								<p className='subtitleRekap'>Total Arsip</p>
								<p className='valueRekap'>
									{sumArsip === null ? '-' : sumArsip.total_arsip}
								</p>
							</div>
							<div className='infoRekap'>
								<p className='subtitleRekap'>Total Input Hari Ini</p>
								<p className='valueRekap'>
									{sumArsip === null ? '-' : sumArsip.total_input_today}
								</p>
							</div>
							<div className='infoRekap'>
								<p className='subtitleRekap'>Presentasi Pertambahan</p>
								<p className='valueRekap'>
									{sumArsip === null ? '-' : sumArsip.persentase_penambahan}
								</p>
							</div>
							<div className='infoRekap'>
								<p className='subtitleRekap'>Total User Aktif</p>
								<p className='valueRekap'>
									{sumArsip === null ? '-' : sumArsip.total_user_aktif}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='wrapperGraph row '>
					<div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-20px'>
						<div>
							<div className='wrapperSection'>
								<p className='titleSection'>Klasifikasi Perkara</p>
							</div>
							<div className='graph'>
								<div className='graph-header'>
									<div className='title'></div>
									<Dropdown
										options={yearsArray}
										onChange={(e) => setYearAll(e.value)}
										value={yearsArray.find(
											(o) => o === new Date().getFullYear().toString()
										)}
										placeholder='Tahun'
										controlClassName='classes'
										menuClassName='classes'
									/>
								</div>
								<div
									className='graph-content'
									style={{ display: 'flex', flexDirection: 'column' }}
								>
									<Bar
										data={allGraph}
										options={{
											legend: {
												display: false,
												position: 'bottom',
											},
										}}
									/>
									<div>
										<div className='wrapperSection'>
											<p className='titleSection'>Ket</p>
										</div>
										<div className='keterangan-wrapper'>
											<div className='keterangan-graph-all'>
												<div
													className='keterangan-indicator'
													style={{ backgroundColor: '#CF212A' }}
												/>
												Pidana
											</div>
											<div className='keterangan-graph-all'>
												<div
													className='keterangan-indicator'
													style={{ backgroundColor: '#768E7C' }}
												/>
												Perdata
											</div>
											<div className='keterangan-graph-all'>
												<div
													className='keterangan-indicator'
													style={{ backgroundColor: '#392F08' }}
												/>
												Hukum
											</div>
											<div className='keterangan-graph-all'>
												<div
													className='keterangan-indicator'
													style={{ backgroundColor: '#0D461B' }}
												/>
												Kepegawaian
											</div>
											<div className='keterangan-graph-all'>
												<div
													className='keterangan-indicator'
													style={{ backgroundColor: '#F8E086' }}
												/>
												Umum dan Keuangan
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-20px'>
						<div className='wrapperSection'>
							<p className='titleSection'>Log Aktifitas Terakhir</p>
							{/* <div className='dateSection'>
						<p className='txtLastUpdate'>Last Update:</p>
						<Gap width={10} />
						<p className='txtValueLastUpdate'>22 Februari 2021</p>
					</div> */}
						</div>

						<div className='c-table-main'>
							<table className='table-main'>
								<thead className='table-main-thead'>
									<tr>
										{/* <th className='table-main-th' style={{ width: '5%' }}>
									No.
								</th> */}
										<th className='table-main-th' style={{ width: '30%' }}>
											User
										</th>
										{/* <th className='table-main-th' style={{ width: '20%' }}>
									Tanggal
								</th>
								<th className='table-main-th' style={{ width: '15%' }}>
									Waktu
								</th> */}
										<th className='table-main-th' style={{ width: '30%' }}>
											Aktifitas
										</th>
									</tr>
								</thead>

								<tbody className='table-main-tbody'>
									{dtTableHome === null
										? null
										: dtTableHome.map((dt, i) => (
												<tr key={i} className='table-main-nth-child'>
													{/* <td className='table-main-td'>{i + 1}</td> */}
													<td
														className='table-main-td'
														style={{ textAlign: 'left' }}
													>
														{dt.user}
													</td>
													{/* <td className='table-main-td'>
												{moment(dt.tanggal).utc().format('yyyy-MM-DD')}
											</td>
											<td className='table-main-td'>
												{moment(dt.waktu, 'h:mm ').format('h:mm ')}
											</td> */}
													<td className='table-main-td'>{dt.aktifitas}</td>
												</tr>
										  ))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
