import React, { Component } from 'react';

class PhotoNode extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="node col-6">
				<div className="photoHeader inline">
					<img className="userIcon" src="./JamieDavella.png" />
					<p className="nodeTitle">{this.props.user}</p>
				</div>	
				<div className="photoContainer">
					<img className="familyPhoto" src={this.props.photo} />
					<div className="photoFooter">
						<img className="messageIcon" src="messageicon.png" />
					</div>
				</div>
			</div>
			)
	}
}

export default PhotoNode;

