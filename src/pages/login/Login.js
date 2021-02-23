import { useState } from 'react';
import Gap from '../../components/Gap';
import './login.scss';

import { BsChevronLeft } from 'react-icons/bs';

const Login = (props) => {
	const [fragment, setFragment] = useState('loginA');

	return (
		<div>
			<div className='row wrapperLogin'>
				<div className='col-lg-6 col-xl-6 col-md-6 col-sm-12 left'>
					<img
						className='imgLogo'
<<<<<<< Updated upstream
						// src='../../assets/images/pajs.png'
=======
>>>>>>> Stashed changes
						src={require('../../assets/images/pajs.png').default}
						alt='logo.png'
					/>
				</div>
				{fragment === 'loginA' ? (
					<div className='col-lg-6 col-xl-6 col-md-6 col-sm-12 right'>
						<p className='title'>E-Arsip Pengadilan Tinggi Jakarta Selatan</p>
						<p className='subtitle'>
							Masuk dengan ID dan Password yang terdaftar dalam sistem untuk
							mengakses E-Arsip.{' '}
						</p>
						<input className='input' placeholder='ID atau Email' />
						<Gap height={20} />
						<input className='input' placeholder='Password' />
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
							href
						>
							Tidak Bisa Login?
						</a>
					</div>
				) : (
					<div className='col-lg-6 col-xl-6 col-md-6 col-sm-12 right'>
						<div className='back-btn' style={{ cursor: 'pointer' }}>
							<BsChevronLeft size={20} />
							<div onClick={() => setFragment('loginA')} className='subtitle'>
								Kembali ke Login
							</div>
						</div>
						<Gap height={30} />
						<p className='title'>Bermasalah dengan Login?</p>

						<p className='subtitle'>
							Hubungi IT Support apabila tidak dapat login kedalam aplikasi yang
							disebabkan oleh Lupa password ataupun hal lainnya.
						</p>
						<Gap height={30} />
						<p className='title'>support.IT@pengadilannegrijaksel.com</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Login;
