import React from 'react';

interface SquareProps {
	value: string;
	onClick: () => void;
}

const Square: React.FC<SquareProps> = (props) => {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
};

export default Square;
