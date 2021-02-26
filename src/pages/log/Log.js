import React, {useState, useEffect} from 'react'
import Gap from '../../components/Gap';
import './log.scss';
import { FiSearch } from 'react-icons/fi';
import { HiFilter } from 'react-icons/hi';
import FilterAdmin from '../../components/log/FilterAdmin'


function Log(props) {

	const [dtTableLog, setDtTableLog] = useState(null)
	
	const [filterAdminIsOpen, setFilterAdminIsOpen] = useState(true)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => setDtTableLog(json))
	}, [])


	return (
		<div className='c-main'>
			<div className='container-fluid custom-container-fluid fade show mb-5'>
				<div className='wrapperLog mb-15px'>
					<div className='headerLog'>
						<div className='wrapperInput mb-15px '>
							<FiSearch size={20} />
							<Gap width={10} />
							<input className='input' placeholder='Cari Data' />
						</div>
						{/* <Gap width={20} /> */}
						<div className='wrapperFilter mb-15px ml-20px'>
							<HiFilter size={20} />
							<Gap width={10} />
							<div>Filter Data</div>
						</div>
						{/* <Gap width={20} /> */}

						<div className="group-wrapperFilterAdmin">
							<div className='wrapperFilterAdmin mb-15px ml-20px'
								onClick={() => setFilterAdminIsOpen(!filterAdminIsOpen)}
							>
								<HiFilter size={20} />
								<Gap width={10} />
								<div>Semua Admin</div>
							</div>
							
							{filterAdminIsOpen ?
								<FilterAdmin listAdmin={dtTableLog} />
								: null
							}
						</div>
						
					</div>
					<div></div>
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
                            {dtTableLog === null ? null : dtTableLog.map((dt, i) =>
                                <tr key={i}>
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
};

export default Log;
