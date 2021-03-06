import React, { Component } from "react";
import _ from "lodash";
import ky from "ky";

import PropTypes from "prop-types";
import { Container, Segment, Search } from "semantic-ui-react";

const { REACT_APP_BACKEND_URL } = process.env;

class SearchComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title });
    this.props.onQuery(result);
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      (async () => {
        const { value } = this.state;
        if (value.length < 1) return this.resetComponent();

        // TODO fill in for fetch
        const source = await ky
          .get(`${REACT_APP_BACKEND_URL}/cities/cities?q=${value}`, {})
          .json();

        const results = source.map(s => {
          return { ...s, title: s.cityName };
        });

        this.setState({
          isLoading: false,
          results
        });
      })();
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Segment>
        <h1>Travelyay</h1>
        <Container>
          <Search
            fluid
            placeholder="Search for a city!"
            input={{ fluid: true }}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 100, {
              leading: true
            })}
            results={results}
            value={value}
            {...this.props}
          />
        </Container>
      </Segment>
    );
  }
}

export default SearchComponent;
