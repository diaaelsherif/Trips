import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import Navigate from '../Navigate';

export default class Create extends Component {
	constructor(props) {
		super(props);

		this.onNameChange = this.onNameChange.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
		this.onDateStartedChange = this.onDateStartedChange.bind(this);
		this.onDateCompletedChange = this.onDateCompletedChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		let currentDate = moment().format('YYYY-MM-DD');
		this.state = {
			name: '',
			description: '',
			dateStarted: currentDate,
			dateCompleted: currentDate,
			submitted: false
		}
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
		//const {history} = this.props;

		let tripObject = {
			Id: Math.floor(Math.random()*1000),
			name: this.state.name,
			description: this.state.description,
			dateStarted: this.state.dateStarted,
			dateCompleted: this.state.dateCompleted
		}
	
		axios.post("api/Trips/AddTrip", tripObject).then(result => {
			//history.push('/trips');
			this.setState({ submitted: true });
		});
	}

	render() {
		return (
			<div className="trip-form" >
				<h3>Add new trip</h3>
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
						<input type="submit" value="Add trip" className="btn btn-primary" />
					</div>
				</form>
				{this.state.submitted ? <Navigate nextPage='/trips' /> : <p />}
			</div>
		)
	}
}