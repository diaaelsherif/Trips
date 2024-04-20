import React, {Component} from 'react';
import axios from'axios';

import { withRouter } from '../withRouter'

class Delete extends Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onConfirmation = this.onConfirmation.bind(this);

        this.state = {
            name: "",
            description:"",
            dateStarted: null,
            dateCompleted: null
        }
    }

    componentDidMount(){
        const {id} = this.props.router.params;

        axios.get("api/Trips/SingleTrip/"+id).then(trip => {
            const response = trip.data;

            this.setState({
                name: response.name,
                description: response.description,
                dateStarted: new Date(response.dateStarted).toISOString().slice(0,10),
                dateCompleted: response.dateCompleted ? new Date(response.dateCompleted).toISOString().slice(0,10) : null
            })
        })
    }

    onCancel(e){
        const {navigate} = this.props.router;
        navigate('/trips');
    }

    onConfirmation(e){
        const {id} = this.props.router.params;
        const {navigate} = this.props.router;

        axios.delete("api/Trips/DeleteTrip/"+id).then(result => {
            navigate('/trips');
        })
    }

    render(){
        return (
            <div style={{ marginTop: 10 }}>
            <h2>Delete trip confirmation</h2>
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title"> {this.state.name} </h4>
                    <p class="card-text"> {this.state.description} </p>
                    <button onClick={this.onCancel} class="btn btn-default">
                    Cancel
                    </button>
                    <button onClick={this.onConfirmation} class="btn btn-danger">
                    Confirm
                    </button>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Delete);