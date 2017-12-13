import React from 'react';
import styled from 'styled-components';

const WheelStyle = styled.div`
	background: #333;

	section {
		padding: 2em;
		margin: 1em auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#canvas {
		display: inline-block;
		position: absolute;
		left: -1px;
		top: -1px;
		z-index: 5;
	}

	#twrap {
		clip-path: polygon(67px 18px, 67px 252px, 270px 135px);
		-moz-clip-path: polygon(67px 18px, 67px 252px, 270px 135px);
		display: inline-block;
		height: 270px;
		width: 270px;
		position: absolute;
		z-index: 1;
		left: -135px;
		top: -135px;
		background: hsl(0, 100%, 50%);
	}
	#triangle {
		position: absolute;
		top: 50%;
		left: 50%;
	}

	#c2 {
		cursor: default;
	}
	#wheel {
		position: relative;
		line-height: 0;
		user-select: none;
		width: 330px;
		width: 330px;
	}

	#hueSel, #fadeSel {
		position: absolute;
		z-index: 8;
		margin-left: -10px;
		margin-top: -10px;
		pointer-events: none;
	}
	#hueSel {
		top: 0;
		left: 0;
		transform: translate(315px,165px);
	}

	.range {
		content: "";
		position: relative;
		background-image: linear-gradient(to right, rgba(255,255,255,1), rgba(0,0,0,.4));
		border-radius: 25px;
		height: 16px;
		width: 250px; 
		line-height:0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	input[type="range"] {
		--gray: rgba(120,120,120,.6);
		background-color: rgba(0, 0, 0, 0);
		border-radius: 25px;
		box-shadow: 0 0 2px 1px rgba(20,20,20,.9);
		cursor: pointer;
		height: 16px;
		width:280px;
		margin-left:-1px;
		margin-right: -1px;
		outline: none;
		-webkit-appearance: none;
		background-image: linear-gradient(45deg, var(--gray) 25%, transparent 25%, transparent 75%, var(--gray) 75%, var(--gray)), 
		linear-gradient(45deg, var(--gray) 25%, transparent 25%, transparent 75%, var(--gray) 75%, var(--gray));
		background-size:16px 16px;
		background-position:0 0, 8px 8px;
	}

	input[type="range"]::-webkit-slider-thumb {
		content: "";
		border-radius: 50%;
		border: solid 2px rgb(255,255,255);
		height: 22px;
		width: 22px;
		-webkit-appearance: none;
	}
	input[type=number] {
		width: 50px;
		font-size: 1.4em;
		margin-left: 1em;
	}
	.footer {
		margin-top: 1.5em;
		display: flex;
		align-items: center;
		user-select: none;
	}
	svg {
		user-select: none;
	}

	@media (max-width: 600px) {
		height: 2em;
	}
`;

const Wheel = props => (
	<WheelStyle>
		<svg width="20" height="20">
			<defs>
				<mask id="hole">
					<rect width="100%" height="100%" fill="white"/>
					<circle r="8" cx="10" cy="10" fill="black"/>
				</mask>
			</defs>
		</svg>
		<div id="wheel">
			<canvas id="c2"  height="330" width="330"></canvas>
			<div id="triangle">
				<div id="twrap">
					<canvas id="canvas" height="270" width="270"></canvas>
					
				</div>
				<svg id="fadeSel" width="20" height="20">
					<circle id="donut" fill="white" r="10" cx="10" cy="10" mask="url(#hole)" />
				</svg>
			</div>

			<svg id="hueSel" width="20" height="20">
				<circle id="donut" fill="white" r="10" cx="10" cy="10" mask="url(#hole)" />
			</svg>
		</div>
		<div class="footer">
			<div class="range">
				<input class="r" type="range" value="80" min="0" max="100" />
			</div>
			<input type="number" value="80" />
		</div>
	</WheelStyle>
);

export default Wheel;
