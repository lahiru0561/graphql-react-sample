import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';

const LAUCNES_QUERY = gql`
  query LauchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

class Launches extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="display-4 my-3">Launches</h1>
        <MissionKey />
        <Query query={LAUCNES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4> Loading...</h4>;
            if (error) return console.log(error);
            console.log(data);
            return (
              <Fragment>
                {data.launches.map(launch => {
                  return (
                    <LaunchItem key={launch.flight_number} launch={launch} />
                  );
                })}
              </Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default Launches;
