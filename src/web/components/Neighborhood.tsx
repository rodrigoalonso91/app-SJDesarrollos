import Konva from "konva"
import React from "react"
import {Layer, Rect, Shape, Stage, Text} from "react-konva"
import {Coordinate} from "../../domain/types/Coordinate"

class ColoredRect extends React.Component {
	state = {
		color: "green"
	}
	handleClick = () => {
		this.setState({
			color: Konva.Util.getRandomColor()
		})
	}

	render() {
		return (
			<Rect
				x={20}
				y={20}
				width={50}
				height={50}
				fill={this.state.color}
				shadowBlur={5}
				onClick={this.handleClick}
			/>
		)
	}
}

//TODO perimeter is actually blocks
export default function Neighborhood({perimeter}: { perimeter: Array<Array<Coordinate>> }) {
	// Stage is a div container
	// Layer is actual canvas element (so you may have several canvases in the stage)
	// And then we have canvas shapes inside the Layer
	return (
		<Stage width={window.innerWidth} height={window.innerHeight}>
			<Layer>
				<Text text="Try click on rect"/>
				<ColoredRect/>

				{perimeter.map((block, i) =>
					<Shape
						key={i}
						sceneFunc={(context, shape) => {
							context.beginPath()
							const [start, ...coordinates] = block
							context.moveTo(start.x, start.y)
							coordinates.forEach(({x, y}) => context.lineTo(x, y))
							context.closePath()
							context.fillStrokeShape(shape)
						}}
						fill="#00D2FF"
						stroke="black"
						strokeWidth={4}
					/>
				)}

			</Layer>
		</Stage>
	)
}

/*
<Shape
    sceneFunc={(context, shape) => {
        context.beginPath();
        context.moveTo(20, 50);
        context.lineTo(220, 80);
        context.quadraticCurveTo(150, 100, 260, 170);
        context.closePath();
        // (!) Konva specific method, it is very important
        context.fillStrokeShape(shape);
    }}
    fill="#00D2FF"
    stroke="black"
    strokeWidth={4}
/>*/
