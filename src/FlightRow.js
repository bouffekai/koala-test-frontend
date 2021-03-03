import React from 'react';
import moment from 'moment';
import Suitcase from './suitcase_picto.svg';

class FlightRow extends React.Component {
    constructor(props) {
      super(props);
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(e) {
      e.preventDefault();
      const { f } = this.props;
      this.props.onSelectedContract(f.id);
    }
  
    render() {
      const { f } = this.props;
  
      return (
        <div className="row contract-line" key={f.id} onClick={this.handleClick}>
          <div className="col-2 container-suitcase">
            <img src={Suitcase} alt="" className="suitcase_picto" />
          </div>
          <div className="col-10">
            <span className="date">
              {moment(f.flight.start).format("MMM, DD YYYY")}
            </span>
            <p className="destination">{f.flight.to.name}</p>
            <span className="nbTravelers">{f.flight.seats} travelers</span>
          </div>
        </div>
      );
    }
  }

  export default FlightRow;