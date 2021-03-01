/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import Gap from '../../components/Gap';
import './login.scss';

import { BsChevronLeft } from 'react-icons/bs';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const Login = (props) => {
	const [fragment, setFragment] = useState('loginA');

	const [showPass, setShowPass] = useState(false);

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
						<p className='titleInput'>ID</p>
						<input className='input' placeholder='Masukkan Email atau ID' />
						<Gap height={20} />
						<p className='titleInput'>Password</p>
						<div className='input'>
							<input
								className='input2'
								type={showPass ? 'text' : 'password'}
								placeholder='Masukkan Password'
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
							onClick={() => props.history.push('/sys/home')}
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
