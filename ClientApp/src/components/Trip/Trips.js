import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from '../withRouter'

class Trips extends Component {
	constructor(props) {
		super(props)

		this.onTripUpdate = this.onTripUpdate.bind(this);
		this.onTripDelete = this.onTripDelete.bind(this);

		this.state = {
			trips: [],
			loading: true
		}
	}

	componentDidMount() {
		this.populateTripsData();
	}

	onTripUpdate(id) {
		const { navigate } = this.props.router;
		navigate('/update/' + id);
	}

	onTripDelete(id) {
		const { navigate } = this.props.router;
		navigate('/delete/' + id);
	}

	populateTripsData() {
		axios.get("api/Trips/GetTrips").then(result => {
			this.setState({ trips: result.data, loading: false });
		}).catch(function (error) {
			if (error.response) {
				alert('Error Code:' + error.response.status + '\n\nError Data:\n' + error.response.data + '\n\nError Headers:\n' + error.response.headers);
			}
		});
	}

	renderAllTripsTable(trips) {
		return (
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Date started</th>
						<th>Date completed</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{
						trips.constructor === Array ?
							trips.map(trip => (
								<tr key={trip.id}>
									<td>{trip.name}</td>
									<td>{trip.description}</td>
									<td>{new Date(trip.dateStarted).toISOString().slice(0,10)}</td>
									<td>{trip.dateCompleted ? new Date(trip.dateCompleted).toISOString().slice(0,10) : '-'}</td>
									<td>
										<div className="form-group">
											<button onClick={() => this.onTripUpdate(trip.id)} className="btn btn-success">
												Update
											</button>
											<button onClick={() => this.onTripDelete(trip.id)} className="btn btn-danger">
                                        		Delete
                                    		</button>
										</div>
									</td>
								</tr>
							)) : <tr></tr>
					}
				</tbody>
			</table>
		);
	}

	render() {

		let content = this.state.loading ? (
			<p>
				<em>Loading...</em>
			</p>
		) : (
			this.renderAllTripsTable(this.state.trips)
		)

		return (
			<div>
				<h1>All trips</h1>
				<p>Here you cann see all trips</p>
				{content}
			</div>
		);
	}
}
export default withRouter(Trips);