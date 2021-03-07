import React, { useEffect, useState } from 'react';
import './account.scss';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import ModalConfirmation from '../../components/modal/ModalConfirmation';
import {
	GetUserDetail,
	UpdateUserHandler,
} from '../../configs/handler/UsersHandler';

const Account = () => {
	const [dataUser, setDataUser] = useState({
		name: '',
		username: '',
	});

	const [newDataUser, setNewDataUser] = useState({
		name: '',
		oldPass: '',
		newPass: '',
		renewPass: '',
	});

	const [showPass, setShowPass] = useState(false);
	const [showNewPass, setShowNewPass] = useState(false);
	const [showRenewPass, setShowRenewPass] = useState(false);

	useEffect(() => {
		const getDataUser = () => {
			const datUser = JSON.parse(localStorage.getItem('@user'));

			GetUserDetail(datUser.username)
				.then((res) => {
					if (res.status === 200) {
						setDataUser({ name: res.data.name, username: res.data.username });
						setNewDataUser({ ...newDataUser, name: datUser.name });
					}
				})
				.catch((err) => {
					console.log('err get us', err);
				});
		};

		getDataUser();
	}, []);

	const changeDataUser = () => {
		const datUser = JSON.parse(localStorage.getItem('@user'));
		console.log('datUser', datUser);

		if (
			newDataUser.name !== '' &&
			newDataUser.oldPass !== '' &&
			newDataUser.newPass === '' &&
			newDataUser.renewPass === ''
		) {
			if (newDataUser.oldPass === '' || newDataUser.name === '') {
				alert('Nama dan/atau Kata Sandi tidak boleh kosong');
			} else {
				UpdateUserHandler(
					dataUser.username,
					newDataUser.name,
					newDataUser.oldPass,
					newDataUser.oldPass
				)
					.then((res) => {
						console.log('ress update user', res);
						if (res.status === 400) {
							alert('Kata Sandi lama anda tidak sesuai');
						}
						if (res.status === 200) {
							alert('berhasil cuk');
							var newDataLocal = { ...datUser, name: res.data.name };
							localStorage.setItem('@user', newDataLocal);
						}
					})
					.catch((err) => {
						console.log('err update user', err);
					});
			}
		} else {
			if (newDataUser.newPass !== newDataUser.renewPass) {
				alert('Kata Sandi baru dan Ulangi Kata Sandi baru tidak cocok');
			} else {
				if (newDataUser.oldPass === '' || newDataUser.name === '') {
					alert('Nama dan atau Kata sandi lama tidak boleh kosong');
				} else {
					UpdateUserHandler(
						dataUser.username,
						newDataUser.name,
						newDataUser.oldPass,
						newDataUser.newPass
					)
						.then((res) => {
							console.log('ress update user', res);
							if (res.status === 400) {
								alert('Kata Sandi lama anda tidak sesuai');
							}
							if (res.status === 200) {
								alert('new password success');
							}
						})
						.catch((err) => {
							console.log('err update user', err);
						});
				}
			}
		}

		// if (newDataUser.oldPass === '') {
		// 	alert('Kata Sandi tidak boleh Kosong');
		// } else if (
		// 	newDataUser.oldPass !== '' &&
		// 	newDataUser.newPass === '' &&
		// 	newDataUser.renewPass === ''
		// ) {
		// 	//KONDISI JIKA USER INGIN UBAH NAMA SAJA
		// 	if (newDataUser.name === '') {
		// 		alert('Nama tidak boleh kosong');
		// 	} else {

		// 	}
		// } else if (
		// 	newDataUser.oldPass !== '' &&
		// 	newDataUser.newPass !== '' &&
		// 	newDataUser.renewPass !== ''
		// ) {
		// 	//KONDISI JIKA USER MERUBAH PASSWORD MENJADI PASSWORD
		// 	if (newDataUser.newPass !== newDataUser.renewPass) {
		// 		alert('Kata Sandi baru dan Ulangi Kata sandi baru tidak cocok');
		// 	} else {
		// 		if (newDataUser.name === '') {
		// 			alert('Nama tidak boleh kosong');
		// 		} else {
		// 			UpdateUserHandler(
		// 				dataUser.username,
		// 				newDataUser.name,
		// 				newDataUser.oldPass,
		// 				newDataUser.newPass
		// 			)
		// 				.then((res) => {
		// 					console.log('ress update user', res);
		// 					if (res.status === 400) {
		// 						alert('Kata Sandi lama anda tidak sesuai');
		// 					}
		// 					if (res.status === 200) {
		// 						alert('new password success');
		// 					}
		// 				})
		// 				.catch((err) => {
		// 					console.log('err update user', err);
		// 				});
		// 		}
		// 	}
		// } else {
		// 	alert('Password tidak boleh kosong');
		// }
	};

	return (
		<div className='c-main'>
			<div className='container-fluid custom-container-fluid fade show mb-5px'>
				<p className='txtWelcome mb-50px'>Selamat Datang, {dataUser.name}!</p>
				<div className='wrapperAkun'>
					<div className='infoAkun'>
						<p className='title mb-30px'>Informasi Akun</p>
						<p className='text-input-title-1'>Nama Lengkap</p>
						<input
							className='form-input-2 mb-20px'
							placeholder='Jordi Alba'
							// disabled
							value={newDataUser.name}
							onChange={(e) =>
								setNewDataUser({ ...dataUser, name: e.target.value })
							}
						/>
						<p className='text-input-title-1'>NIK / ID</p>
						<input
							className='form-input-3'
							placeholder='317506546461651'
							disabled
							value={dataUser.username}
						/>
					</div>
					<div className='passAkun'>
						<p className='title mb-30px'>Ubah Kata Sandi</p>
						<p className='text-input-title-1'>Kata Sandi Anda</p>
						<div className='input mb-20px'>
							<input
								className='input2'
								type={showPass ? 'text' : 'password'}
								placeholder='Masukkan kata sandi Anda'
								onChange={(e) => {
									setNewDataUser({ ...newDataUser, oldPass: e.target.value });
								}}
							/>
							{showPass ? (
								<AiOutlineEyeInvisible
									className='iconInput'
									size={20}
									onClick={() => setShowPass(!showPass)}
								/>
							) : (
								<AiOutlineEye
									className='iconInput'
									size={20}
									onClick={() => setShowPass(!showPass)}
								/>
							)}
						</div>
						{/* <input
							className='form-input-2 mb-20px'
							placeholder='Masukkan kata sandi Anda'
							// value={dataArchive.no_perkara}
						/> */}
						<p className='text-input-title-1'>Kata Sandi baru Anda</p>
						<div className='input mb-20px'>
							<input
								className='input2'
								type={showNewPass ? 'text' : 'password'}
								placeholder='Masukkan Kata Sandi baru Anda'
								onChange={(e) => {
									setNewDataUser({ ...newDataUser, newPass: e.target.value });
								}}
							/>
							{showNewPass ? (
								<AiOutlineEyeInvisible
									className='iconInput'
									size={20}
									onClick={() => setShowNewPass(!showNewPass)}
								/>
							) : (
								<AiOutlineEye
									className='iconInput'
									size={20}
									onClick={() => setShowNewPass(!showNewPass)}
								/>
							)}
						</div>
						{/* <input
							className='form-input-2 mb-20px'
							placeholder='Masukkan kata sandi baru Anda'
							// value={dataArchive.no_perkara}
						/> */}
						<p className='text-input-title-1'>Ulangi Kata Sandi baru Anda</p>
						<div className='input mb-20px'>
							<input
								className='input2'
								type={showRenewPass ? 'text' : 'password'}
								placeholder='Ulangi Kata Sandi baru Anda'
								onChange={(e) => {
									setNewDataUser({ ...newDataUser, renewPass: e.target.value });
								}}
							/>
							{showRenewPass ? (
								<AiOutlineEyeInvisible
									className='iconInput'
									size={20}
									onClick={() => setShowRenewPass(!showRenewPass)}
								/>
							) : (
								<AiOutlineEye
									className='iconInput'
									size={20}
									onClick={() => setShowRenewPass(!showRenewPass)}
								/>
							)}
						</div>
						{/* <input
							className='form-input-2 mb-50px'
							placeholder='Ulangi kata sandi baru Anda'
							// value={dataArchive.no_perkara}
						/> */}
						<div
							className='btn-submit mb-20px col-sm-12'
							// onClick={() => console.log('dataarchive', dataArchive)}
							data-bs-toggle='modal'
							data-bs-target='#submitModal'
						>
							<div>Perbarui Kata Sandi</div>
						</div>
					</div>
				</div>
			</div>
			<ModalConfirmation
				id='submitModal'
				title='Submit Data'
				description='Apa kamu yakin untuk merubah data Anda?'
				classBtnYes='btn-modal-yes-green'
				txtBtnYes='Submit'
				txtBtnNo='Cancel'
				// onSubmit={() => alert('Berhasil Submit')}
				onSubmit={changeDataUser}
			/>
		</div>
	);
};

export default Account;
