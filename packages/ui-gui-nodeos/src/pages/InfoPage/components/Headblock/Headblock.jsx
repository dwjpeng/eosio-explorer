import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import { Col, Form, FormGroup, Label, Button } from 'reactstrap';


import { LoadingSpinner } from 'components';


const Headblock = (props) => {

  // useEffect(()=>{
  //   return () => { props.pollingStop() }
  // }, [])

  let { headblock: { isFetching, data }} = props;
  let { payload : [{block_num, block_id, block}={}]= [], error } = data;

  return (
    <>
      { error ?
        <div className="text-center">
          <p className="text-danger">{JSON.stringify(error)}</p>
          <Button color="primary" onClick={props.pollingStart}>Click to Reload</Button>
        </div>
      : isFetching ? (
        <LoadingSpinner />
      ) : (
        <Form className="form-horizontal">
          <FormGroup row className="mb-0">
            <Col xs="2">
              <Label><strong>Block Number</strong></Label>
            </Col>
            <Col xs="10">
              <p className="form-control-static">{block_num}</p>
            </Col>
          </FormGroup>
          <FormGroup row className="mb-0">
            <Col xs="2">
              <Label><strong>Block ID</strong></Label>
            </Col>
            <Col xs="10">
              <p className="form-control-static">{block_id}</p>
            </Col>
          </FormGroup>
          <FormGroup row className="mb-0">
            <Col xs="2">
              <Label><strong>Timestamp</strong></Label>
            </Col>
            <Col xs="10">
              <p className="form-control-static">{block && block.timestamp}</p>
            </Col>
          </FormGroup>
          <FormGroup row className="mb-0">
            <Col xs="2">
              <Label><strong>Block Producer</strong></Label>
            </Col>
            <Col xs="10">
              <p className="form-control-static">{block && block.producer}</p>
            </Col>
          </FormGroup>
      </Form>
      )}
    </>
  );
}

export default connect(
  ({ headblock }) => ({
    headblock
  }),
  {
  }

)(Headblock);
