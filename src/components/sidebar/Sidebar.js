/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import {
	HiHome,
	HiOutlineHome,
	HiInformationCircle,
	HiOutlineInformationCircle,
} from 'react-icons/hi';
import {
	RiArchiveDrawerFill,
	RiArchiveDrawerLine,
	RiStackFill,
	RiStackLine,
} from 'react-icons/ri';

function Sidebar(props) {

	const [disableFirstLogin, setDisableFirstLogin] = useState(false)

	useEffect(() => {
		// if (props.isFirstLogin) {
		// 	setDisableFirstLogin(true)
		// } else {
		// 	setDisableFirstLogin(false)
		// }
		setDisableFirstLogin(false)
	}, [props.isFirstLogin])
	
	const onActiveCss = {
		// color: '#2893E1'
		fontWeight: 'bold',
		backgroundColor: '#5F764F',
		color: '#FFF',
	};

	const onActiveImg = {
		color: '#FFF',
	};

	const currentLocation = window.location.pathname;

	return (
		<div className='c-sidebar c-sidebar-dark c-sidebar-lg-show c-sidebar-fixed ml-auto'>
			{/* <div style={{  height: '100vh' }}> */}
			<div className='c-sidebar-brand'>
				<img
					className='sidebar-brand-logo'
					src={require('../../assets/images/pajs.png').default}
					alt='icon'
				/>

				<div className='sidebar-brand-text'>
					e-Arsip Pengadilan Tinggi Jakarta Selatan
				</div>
			</div>

			<ul className='sidebar-nav'>
				<li className='sidebar-nav-item'>
					<NavLink
						className='sidebar-nav-link'
						style={disableFirstLogin ? {pointerEvents: 'none', opacity: 0.5} : null}
						to='/sys/home'
						activeClassName='active'
						activeStyle={onActiveCss}
						aria-current='true'
					>
						{currentLocation.includes('/sys/home') ? (
							<HiHome
								className='sidebar-nav-link-img'
								size={18}
								style={
									currentLocation.includes('/sys/home') ? onActiveImg : null
								}
							/>
						) : (
							<HiOutlineHome
								className='sidebar-nav-link-img'
								size={18}
								color='#5F764F'
								style={
									currentLocation.includes('/sys/home') ? onActiveImg : null
								}
							/>
						)}
						Home
					</NavLink>
				</li>
				<li className='sidebar-nav-item'>
					<NavLink
						className='sidebar-nav-link'
						style={disableFirstLogin ? {pointerEvents: 'none', opacity: 0.5} : null}
						to='/sys/archive'
						activeClassName='active'
						activeStyle={onActiveCss}
						aria-current='true'
					>
						{currentLocation.includes('/sys/archive') ? (
							<RiArchiveDrawerFill
								className='sidebar-nav-link-img'
								size={18}
								style={
									currentLocation.includes('/sys/archive') ? onActiveImg : null
								}
							/>
						) : (
							<RiArchiveDrawerLine
								className='sidebar-nav-link-img'
								size={18}
								color='#5F764F'
								style={
									currentLocation.includes('/sys/archive') ? onActiveImg : null
								}
							/>
						)}
						Archive
					</NavLink>
				</li>
				<li className='sidebar-nav-item'>
					<NavLink
						className='sidebar-nav-link'
						style={disableFirstLogin ? {pointerEvents: 'none', opacity: 0.5} : null}
						to='/sys/log'
						activeClassName='active'
						activeStyle={onActiveCss}
						aria-current='true'
					>
						{currentLocation.includes('/sys/log') ? (
							<RiStackFill
								className='sidebar-nav-link-img'
								size={18}
								style={
									currentLocation.includes('/sys/log') ? onActiveImg : null
								}
							/>
						) : (
							<RiStackLine
								className='sidebar-nav-link-img'
								size={18}
								color='#5F764F'
								style={
									currentLocation.includes('/sys/log') ? onActiveImg : null
								}
							/>
						)}
						Log Aktifitas
					</NavLink>
				</li>
				<li className='sidebar-nav-item'>
					<NavLink
						className='sidebar-nav-link'
						style={disableFirstLogin ? {pointerEvents: 'none', opacity: 0.5} : null}
						to='/sys/about'
						activeClassName='active'
						activeStyle={onActiveCss}
						aria-current='true'
					>
						{currentLocation.includes('/sys/about') ? (
							<HiInformationCircle
								className='sidebar-nav-link-img'
								size={18}
								style={
									currentLocation.includes('/sys/about') ? onActiveImg : null
								}
							/>
						) : (
							<HiOutlineInformationCircle
								className='sidebar-nav-link-img'
								size={18}
								color='#5F764F'
								style={
									currentLocation.includes('/sys/about') ? onActiveImg : null
								}
							/>
						)}
						About
					</NavLink>
				</li>
			</ul>

			<div
				className='c-sidebar-logout'
				onClick={() => props.history.push('/login')}
			>
				<span className='txt-logout' style={{ cursor: 'pointer' }}>
					Logout
				</span>
			</div>

			{/* </div>  */}
		</div>
	);
}

export default Sidebar;
