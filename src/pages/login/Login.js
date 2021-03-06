/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import Gap from '../../components/Gap';
import './login.scss';

import { BsChevronLeft } from 'react-icons/bs';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { LoginHandler } from '../../configs/handler/AuthHandler';
import { OnError } from '../../components/toast/CustomToast';
import { MdError } from 'react-icons/md';

const Login = (props) => {
	const [fragment, setFragment] = useState('loginA');

	const [showPass, setShowPass] = useState(false);

	const [error, setError] = useState(false);

	const [onSubmit, setOnSubmit] = useState(false);

	const [authForm, setAuthForm] = useState({
		username: '',
		password: '',
	});

	const login = async () => {
		setOnSubmit(true);
		try {
			const response = await LoginHandler(authForm.username, authForm.password);
			if (response.status === 200) {
				const lclstrg = localStorage.getItem('@user')
					? JSON.parse(localStorage.getItem('@user'))
					: null;
				if (lclstrg !== null) {
					props.history.push('/sys/home');
				}
			} else if (response.status === 403) {
				OnError({
					title: 'Terjadi Kesalahan',
					text: response.message,
				});
				setError(true);
			} else {
				OnError({ title: 'Terjadi Kesalahan' });
				setError(true);
			}
			setOnSubmit(false);
			console.log('res login', response);
		} catch (error) {
			setOnSubmit(false);
			console.log('err login', error);
		}
	};

	return (
		<div>
			<div className='row wrapperLogin'>
				<div className='col-lg-6 col-xl-6 col-md-6 col-sm-12 left'>
					<img
						className='imgLogo'
						src={require('../../assets/images/pajs.png').default}
						alt='logo.png'
					/>
					<Gap height={30} />
					<p className='t1'>Mahkamah Agung Republik Indonesia</p>
					<p className='t2'>Pengadilan Negeri Jakarta Selatan</p>
					<p className='t3'>Kelas 1A Khusus</p>
				</div>
				{fragment === 'loginA' ? (
					<div className='col-lg-6 col-xl-6 col-md-6 col-sm-12 right'>
						<p className='title'>e-Arsip</p>
						<p className='subtitle'>
							Masuk dengan ID dan Password yang terdaftar dalam sistem untuk
							mengakses Dashboard e-Arsip.{' '}
						</p>
						<div className='titleInputWrapper'>
							<p className='titleInput'>NIK / ID</p>
							{error ? (
								<p className='txtAuthError'>
									NIK / ID yang anda masukkan salah
								</p>
							) : null}
						</div>
						<input
							className={error ? 'input-error' : 'input'}
							placeholder='Masukkan Email atau ID'
							type='text'
							onChange={(e) => {
								setAuthForm({ ...authForm, username: e.target.value });
								setError(false);
							}}
						/>
						<Gap height={20} />
						<div className='titleInputWrapper'>
							<p className='titleInput'>Password</p>
							{error ? (
								<p className='txtAuthError'>
									Kata Sandi yang anda masukkan salah
								</p>
							) : null}
						</div>
						<div className={error ? 'input-error' : 'input'}>
							<input
								className='input2'
								type={showPass ? 'text' : 'password'}
								placeholder='Masukkan Password'
								onChange={(e) => {
									setAuthForm({ ...authForm, password: e.target.value });
									setError(false);
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
						<Gap height={50} />
						<button
							className='btn-login'
							// onClick={() => props.history.push('/sys/home')}
							style={onSubmit ? { cursor: 'not-allowed' } : null}
							disabled={onSubmit ? true : false}
							onClick={login}
						>
							Login
						</button>
						<Gap height={20} />
						<a
							onClick={() => setFragment('loginB')}
							className='cannot-login'
							// href
						>
							Tidak Bisa Login?
						</a>
					</div>
				) : (
					<div className='col-lg-6 col-xl-6 col-md-6 col-sm-12 right'>
						<div className='back-btn' style={{ cursor: 'pointer' }}>
							<BsChevronLeft size={20} />
							<div onClick={() => setFragment('loginA')} className='txt-back'>
								Kembali ke Login
							</div>
						</div>
						<Gap height={30} />
						<p className='title'>Login bermasalah?</p>

						<p className='subtitle'>
							Hubungi IT Support apabila tidak dapat login kedalam aplikasi yang
							disebabkan oleh Lupa password ataupun hal lainnya.
						</p>
						<Gap height={30} />

						<p className='txt-support'>support.IT@pengadilannegrijaksel.com</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Login;
