// CustomModal.js
import { useState } from 'react';

const CustomModal = ({ isOpen, onClose, children }) => {
	// const [isVisible, setIsVisible] = useState(isOpen);

	const closeModal = () => {
		// setIsVisible(false);
		onClose();
	};

	return (
		isOpen && (
			<div className='fixed  inset-0 flex items-center justify-center z-50'>
				<div className='modal-overlay fixed inset-0 bg-black opacity-50'></div>
				<div className='modal-content bg-white absolute z-[200] p-4 rounded-lg md:w-2/4 w-full shadow-lg '>
					{children}
				</div>
			</div>
		)
	);
};

export default CustomModal;
