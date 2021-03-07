/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
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
import { IoPersonOutline } from 'react-icons/io5';
import { LogoutHandler } from '../../configs/handler/AuthHandler';

function Sidebar(props) {
	const history = useHistory();
	const [disableFirstLogin, setDisableFirstLogin] = useState(false);

	useEffect(() => {
		if (props.isFirstLogin) {
			setDisableFirstLogin(true);
			// setDisableFirstLogin(false);
		} else {
			setDisableFirstLogin(false);
			// setDisableFirstLogin(false);
		}
		// setDisableFirstLogin(false);
	}, [props.isFirstLogin]);

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

	const logout = async () => {
		try {
			const datUser = JSON.parse(localStorage.getItem('@user'));
			if (datUser !== null) {
				const response = await LogoutHandler(datUser.access_token);
				console.log('resps logout', response);
				if (response.status === 200) {
					localStorage.clear();
					history.replace('/');
				}
			}
		} catch (error) {
			console.log('error', error);
		}
	};

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
						style={
							disableFirstLogin ? { pointerEvents: 'none', opacity: 0.5 } : null
						}
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
						Beranda
					</NavLink>
				</li>
				<li className='sidebar-nav-item'>
					<NavLink
						className='sidebar-nav-link'
						style={
							disableFirstLogin ? { pointerEvents: 'none', opacity: 0.5 } : null
						}
						to='/sys/archive-pidana'
						activeClassName='active'
						activeStyle={onActiveCss}
						aria-current='true'
					>
						{currentLocation.includes('/sys/archive-pidana') ? (
							<RiArchiveDrawerFill
								className='sidebar-nav-link-img'
								size={18}
								style={
									currentLocation.includes('/sys/archive-pidana')
										? onActiveImg
										: null
								}
							/>
						) : (
							<RiArchiveDrawerLine
								className='sidebar-nav-link-img'
								size={18}
								color='#5F764F'
								style={
									currentLocation.includes('/sys/archive-pidana')
										? onActiveImg
										: null
								}
							/>
						)}
						Arsip Pidana
					</NavLink>
				</li>
				<li className='sidebar-nav-item'>
					<NavLink
						className='sidebar-nav-link'
						style={
							disableFirstLogin ? { pointerEvents: 'none', opacity: 0.5 } : null
						}
						to='/sys/archive-perdata'
						activeClassName='active'
						activeStyle={onActiveCss}
						aria-current='true'
					>
						{currentLocation.includes('/sys/archive-perdata') ? (
							<RiArchiveDrawerFill
								className='sidebar-nav-link-img'
								size={18}
								style={
									currentLocation.includes('/sys/archive-perdata')
										? onActiveImg
										: null
								}
							/>
						) : (
							<RiArchiveDrawerLine
								className='sidebar-nav-link-img'
								size={18}
								color='#5F764F'
								style={
									currentLocation.includes('/sys/archive-perdata')
										? onActiveImg
										: null
								}
							/>
						)}
						Arsip Perdata
					</NavLink>
				</li>
				<li className='sidebar-nav-item'>
					<NavLink
						className='sidebar-nav-link'
						style={
							disableFirstLogin ? { pointerEvents: 'none', opacity: 0.5 } : null
						}
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
						style={
							disableFirstLogin ? { pointerEvents: 'none', opacity: 0.5 } : null
						}
						to='/sys/account'
						activeClassName='active'
						activeStyle={onActiveCss}
						aria-current='true'
					>
						{currentLocation.includes('/sys/account') ? (
							<IoPersonOutline
								className='sidebar-nav-link-img'
								size={18}
								style={
									currentLocation.includes('/sys/account') ? onActiveImg : null
								}
							/>
						) : (
							<IoPersonOutline
								className='sidebar-nav-link-img'
								size={18}
								color='#5F764F'
								style={
									currentLocation.includes('/sys/account') ? onActiveImg : null
								}
							/>
						)}
						Akun
					</NavLink>
				</li>
				<li className='sidebar-nav-item'>
					<NavLink
						className='sidebar-nav-link'
						style={
							disableFirstLogin ? { pointerEvents: 'none', opacity: 0.5 } : null
						}
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
						Tentang
					</NavLink>
				</li>
			</ul>

			<div
				className='c-sidebar-logout'
				// onClick={() => props.history.push('/login')}
				onClick={logout}
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
