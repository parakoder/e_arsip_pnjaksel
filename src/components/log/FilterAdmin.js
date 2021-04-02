/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../../pages/log/log.scss';

function FilterAdmin(props) {
	const [filteredListAdmin, setFilteredListAdmin] = useState(props.listAdmin);

	// const [isChecked, setIsChecked] = useState(false);

	const filterName = (name) => {
		const arrName = [...props.listAdmin];

		if (name === '') {
			setFilteredListAdmin(props.listAdmin);
		} else {
			const filteredName = arrName.filter((o) => o.name.includes(name));
			setFilteredListAdmin(filteredName);
		}
	};

	const [isSelected, setIsSelected] = useState(props.dtAdmin)

	console.log('isSelected', isSelected)

	// useEffect(() => {
	// 	return () => {};
	// }, [filteredListAdmin]);

	useEffect(() => {
		// props.onCheckName(isSelected)
		props.setDtAdmin(isSelected)
	}, [isSelected])

	console.log('props.dt.admin', props.dtAdmin)

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

											// isSelected.splice(isSelected.indexOf(dt.name), 1)
											var item = [...isSelected]

											var result = item.splice(item.indexOf(dt.name), 1)

											setIsSelected(result)
											// isSelected.splice(isSelected.indexOf(dt.name), 1)
											console.log('item', result)
											console.log('clear 1', isSelected)
										} else {
											setIsSelected([...isSelected, dt.name])
										}
									}}

									// value={props.dtAdmin.length === 0 ? false : props.dtAdmin.find(item => item === dt.name) ? true : false}
									// onChange={() => {
									// 	console.log('dt.name', dt.name)
									// 	if (props.dtAdmin.find(item => item === dt.name)) {
									// 		props.dtAdmin.splice(props.dtAdmin.indexOf(dt.name), 1)
									// 		console.log('clear 1', props.dtAdmin)
									// 	} else {
									// 		var item  = props.dtAdmin.push(dt.name)
									// 		props.setDtAdmin(item)
									// 	}
									// }}
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
