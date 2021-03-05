import React from 'react';
import './account.scss';
import { IoDocumentOutline } from 'react-icons/io5';

const Account = () => {
	return (
		<div className='c-main'>
			<div className='container-fluid custom-container-fluid fade show mb-5px'>
				<p className='txtWelcome mb-50px'>Selamat Datang, Kim Jong Unch!</p>
				<div className='wrapperAkun'>
					<div className='infoAkun'>
						<p className='title mb-30px'>Informasi Akun</p>
						<p className='text-input-title-1'>Nama Lengkap</p>
						<input
							className='form-input-3 mb-20px'
							placeholder='Jordi Alba'
							disabled
							// value={dataArchive.no_perkara}
						/>
						<p className='text-input-title-1'>NIK / ID</p>
						<input
							className='form-input-3'
							placeholder='317506546461651'
							disabled
							// value={dataArchive.no_perkara}
						/>
					</div>
					<div className='passAkun'>
						<p className='title mb-30px'>Ubah Kata Sandi</p>
						<p className='text-input-title-1'>Kata Sandi Ada</p>
						<input
							className='form-input-2 mb-20px'
							placeholder='Masukkan kata sandi Anda'
							// value={dataArchive.no_perkara}
						/>
						<p className='text-input-title-1'>Kata Sandi baru Anda</p>
						<input
							className='form-input-2 mb-20px'
							placeholder='Masukkan kata sandi baru Anda'
							// value={dataArchive.no_perkara}
						/>
						<p className='text-input-title-1'>Ulangi Kata Sandi baru Anda</p>
						<input
							className='form-input-2 mb-50px'
							placeholder='Ulangi kata sandi baru Anda'
							// value={dataArchive.no_perkara}
						/>
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
		</div>
	);
};

export default Account;
