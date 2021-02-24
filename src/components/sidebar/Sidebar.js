import React from 'react';
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
	const onActiveCss = {
		// color: '#2893E1'
		fontWeight: 'bold',
		backgroundColor: '#E8E8E8',
	};

	const onActiveImg = {
		color: '25282B',
	};

	const currentLocation = window.location.pathname;

	return (
		<div className='c-sidebar c-sidebar-dark c-sidebar-lg-show c-sidebar-fixed ml-auto'>
			{/* <div style={{  height: '100vh' }}> */}
			<div className='c-sidebar-brand'>
				<div className='sidebar-brand-logo'></div>
				<div className='sidebar-brand-text'>
					E-Arsip Pengadilan Tinggi jakarta Selatan
				</div>
			</div>

			<ul className='sidebar-nav'>
				<li className='sidebar-nav-item'>
					<NavLink
						className='sidebar-nav-link'
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
						to='/sys/arsip'
						activeClassName='active'
						activeStyle={onActiveCss}
						aria-current='true'
					>
						{currentLocation.includes('/sys/arsip') ? (
							<RiArchiveDrawerFill
								className='sidebar-nav-link-img'
								size={18}
								style={
									currentLocation.includes('/sys/arsip') ? onActiveImg : null
								}
							/>
						) : (
							<RiArchiveDrawerLine
								className='sidebar-nav-link-img'
								size={18}
								style={
									currentLocation.includes('/sys/arsip') ? onActiveImg : null
								}
							/>
						)}
						Arsip
					</NavLink>
				</li>
				<li className='sidebar-nav-item'>
					<NavLink
						className='sidebar-nav-link'
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
				<span style={{ cursor: 'pointer' }}>Logout</span>
			</div>

			{/* </div>  */}
		</div>
	);
}

export default Sidebar;
