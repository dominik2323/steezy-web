import React from 'react';
import Router from 'next/router';
import Div100vh from 'react-div-100vh';
import Header from '../components/Header';
import Button from '../components/Button';

function Error({ statusCode, message = `Něco se rozbilo ...` }) {
  // * if we have status code => server error, otherwise client err
  return (
    <>
      <Header>
        <title>{`Studio STEEZY\u2002/\u2002Error`}</title>
      </Header>
      <Div100vh className={`error`} style={{ height: `100rvh` }}>
        <div className='error__content'>
          <h1>{message}</h1>
          <Button label={`POKRAČOVAT`} handleClick={() => Router.push('/')} />
        </div>
      </Div100vh>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
