import React from 'react';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
	type: "button" | "submit" | "reset" | undefined
}

const OutlineButton: React.FC<ButtonProps> = ({ className, children, ...props }) => {
	return (
		<button className={`rounded bg-transparent text-blue-700 font-semibold border border-transparent active:border-blue-700 active:bg-white hover:underline hover:underline-offset-1 ${className}`}
			{...props}
		>
			{children}
		</button>
	)
}

export default OutlineButton;