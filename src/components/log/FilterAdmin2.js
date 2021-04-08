/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../../pages/log/log.scss';

function FilterAdmin(props) {
	const [filteredListAdmin, setFilteredListAdmin] = useState(props.listAdmin);
	const [isAllCheck, setIsAllCheck] = useState(props.isAll);

	console.log('filteredLissss', filteredListAdmin);

	useEffect(() => {
		if (
			props.listAdmin.filter((e) => e.isChecked === false).length ===
			props.listAdmin.length
		) {
			setIsAllCheck(true);
		} else {
			setIsAllCheck(false);
		}
	}, [props.listAdmin, props.isAll]);

	const filterName = (name) => {
		const arrName = [...props.listAdmin];

		if (name === '') {
			setFilteredListAdmin(props.listAdmin);
		} else {
			const filteredName = arrName.filter((o) => o.name.includes(name));
			setFilteredListAdmin(filteredName);
		}
	};

	const onCheckName = (stats, name) => {
		var dat = [...filteredListAdmin];

		var index = dat.findIndex((o) => o.name === name);
		dat[index].isChecked = !stats;
		setFilteredListAdmin(dat);
		props.setList(dat);
		if (dat.filter((e) => e.isChecked === false).length === dat.length) {
			setIsAllCheck(true);
		} else {
			setIsAllCheck(false);
		}
	};

	const onAllAdminCheck = () => {
		var dat = [...filteredListAdmin];
		if (filteredListAdmin.filter((e) => e.isChecked === true).length > 0) {
			setIsAllCheck(true);
			for (var i = 0; i < filteredListAdmin.length; i++) {
				dat[i].isChecked = false;
				setFilteredListAdmin(dat);
				props.setList(dat);
			}
		} else if (
			filteredListAdmin.filter((e) => e.isChecked === false).length ===
			filteredListAdmin.length
		) {
			setIsAllCheck(true);
		}
	};

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
					<input
						type='checkbox'
						checked={isAllCheck}
						onChange={onAllAdminCheck}
					/>{' '}
					Semua Admin
				</div>
				<div className='c-checker-select-list'>
					{filteredListAdmin
						? filteredListAdmin.map((dt, i) => (
								<div className='checker-select-list' key={i}>
									<input
										type='checkbox'
										checked={dt.isChecked}
										onChange={() => onCheckName(dt.isChecked, dt.name)}
									/>
									<span>{dt.name}</span>
								</div>
						  ))
						: null}
				</div>
			</div>
		</div>
	);
}

export default FilterAdmin;
