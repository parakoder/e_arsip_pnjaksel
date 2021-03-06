import React, { useState, useEffect } from 'react';

import Gap from '../../components/Gap';
import './home.scss';
import { YearPicker } from 'react-dropdown-date';
import { Bar } from 'react-chartjs-2';

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

		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((json) => setDtTableHome(json));
	}, []);

	const [year, setYear] = useState(2021);

	const a = require('../../components/graph.json');

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
				backgroundColor: 'rgba(248,224,134,1)',
				borderColor: 'rgba(248,224,134,1)',
				borderWidth: 1,
				data: [65, 59, 80, 81, 56, 20, 25, 70, 90, 120, 10, 20],
			},
			{
				label: 'Perdata',
				backgroundColor: 'rgba(118,142,124,1)',
				borderColor: 'rgba(118,142,124,1)',
				borderWidth: 1,
				data: [65, 59, 80, 81, 56, 20, 25, 70, 90, 120, 10, 20],
			},
		],
	});

	useEffect(() => {
		setStateGraph({
			...stateGraph,
			datasets: [
				{
					label: a.data.pdn,
					backgroundColor: 'rgba(248,224,134,1)',
					borderColor: 'rgba(248,224,134,1)',
					borderWidth: 1,
					data: a.data.pidana,
				},
				{
					label: a.data.pdt,
					backgroundColor: 'rgba(118,142,124,1)',
					borderColor: 'rgba(118,142,124,1)',
					borderWidth: 1,
					data: a.data.perdata,
				},
			],
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
								<p className='valueRekap'>10.500</p>
							</div>
							<div className='infoRekap'>
								<p className='subtitleRekap'>Total Input Hari Ini</p>
								<p className='valueRekap'>50</p>
							</div>
							<div className='infoRekap'>
								<p className='subtitleRekap'>Presentasi Pertambahan</p>
								<p className='valueRekap'>30%</p>
							</div>
							<div className='infoRekap'>
								<p className='subtitleRekap'>Total User Aktif</p>
								<p className='valueRekap'>32</p>
							</div>
						</div>
					</div>

					{/* <Gap width={30} height={30} /> */}
				</div>
				{/* <Gap height={22} /> */}
				<div className='wrapperSection'>
					<p className='titleSection'>Log Aktifitas Terakhir</p>
					<div className='dateSection'>
						<p className='txtLastUpdate'>Last Update:</p>
						<Gap width={10} />
						<p className='txtValueLastUpdate'>22 Februari 2021</p>
					</div>
				</div>

				<div className='c-table-main'>
					<table className='table-main'>
						<thead className='table-main-thead'>
							<tr>
								<th className='table-main-th' style={{ width: '5%' }}>
									No.
								</th>
								<th className='table-main-th' style={{ width: '30%' }}>
									User
								</th>
								<th className='table-main-th' style={{ width: '20%' }}>
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
							{dtTableHome === null
								? null
								: dtTableHome.map((dt, i) => (
										<tr key={i} className='table-main-nth-child'>
											<td className='table-main-td'>{dt.id}</td>
											<td
												className='table-main-td'
												style={{ textAlign: 'left' }}
											>
												{dt.name}
											</td>
											<td className='table-main-td'>{dt.email}</td>
											<td className='table-main-td'>{dt.username}</td>
											<td className='table-main-td'>{dt.website}</td>
										</tr>
								  ))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Home;
