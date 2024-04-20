import React, { Component } from 'react';
import axios from 'axios';

import { withRouter } from '../withRouter'

class Update extends Component {
	constructor(props) {
		super(props);

		this.onNameChange = this.onNameChange.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
		this.onDateStartedChange = this.onDateStartedChange.bind(this);
		this.onDateCompletedChange = this.onDateCompletedChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onUpdateCancel = this.onUpdateCancel.bind(this);

		this.state = {
			name: '',
			description: '',
			dateStarted: null,
			dateCompleted: null,
			submitted: false
		}
	}

	componentDidMount() {
		const { id } = this.props.router.params;

		axios.get("api/Trips/SingleTrip/" + id).then(trip => {
			const response = trip.data;

			this.setState({
				name: response.name,
				description: response.description,
				dateStarted: new Date(response.dateStarted).toISOString().slice(0,10),
				dateCompleted: response.dateCompleted ? new Date(response.dateCompleted).toISOString().slice(0,10) : null
			})
		})
	}

	onNameChange(e) {
		this.setState({ name: e.target.value });
	}

	onDescriptionChange(e) {
		this.setState({ description: e.target.value });
	}

	onDateStartedChange(e) {
		this.setState({ dateStarted: e.target.value });
	}

	onDateCompletedChange(e) {
		this.setState({ dateCompleted: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		const { navigate } = this.props.router;
		const { id } = this.props.router.params;

		let tripObject = {
			name: this.state.name,
			description: this.state.description,
			dateStarted: new Date(this.state.dateStarted).toISOString(),
			dateCompleted: this.state.dateCompleted ? new Date(this.state.dateCompleted).toISOString() : null
		}
	
		axios.put("api/Trips/UpdateTrip/" + id, tripObject).then(result => {
			navigate('/trips');
		});
	}

	onUpdateCancel(e) {
		e.preventDefault();
		const { navigate } = this.props.router;
		navigate('/trips');
	}

	render() {
		return (
			<div className="trip-form" >
				<h3>Update trip</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label htmlFor="trip-name">Trip name:  </label>
						<input
							id="trip-name"
							type="text"
							className="form-control"
							value={this.state.name}
							onChange={this.onNameChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="trip-description">Trip description: </label>
						<textarea
							id="trip-description"
							type="text"
							className="form-control"
							value={this.state.description}
							onChange={this.onDescriptionChange}
						/>
					</div>
					<div className="row">
						<div className="col col-md-6 col-sm-6 col-xs-12">
							<div className="form-group">
								<label htmlFor="date-started">Date of start:  </label>
								<input
									id="date-started"
									type="date"
									className="form-control"
									value={this.state.dateStarted}
									onChange={this.onDateStartedChange}
								/>
							</div>
						</div>
						<div className="col col-md-6 col-sm-6 col-xs-12">
							<div className="form-group">
								<label htmlFor="date-completed">Date of completion: </label>
								<input
									id="date-completed"
									type="date"
									className="form-control"
									value={this.state.dateCompleted}
									onChange={this.onDateCompletedChange}
								/>
							</div>
						</div>
					</div>


					<div className="form-group">
						<button onClick={this.onUpdateCancel} className="btn btn-default">Cancel</button>
						<button type="submit" className="btn btn-success">Update</button>
					</div>
				</form>
			</div>
		)
	}
}
export default withRouter(Update);