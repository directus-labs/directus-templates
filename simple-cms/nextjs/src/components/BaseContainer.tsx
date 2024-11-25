import React from 'react';

interface BaseContainerProps {
	children: React.ReactNode;
}

const BaseContainer: React.FC<BaseContainerProps> = ({ children }) => {
	return <div className="base-container">{children}</div>;
};

export default BaseContainer;
