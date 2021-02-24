import React, {useState, useEffect} from 'react'
import Gap from '../../components/Gap';
import { FiSearch } from 'react-icons/fi';
import { HiFilter } from 'react-icons/hi';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import './archive.scss';

function Archive(props) {

	const [dtTableArchive, setDtTableArchive] = useState(null)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => setDtTableArchive(json))
	}, [])
	

	return (
		<div className='c-main'>
			<div className='container-fluid custom-container-fluid fade show mb-5'>
				<div className='wrapperArchive mb-20px'>
					<div className='headerArchive'>
						<button className='btn-tambah mr-20px mb-10px'
							onClick={() => props.history.push('./archive/tambah')}
						>
							<AiOutlinePlusCircle size={20} color='white' />
							<Gap width={5} />
							Tambah Data
						</button>
						<div className='headerTools '>
							<div className='wrapperInput mr-20px mb-10px' >
								<FiSearch size={20} />
								<Gap width={10} />
								<input className='input' placeholder='Cari Data' />
							</div>
							{/* <Gap width={20} /> */}
							<div className='wrapperFilter  mb-10px'>
								<HiFilter size={20} />
								<Gap width={10} />
								<div>Filter Data</div>
							</div>
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
                                <th className="table-main-th" style={{width: '22%'}}>
                                    No. Perkara
                                </th>
                                <th className="table-main-th" style={{width: '8%'}}>
                                    BOX
                                </th>
                                <th className="table-main-th" style={{width: '22%'}}>
                                    Nama Terdakwa
                                </th>
                                <th className="table-main-th" style={{width: '17%'}}>
									Tanggal Peringiriman
                                </th>
								<th className="table-main-th" style={{width: '13%'}}>
									PDF
                                </th>
								<th className="table-main-th" style={{width: '13%'}}>
                                    Edit
                                </th>
                            </tr>
                        </thead>

                        <tbody className="table-main-tbody">
                            {dtTableArchive === null ? null : dtTableArchive.map((dt, i) =>
                                <tr key={i}>
                                    <td className="table-main-td">{dt.id}</td>
                                    <td className="table-main-td" style={{textAlign: 'left'}}>{dt.website}</td>
                                    <td className="table-main-td">{dt.website}</td>
                                    <td className="table-main-td">{dt.name}</td>
									<td className="table-main-td">{dt.name}</td>
									<td className="table-main-td">{dt.website}</td>
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

export default Archive;
