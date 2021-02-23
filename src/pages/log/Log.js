import React from 'react';
import Gap from '../../components/Gap';
import './log.scss';
import { FiSearch } from 'react-icons/fi';
import { HiFilter } from 'react-icons/hi';

const Log = () => {
	return (
		<div className='wrapperLog'>
			<div className='headerLog'>
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
			<div></div>
		</div>
	);
};

export default Log;
