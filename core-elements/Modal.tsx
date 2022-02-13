import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faXmark
} from '@fortawesome/free-solid-svg-icons'

interface ModalProps {
	isOpen: boolean,
	toggle: Function
}

const style = {
	body: `flex-shrink flex-grow px-4`,
	headerTitle: `text-2xl md:text-3xl font-bold`,
	content: `relative flex flex-col bg-white pointer-events-auto rounded-md p-5`,
	header: `items-start justify-between p-4`,
	container: `fixed top-0 overflow-y-auto left-0 z-40 w-full h-full m-0 flex`,
	overlay: `fixed top-0 left-0 z-30 w-screen h-screen bg-black opacity-50`,
	footer: `flex items-center justify-end p-3`,
	orientation: `mt-12 mx-8 pb-6 max-w-lg md:m-auto md:w-8/12 lg:w-6/12 focus:outline-none`,
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, toggle }) => {
	const ref = useRef<HTMLHeadingElement>(null);

	// close modal when you click on "ESC" key
	React.useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (!isOpen) return;
			if (event.key === 'Escape') {
				toggle(false);
			}
		};
		document.addEventListener('keyup', handleEscape);
		return () => document.removeEventListener('keyup', handleEscape);
	}, [isOpen, toggle]);

	// hide scrollbar and prevent body from moving when modal is open
	//put focus on modal dialogue
	React.useEffect(() => {
		if (!isOpen) return;

		ref.current?.focus();

		const html = document.documentElement;
		const scrollbarWidth = window.innerWidth - html.clientWidth;

		html.style.overflow = 'hidden';
		html.style.paddingRight = `${scrollbarWidth}px`;

		return () => {
			html.style.overflow = '';
			html.style.paddingRight = '';
		};
	}, [isOpen]);

	return (
		<>
			{isOpen && (
				<>
					<div className={style.overlay} />
					<div className={style.container}>
						<div
							aria-modal={true}
							className={style.orientation}
							ref={ref}
							role="dialogue"
							tabIndex={-1}
						>
							<div className={style.content}>
								<button className=' absolute 	top-5 right-5 hover:text-red-600 pr-3' 
									onClick={() => toggle(false)}
								>
									<FontAwesomeIcon size='xs' icon={faXmark} />
								</button>
								<div>
									{children}
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}

const ModalHeader: React.FC = ({ children }) => {
	return (
		<div className={style.header}>
			<h4 className={style.headerTitle}>{children}</h4>
		</div>
	);
}

const ModalBody: React.FC = ({ children }) => {
	return <div className={style.body}>{children}</div>;
}

const ModalFooter: React.FC = ({ children }) => {
	return <div className={style.footer}>{children}</div>;
}

export {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
}