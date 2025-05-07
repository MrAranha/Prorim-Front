import IconButton from '@mui/material/IconButton';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import CloseIcon from '@mui/material/SvgIcon/SvgIcon';
import React, { Fragment, useEffect, useState } from 'react';

const useNotification = () => {
  const [conf, setConf] = useState({});
  const { closeSnackbar } = useSnackbar();
  const action = (key) => (
    <Fragment>
      <IconButton
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        <CloseIcon />
      </IconButton>
    </Fragment>
  );
  useEffect(() => {
    if (conf?.msg) {
      let completeMsg = conf?.msg;
      let variant = 'info';
      if (conf.variant) {
        variant = conf.variant;
      }
      //TODO FAZER UMA MENSAGEM GENERICA DECENTE
      /* if (conf?.errors) {
         for (const [key, value] of Object.entries(conf?.errors)) {
           completeMsg = completeMsg + '\n ' + +"'" + value + "'";
         }
       }
       */
      enqueueSnackbar(completeMsg, {
        variant: variant,
        autoHideDuration: 5000,
        action,
      });
    }
  }, [conf]);
  return [conf, setConf];
};

export default useNotification;
