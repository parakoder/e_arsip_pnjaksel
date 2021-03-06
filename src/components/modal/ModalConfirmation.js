import React from 'react';
import './modalConf.scss';

const ModalConfirmation = ({
	id,
	title,
	description,
	classBtnYes,
	txtBtnYes,
	txtBtnNo,
	onSubmit,
}) => {
	return (
		<div className='modal' id={id} tabIndex='-1' aria-hidden>
			<div className='modal-dialog modal-dialog-centered' id='exampleModal'>
				<div className='modal-content'>
					<div className='wrapperModal'>
						<div className='titleModal'>{title}</div>
						<div className='descModal'>{description}</div>
						<div className='footerModal'>
							<button
								className={classBtnYes}
								onClick={onSubmit}
								data-bs-dismiss='modal'
							>
								{txtBtnYes}
							</button>
							<button className='btn-modal-no' data-bs-dismiss='modal'>
								{txtBtnNo}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalConfirmation;
