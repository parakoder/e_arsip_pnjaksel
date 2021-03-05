import { useEffect, useState } from 'react';
import './about.scss';
import Gap from '../../components/Gap';
import { AboutHandler } from '../../configs/handler/AboutHandler';

const About = () => {
	const [dataAbout, setDataAbout] = useState(null);

	useEffect(() => {
		AboutHandler()
			.then((res) => {
				if (res.status === 200) {
					console.log('res about', res.data);
					setDataAbout(res.data);
				}
			})
			.catch((err) => {
				console.log('err about', err);
			});
		return () => {};
	}, []);

	return (
		<div className='c-main'>
			<div className='container-fluid custom-container-fluid fade show mb-5'>
				<div className='row wrapperAbout'>
					<div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-30px'>
						<div className='card-about'>
							<p className='title'>Informasi Aplikasi</p>
							<Gap height={50} />
							<div className='wrapper-detail'>
								<div className='left'>
									<div className='card-info'>
										<p className='subtitle'>App ID</p>
										<p className='info'>
											{dataAbout === null ? '-' : dataAbout.app_id}
										</p>
									</div>
									<Gap height={20} />
									<div className='card-info'>
										<p className='subtitle'>Version</p>
										<p className='info'>
											{dataAbout === null ? '-' : dataAbout.version}
										</p>
									</div>
									<Gap height={20} />
								</div>
								<div className='right'>
									<div className='card-info'>
										<p className='subtitle'>License</p>
										<p className='info'>
											{dataAbout === null ? '-' : dataAbout.license}
										</p>
									</div>
									<Gap height={20} />
									<div className='card-info'>
										<p className='subtitle'>Company / Organization</p>
										<p className='info'>
											{dataAbout === null ? '-' : dataAbout.comp_org}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'>
						<div className='card-about'>
							<p className='title'>Informasi Layanan</p>
							<Gap height={50} />
							<div className='wrapper-detail'>
								<div className='left'>
									<div className='card-info'>
										<p className='subtitle'>Status</p>
										<p className='info'>
											{dataAbout === null ? '-' : dataAbout.status}
										</p>
									</div>
									<Gap height={20} />
									<div className='card-info'>
										<p className='subtitle'>Environment</p>
										<p className='info'>
											{dataAbout === null ? '-' : dataAbout.environment}
										</p>
									</div>
									<Gap height={20} />
								</div>
								<div className='right'>
									<div className='card-info'>
										<p className='subtitle'>Server Version</p>
										<p className='info'>
											{dataAbout === null ? '-' : dataAbout.server_version}
										</p>
									</div>
									<Gap height={20} />
									<div className='card-info'>
										<p className='subtitle'>Configuration ID</p>
										<p className='info'>
											{dataAbout === null ? '-' : dataAbout.config_id}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
