import React, {
	useState,
	// useEffect
} from 'react';
import '../styles/checkFirstLoginPage.scss';
import { RiLockLine, RiLockUnlockLine } from 'react-icons/ri';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import './login/login.scss';
import { FirstLoginHandler } from '../configs/handler/AuthHandler';
import { OnError } from '../components/toast/CustomToast';
import { useHistory } from 'react-router-dom';

import { GetUserDetail } from '../configs/handler/UsersHandler';

function CheckFirstLogin(props) {
	let history = useHistory();
	const [isSuccess, setIsSuccess] = useState(false);

	const [authPass, setAuthPass] = useState({
		newPass: '',
		renewPass: '',
	});

	const datUser = JSON.parse(localStorage.getItem('@user'));

	const [showNewPass, setShowNewPass] = useState(false);
	const [showRenewPass, setShowRenewPass] = useState(false);

	const changePass = () => {
		if (authPass.newPass !== '' && authPass.renewPass !== '') {
			if (authPass.newPass !== authPass.renewPass) {
				alert('Kata Sandi dan Ulangi Kata Sandi Tidak Cocok');
			} else {
				FirstLoginHandler(
					datUser !== null ? datUser.username : null,
					authPass.renewPass,
					false
				)
					.then((res) => {
						console.log('res newAuth', res);
						if (res.status === 201) {
							setIsSuccess(true);
						}
					})
					.catch((err) => {
						if (err.request.status === 403) {
							OnError({
								title: 'Error Code: 403',
								text: 'Kesalahan Autentikasi, silahkan Login Kembali',
							});
							history.replace('/login');
							localStorage.clear();
						}
						console.log('err newAuth', err);
					});
			}
		} else {
			alert('Kata Sandi atau ulangi kata sandi tidak boleh kosong');
		}
	};


	const OnCheckValidFirstLogin = () => {
		GetUserDetail(datUser.username)
			.then(res => {
				console.log('res', res)
				if (res && res.data) {
					var newvalcheck = res.data.first_login

					console.log('newvalcheck', newvalcheck)

					var newarr = {
						...datUser,
						is_first_login: newvalcheck
						// is_first_login: true
					}

					localStorage.setItem('@user', JSON.stringify(newarr))
					window.location.reload()
				}
		})
	}

	console.log('datUser', datUser)

	return (
		<div className='c-main'>
			<div className='container-fluid custom-container-fluid fade show mb-5'>
				<div className='container wrapper-page-check-first-login'>
					{isSuccess === false ? (
						<RiLockLine className='lock-img mb-50px' size={50} />
					) : (
						<RiLockUnlockLine className='lock-img mb-50px' size={50} />
					)}
					{isSuccess ? (
						<p className='txt-1 mb-20px'>Kata Sandi Berhasil Diubah</p>
					) : (
						<p className='txt-1 mb-20px'>
							Anda Belum bisa mengakses e-Arsip Dashboard
						</p>
					)}

					{isSuccess ? (
						<p className='txt-2 mb-50px'>
							Akun Anda telah berhasil merubah Kata Sandi. Gunakan Kata Sandi
							baru Anda untuk mengakses kembali e-Arsip setelah Logout. Apabila
							dibutuhkan, Anda bisa merubah Kata Sandi di Menu Akun.
						</p>
					) : (
						<p className='txt-2 mb-50px'>
							Akun Anda masih belum diperbolehkan mengakses Dashboard secara
							menyeluruh, segera ubah Kata Sandi untuk dapat mengakses e-Arsip.
							Kata Sandi tersebut nantinya adalah Kata Sandi yang akan Anda
							gunakan untuk Login ke e-Arsip.
						</p>
					)}

					<div className='form-input '>
						{isSuccess === false ? (
							<>
								<div className='form-input-group mb-20px'>
									<label className='text-input-title-2 mb-10px'>
										Kata Sandi Baru
									</label>
									<div className='form-input-eye'>
										<input
											className='input2'
											type={showNewPass ? 'text' : 'password'}
											placeholder='Ulangi Kata Sandi Baru'
											onChange={(e) => {
												setAuthPass({
													...authPass,
													newPass: e.target.value,
												});
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
								</div>
								<div className='form-input-group mb-50px'>
									<label className='text-input-title-2 mb-10px'>
										Ulangi Kata Sandi Baru
									</label>
									<div className='form-input-eye'>
										<input
											className='input2'
											type={showRenewPass ? 'text' : 'password'}
											placeholder='Ulangi Kata Sandi Baru'
											onChange={(e) => {
												setAuthPass({
													...authPass,
													renewPass: e.target.value,
												});
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
								</div>

								<button
									className='btn-action'
									// onClick={() => setIsSuccess(!isSuccess)}
									onClick={changePass}
								>
									Ubah Kata sandi
								</button>
							</>
						) : (
							<button
								className='btn-action mt-120px '
								// onClick={() => props.history.push('/sys/home')}
								// onClick={() => window.location.reload()}
									onClick={() => OnCheckValidFirstLogin()}
							>
								Akses Dashboard Sekarang
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default CheckFirstLogin;
