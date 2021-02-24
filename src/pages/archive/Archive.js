import React from 'react';
import Gap from '../../components/Gap';
import { FiSearch } from 'react-icons/fi';
import { HiFilter } from 'react-icons/hi';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import './archive.scss';

const Archive = () => {
	return (
		<div className='c-main'>
			<div className='container-fluid custom-container-fluid fade show mb-5'>
				<div className='wrapperArchive'>
					<div className='headerArchive'>
						<div className='btn-tambah'>
							<AiOutlinePlusCircle size={20} color='white' />
							<Gap width={5} />
							<div>Tambah Data</div>
						</div>
						<div className='headerTools'>
							<div className='wrapperInput'>
								<FiSearch size={20} />
								<Gap width={10} />
								<input className='input' placeholder='Cari Data' />
							</div>
							<Gap width={20} />
							<div className='wrapperFilter'>
								<HiFilter size={20} />
								<Gap width={10} />
								<div>Filter Data</div>
							</div>
						</div>
					</div>
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default Archive;
