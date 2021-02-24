import Gap from '../../components/Gap';
import './home.scss';

function Home(props) {
	return (
		<div className='c-main'>
			<div className='container-fluid custom-container-fluid fade show mb-5'>
				<p className='txtWelcome'>Selamat Datang, Kim Jong Unch!</p>
				<div className='wrapperGraph row'>
					<div className='graph'>GRAPH HERE</div>
					<Gap width={30} height={30} />
					<div className='cardRekap'>
						<p className='titleRekap'>Rekap E-Arsip</p>
						<div className='infoRekap'>
							<p className='subtitleRekap'>Total Arsip</p>
							<p className='valueRekap'>10.500</p>
						</div>
						<div className='infoRekap'>
							<p className='subtitleRekap'>Total Input Hari Ini</p>
							<p className='valueRekap'>50</p>
						</div>
						<div className='infoRekap'>
							<p className='subtitleRekap'>Presentasi Pertambahan</p>
							<p className='valueRekap'>30%</p>
						</div>
						<div className='infoRekap'>
							<p className='subtitleRekap'>Total User Aktif</p>
							<p className='valueRekap'>32</p>
						</div>
					</div>
				</div>
				<Gap height={22} />
				<div className='wrapperSection'>
					<p className='titleSection'>Log Aktifitas Terakhir</p>
					<div className='dateSection'>
						<p className='txtLastUpdate'>Last Update:</p>
						<Gap width={10} />
						<p className='txtValueLastUpdate'>22 Februari 2021</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
