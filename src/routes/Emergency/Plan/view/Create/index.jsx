import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../../../components';
import { Button } from 'antd';

class EmergencyNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {

    return (
      <div>
        <PageTitle titles={['应急指挥','应急预案','新建']} />
        
      </div>

    );
  }
}

export default EmergencyNew;
