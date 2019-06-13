
import React from "react";
import { render } from "react-dom";
import Graph from "react-graph-vis";
import { Button, Modal, Input } from 'antd';

// const graph = {
//   nodes: [
//     { id: 1, label: "Node 1", color: "#e04141" },
//     { id: 2, label: "Node 2", color: "#e09c41" },
//     { id: 3, label: "Node 3", color: "#e0df41" },
//     { id: 4, label: "Node 4", color: "#7be041" },
//     { id: 5, label: "Node 5", color: "#41e0c9" }
//   ],
//   edges: [{ from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 5 }]
// };

const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  }
};

const events = {
  select: function(event) {
    var { nodes, edges } = event;
    console.log("Selected nodes:");
    console.log(nodes);
    console.log("Selected edges:");
    console.log(edges);
  }
};

class ReactGraph extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			graph : {
				nodes: [
					{ id: 1, label: "Root", color: "#00f6" }
				],
				edges: []
			}, visible: false, nodeName:''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleOk = this.handleOk.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}
	handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({[name]:value});
	}
	showModal = () => {
    this.setState({
      visible: true,
    });
  };
	handleOk = e => {
		console.log(this.state.nodeName);
		let data = this.state.graph;
		data.nodes.push({id:2, label: this.state.nodeName, color:'#fff6'});
		data.edges.push({ from: 1, to: 2 });
    this.setState({
      visible: false, graph: data
		});
		setTimeout(() => {
			console.log(this.state.graph)
		}, 1000);
  };

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
				<Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
					<Input name="nodeName" value={this.state.nodeName} onChange={this.handleChange} />
        </Modal>
				<Graph graph={this.state.graph} options={options} events={events} style={{ height: "640px" }} />
			</div>

		);
	}
}

export default ReactGraph;