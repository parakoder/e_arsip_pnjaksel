import './about.scss';
import Gap from '../../components/Gap';

const About = () => {
	return (
		<div className='row wrapperAbout'>
			<div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'>
				<div className='card-about'>
					<p className='title'>Informasi Aplikasi</p>
					<Gap height={50} />
					<div className='card-info'>
						<p className='subtitle'>App ID</p>
						<p className='info'>E-Arsip V.1</p>
					</div>
					<Gap height={20} />
					<div className='card-info'>
						<p className='subtitle'>Version</p>
						<p className='info'>1.0.0</p>
					</div>
					<Gap height={20} />
					<div className='card-info'>
						<p className='subtitle'>License</p>
						<p className='info'>License</p>
					</div>
					<Gap height={20} />
					<div className='card-info'>
						<p className='subtitle'>Company / Organization</p>
						<p className='info'>Pengadilan Tinggi Jakarta Selatan</p>
					</div>
				</div>
			</div>
			<div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'>
				<div className='card-about'>
					<p className='title'>Informasi Layanan</p>
					<Gap height={50} />
					<div className='card-info'>
						<p className='subtitle'>Status</p>
						<p className='info'>Running</p>
					</div>
					<Gap height={20} />
					<div className='card-info'>
						<p className='subtitle'>Environment</p>
						<p className='info'>xyz</p>
					</div>
					<Gap height={20} />
					<div className='card-info'>
						<p className='subtitle'>Server Version</p>
						<p className='info'>1.1.1290</p>
					</div>
					<Gap height={20} />
					<div className='card-info'>
						<p className='subtitle'>Configuration ID</p>
						<p className='info'>12911-219</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
