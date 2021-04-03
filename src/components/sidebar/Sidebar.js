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
import { OnError } from '../toast/CustomToast';

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
			if (error.request.status === 403) {
				OnError({
					title: 'Error Code: 403',
					text: 'Kesalahan Autentikasi, silahkan Login Kembali',
				});
				history.replace('/login');
				localStorage.clear();
			}
		}
	};

	return (
		<div className='c-sidebar c-sidebar-dark c-sidebar-lg-show c-sidebar-fixed ml-auto'>
			{/* <div style={{  height: '100vh' }}> */}
			<div className='c-sidebar-brand'>
				<img
					className='sidebar-brand-logo'
					src={require('../../assets/images/img_pajs.png').default}
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
						<img
							className='sidebar-nav-link-img'
							alt='ic_beranda.png'
							src={
								require(currentLocation.includes('/sys/home')
									? '../../assets/icons/ic_beranda_active.png'
									: '../../assets/icons/ic_beranda_non.png').default
							}
							style={{ width: 18 }}
						/>
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
						<img
							className='sidebar-nav-link-img'
							alt='ic_pidana.png'
							src={
								require(currentLocation.includes('/sys/archive-pidana')
									? '../../assets/icons/ic_pidana_active.png'
									: '../../assets/icons/ic_pidana_non.png').default
							}
							style={{ width: 18 }}
						/>
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
						<img
							className='sidebar-nav-link-img'
							alt='ic_perdata.png'
							src={
								require(currentLocation.includes('/sys/archive-perdata')
									? '../../assets/icons/ic_perdata_active.png'
									: '../../assets/icons/ic_perdata_non.png').default
							}
							style={{ width: 18 }}
						/>
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
						<img
							className='sidebar-nav-link-img'
							alt='ic_log.png'
							src={
								require(currentLocation.includes('/sys/log')
									? '../../assets/icons/ic_log_active.png'
									: '../../assets/icons/ic_log_non.png').default
							}
							style={{ width: 18 }}
						/>
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
						<img
							className='sidebar-nav-link-img'
							alt='ic_account.png'
							src={
								require(currentLocation.includes('/sys/account')
									? '../../assets/icons/ic_account_active.png'
									: '../../assets/icons/ic_account_non.png').default
							}
							style={{ width: 18 }}
						/>
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
						<img
							className='sidebar-nav-link-img'
							alt='ic_about.png'
							src={
								require(currentLocation.includes('/sys/about')
									? '../../assets/icons/ic_about_active.png'
									: '../../assets/icons/ic_about_non.png').default
							}
							style={{ width: 18 }}
						/>
						Tentang
					</NavLink>
				</li>
			</ul>

			<div className='c-sidebar-logout' onClick={logout}>
				<span className='txt-logout' style={{ cursor: 'pointer' }}>
					Logout
				</span>
			</div>

			{/* </div>  */}
		</div>
	);
}

export default Sidebar;
