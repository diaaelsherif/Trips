import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllTrips } from '../../actions/tripActions';
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
		this.props.getAllTrips();
	}

	componentDidUpdate(prevProps) {
		if(prevProps.trips.data !== this.props.trips.data){
			this.setState({trips: this.props.trips.data});
		}
	}

	onTripUpdate(id) {
		const { navigate } = this.props.router;
		navigate('/update/' + id);
	}

	onTripDelete(id) {
		const { navigate } = this.props.router;
		navigate('/delete/' + id);
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

		let content = this.props.trips.loading ? 
        (
            <p>
				<em>Loading...</em>
            </p>
        ) : (
            this.state.trips.length && this.renderAllTripsTable(this.state.trips)
        );

		return (
			<div>
				<h1>All trips</h1>
				<p>Here you cann see all trips</p>
				{content}
			</div>
		);
	}
}

const mapStateToProps = ({trips}) => ({
    trips
});

export default connect(mapStateToProps, {getAllTrips})(withRouter(Trips));