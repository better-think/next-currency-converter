import React from 'react';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
	id?: string,
	label?: string,
}

const Input: React.FC<InputProps> = ({ id, label, className, ...props}) => {
	return (
		<div className={`${className}`}>
			{
				label && <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
					{label}
				</label>
			}
			<input
				className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700"
				id={id}
				{...props}
			/>
		</div>
	)
}

export default Input;
