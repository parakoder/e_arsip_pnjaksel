/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../../pages/log/log.scss';

function FilterAdmin(props) {
	const [filteredListAdmin, setFilteredListAdmin] = useState(props.listAdmin);

	const [isChecked, setIsChecked] = useState(false);

	const filterName = (name) => {
		const arrName = [...props.listAdmin];

		if (name === '') {
			setFilteredListAdmin(props.listAdmin);
		} else {
			const filteredName = arrName.filter((o) => o.name.includes(name));
			setFilteredListAdmin(filteredName);
		}
	};

	const [isSelected, setIsSelected] = useState([])

	console.log('isSelected', isSelected)

	// useEffect(() => {
	// 	return () => {};
	// }, [filteredListAdmin]);

	useEffect(() => {
		props.onCheckName(isSelected)
	}, [isSelected])

	return (
		<div className='wrapper-log-find-admin'>
			<div className='c-filter-admin'>
				<input
					className='input'
					placeholder='Cari Nama Admin'
					onChange={(e) => filterName(e.target.value)}
				/>
			</div>

			<div className='c-checker-admin'>
				<div className='checker-select-all'>
					<input type='checkbox' /> Semua Admin
				</div>
				<div className='c-checker-select-list'>
					{filteredListAdmin
						? filteredListAdmin.map((dt, i) => (
							<div className='checker-select-list' key={i}>
								<input
									type='checkbox'
									// checked={isChecked}
									// onChange={(e) => {
									// 	console.log('what', e);
									// 	setIsChecked(!isChecked);
									// 	if (isChecked) {
									// 		props.onCheckName(dt.name);
									// 	}
									// }}
									// checked={isSelected.length === 0 ? false : isSelected.find(item => item === dt.name) ? true : false}
									value={isSelected.length === 0 ? false : isSelected.find(item => item === dt.name) ? true : false}
									onChange={() => {
										if (isSelected.find(item => item === dt.name)) {
											isSelected.splice(isSelected.indexOf(dt.name), 1)
											console.log('clear 1', isSelected)
										} else {
											setIsSelected([...isSelected, dt.name])
										}
										
										
										// props.onCheckName(dt.name);
									}}
								/>
								<span>{dt.name}</span>
							</div>
						))
						: null
					}
				</div>
			</div>
		</div>
	);
}

export default FilterAdmin;
