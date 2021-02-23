import { useState } from 'react';
import Gap from '../../components/Gap';
import './login.css';

const Login = () => {
	const [fragment, setFragment] = useState('loginA');

	return (
		<div>
			<div className='row wrapper'>
				<div className='col-lg-6 col-xl-6 col-md-6 col-sm-12 left'>
					<img
						className='imgLogo'
						src='../../assets/images/pajs.png'
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
						<button className='btn-login'>Login</button>
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
						<p onClick={() => setFragment('loginA')} className='subtitle'>
							Kembali ke Login
						</p>
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
