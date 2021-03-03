import React from 'react';
import moment from 'moment';
import Loader from './Loader';

class FlightDetail extends React.Component {
    constructor(props) {
      super(props);
  
      this.handleBack = this.handleBack.bind(this);
    }
  
    handleBack(e) {
      e.preventDefault();
      this.props.onBackBtnClicked();
    }
  
    render() {
      const { contract } = this.props;
      const flightDelayed = contract
        ? contract.claim.flightStatus.delay > contract.contract.product.minDelay
        : null;
  
      return (
        <div>
          {!contract && (
            <Loader />
          )}
          {contract && (
            <div>
              <h2 className="contract-detail-h2">Claim summary</h2>
              {flightDelayed && (
                <p className="reason">
                  Unfortunately, this flight was not eligible for compensation.
                  <br />
                  We thank you for your trust
                </p>
              )}
              {!flightDelayed && (
                <p className="reason">
                  Everything is up to date on our end.
                  <br />
                  We thank you for your trust
                </p>
              )}
              <div className="contract-detail">
                <div className="date-destination">
                  <span className="date">
                    {moment(contract.flight.start).format("MMM, DD YYYY")}
                  </span>
                  <div className="d-flex justify-content-around route">
                    <p className="departure">
                      {contract.flight.from.name}
                      <span>({contract.flight.from.iata})</span>
                    </p>
                    <span className="pipe"></span>
                    <p className="arrival">
                      {contract.flight.to.name}
                      <span>({contract.flight.to.iata})</span>
                    </p>
                  </div>
                </div>
                <div className="flight-information">
                  <div className="row">
                    <div className="col-6">
                      <label>Flight n°</label>
                      <span>{contract.flight.name}</span>
                    </div>
                    <div className="col-6">
                      <label>Departure hour</label>
                      <span>{moment(contract.flight.start).format("hh:mm")}</span>
                    </div>
                  </div>
                </div>
                <div className="delay">
                  <div className="row">
                    <div className="col-6">
                      <label>Delay</label>
                      <span
                        className={`delay-time ${
                          flightDelayed ? "red" : "green"
                        }`}
                      >
                        {contract.claim.flightStatus.delay / 60}h
                      </span>
                    </div>
                    <div className="col-6">
                      <label>Required delay</label>
                      <span>{contract.contract.product.minDelay / 60}h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <br />
          <button className="btn back-btn" onClick={this.handleBack}>
            Back
          </button>
        </div>
      );
    }
  }

  export default FlightDetail;