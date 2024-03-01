import React from 'react';
import NextError from 'next/error';
import { NextPage } from 'next';

interface ErrorProps {
  statusCode: number;
  err: Error;
}

const MyError: NextPage<ErrorProps> = ({ statusCode }) => <NextError statusCode={statusCode} />;

MyError.getInitialProps = ({ res, err }) => {
  let statusCode = 500;
  if (res) {
    statusCode = res.statusCode;
  } else if (err) {
    statusCode = err.statusCode ?? 500;
  }

  return { statusCode, err } as ErrorProps;
};

export default MyError;
