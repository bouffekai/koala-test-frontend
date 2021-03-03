import React from 'react';
import FlightRow from './FlightRow';

class FlightTable extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        selectedContract: null,
      };
  
      this.handleSelectedContract = this.handleSelectedContract.bind(this);
    }
  
    handleSelectedContract(id) {
      this.props.onSelectedContractParent(id);
      this.setState({
        selectedContract: id,
      });
    }
  
    render() {
      const { flights } = this.props;

      return (
        <div
          className={`col-md-6 col-12 contracts-container ${
            this.state.selectedContract ? "d-none d-sm-none d-md-block" : ""
          }`}
        >
          <h2>Your flights</h2>
          {flights.map((flight, k) => {
            return (
              <FlightRow
                onSelectedContract={this.handleSelectedContract}
                key={k}
                f={flight}
              />
            );
          })}
        </div>
      );
    }
  }

  export default FlightTable;