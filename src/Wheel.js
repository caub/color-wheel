import React from 'react';
import styled from 'styled-components';



const WheelStyle = styled.div`
	height: 4em;
	background: orange;

	@media (max-width: 600px) {
		height: 2em;
	}
`;


const Wheel = props => (
	<WheelStyle>
		test 11
	</WheelStyle>
);

export default Wheel;