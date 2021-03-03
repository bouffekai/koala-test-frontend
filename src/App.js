import './App.css';
import React from 'react';
import Loader from './Loader';
import FlightTable from './FlightTable';
import FlightDetail from './FlightDetail';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentContract: null,
      allContracts: [],
      loading: false,
    };

    this.handleSelectedContractParent = this.handleSelectedContractParent.bind(
      this
    );
    this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  handleSelectedContractParent(id) {
    this.fetchData(id)
    this.setState({
      currentContract: id,
    });
  }

  handleBack() {
    this.setState({
      currentContract: null,
    });
  }

  fetchData(idContract = null) {
    const endpoint = "http://localhost:9090/contract" + ((idContract) ? '/' + idContract : '/');

    this.setState({ loading: true }, () => {
      fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ 
          allContracts: (!idContract) ? data : this.state.allContracts,
          loading: false,
          currentContract: (idContract) ? data : this.state.currentContract
        })
      });
    })

    
  }

  render() {
    const { allContracts, loading, currentContract   } = this.state;
    return (
      <div className="container">
          {allContracts ? (
            <div className="row">
              <FlightTable
                flights={allContracts}
                onSelectedContractParent={this.handleSelectedContractParent}
              />
              {currentContract && (
                <div className="col-md-6 col-12 contract-container">
                {!loading ? (
                  <FlightDetail
                    contract={currentContract}
                    onBackBtnClicked={this.handleBack}
                  />) : (
                    <Loader />
                  )}
                </div>
              )}
            </div>
          ) : (
            <Loader />
          )}
      </div>
    );
  }
}

export default App;
