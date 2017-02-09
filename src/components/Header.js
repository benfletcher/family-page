import React, { Component } from 'react';

class Header extends Component {
	render() {
		return(
				<div className="navButton">
					<p className="navTitle">Gallery
					<a href="www.upload.com">
						<img className="uploadButton" alt="upload" src="upload.png" />
					</a>
					</p>
				</div>
			)
	}
}

export default Header;