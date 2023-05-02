import React, { useState, useRef } from 'react';
import { Dialog } from '@mui/material';

const NoStrictModeDialog = (props) => {
  return <Dialog {...props}>{props.children}</Dialog>;
};

export default NoStrictModeDialog;
