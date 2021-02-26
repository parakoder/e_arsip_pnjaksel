import React, {useState, useEffect} from 'react'

import Gap from '../../components/Gap';
import './home.scss';

function Home(props) {

    const [dtTableHome, setDtTableHome] = useState(null)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => setDtTableHome(json))
    }, [])

	return (
		<div className='c-main'>
			<div className='container-fluid custom-container-fluid fade show mb-5'>
				<p className='txtWelcome'>Selamat Datang, Kim Jong Unch!</p>
                <div className='wrapperGraph row '>
                    <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 mb-20px">
                        <div className='graph'>
                            GRAPH HERE
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
                
                <div className="c-table-main">
                    <table className="table-main">
                        <thead className="table-main-thead">
                            <tr>
                                <th className="table-main-th" style={{width: '5%'}}>
                                    No.
                                </th>
                                <th className="table-main-th" style={{width: '30%'}}>
                                    User
                                </th>
                                <th className="table-main-th" style={{width: '20%'}}>
                                    Tanggal
                                </th>
                                <th className="table-main-th" style={{width: '15%'}}>
                                    Waktu
                                </th>
                                <th className="table-main-th" style={{width: '30%'}}>
                                    Aktifitas
                                </th>
                            </tr>
                        </thead>

                        <tbody className="table-main-tbody">
                            {dtTableHome === null ? null : dtTableHome.map((dt, i) =>
                                <tr key={i} className="table-main-nth-child">
                                    <td className="table-main-td">{dt.id}</td>
                                    <td className="table-main-td" style={{textAlign: 'left'}}>{dt.name}</td>
                                    <td className="table-main-td">{dt.email}</td>
                                    <td className="table-main-td">{dt.username}</td>
                                    <td className="table-main-td">{dt.website}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                

			</div>
		</div>
	);
}

export default Home;
