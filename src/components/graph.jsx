
import React from "react";
import { render } from "react-dom";
import html2canvas from "html2canvas";
import Graph from "react-graph-vis";
import { Button, Modal, Input } from 'antd';


const options = {
	layout: { improvedLayout: true },
	physics: { enabled: false },
	edges: { color: "#000000", smooth: { type: 'cubicBezier' } },
};
const events = {
	select: function (event) {
		var { nodes, edges } = event;
		console.log("Selected nodes:");
		console.log(nodes);
		console.log("Selected edges:");
		console.log(edges);
	}
};

class ReactGraph extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			graph: {
				nodes: [
					{ id: 1, label: "Root", color: "#00f6" },
					{ id: 2, label: "Node 2", color: "#e09c41" },
					{ id: 3, label: "Node 3", color: "#e0df41" },
					{ id: 4, label: "Node 4", color: "#7be041" },
					{ id: 5, label: "Node 5", color: "#41e0c9" },
					{ id: 6, label: "Node 6", color: "#41e0df" }
				],
				edges: [{ from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 5 }, { from: 1, to: 6 }]
			}, visible: false, nodeName: '', currId: 6
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleOk = this.handleOk.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleCapture = this.handleCapture.bind(this);
	}
	handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({ [name]: value });
	}
	showModal = () => {
		this.setState({
			visible: true,
		});
	};
	handleOk = e => {
		console.log(this.state.nodeName);
		let nodes = this.state.graph.nodes.slice();
		let edges = this.state.graph.edges.slice();
		let currId = this.state.currId;
		currId = currId + 1;
		nodes.push({ id: currId, label: this.state.nodeName, color: '#f0f0f0f0' });
		edges.push({ from: 1, to: currId });
		this.setState({
			visible: false, graph: { nodes, edges }, currId
		});
		setTimeout(() => {
			console.log(this.state)
		}, 1000);
	};
	handleCapture = e => {
		const input = document.getElementById('screen');
		html2canvas(input)
			.then((canvas) => {
				const imgData = canvas.toDataURL('image/png');
				window.location.href=imgData; 
			});
	}
	handleCancel = e => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};
	render() {
		return (
			<div>
				<Button onClick={this.showModal}>Add +</Button>
				<Button onClick={this.handleCapture}>Capture</Button>
				<Modal
					title="Basic Modal"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<Input name="nodeName" value={this.state.nodeName} onChange={this.handleChange} />
				</Modal>
				<div id="screen">
					<Graph graph={this.state.graph} options={options} events={events} style={{ height: "640px" }} />
				</div>
			</div>

		);
	}
}

export default ReactGraph;