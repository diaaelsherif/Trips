import React, { Component } from 'react';

export default class Home extends Component {
	render() {
		return (
			<div>
				<h1>Welcome to Trips Manager</h1>
				<p>Use this manager to manage your trips, by:</p>
				<ul>
					<li>Add new trip</li>
					<li>Update a trip</li>
					<li>Delete a trip</li>
					<li>Show all trips</li>
				</ul>
			</div>
		);
	}
}