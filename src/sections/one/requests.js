import {
  changeCarroPasswords,
  createCarros,
  deleteCarros,
  editCarros,
  fazerPedidoRequest,
  getCarroByIDs,
  getCarros,
} from './crud';

export const searchCarros = (queries, setLoading, setCarros, sendNotification) => {
  setLoading(true);
  getCarros(queries)
    .then((data) => {
      if (data.data) {
        setCarros(data.data);
      } else {
        setCarros([]);
      }
      setLoading(false);
    })
    .catch((error) => {
      sendNotification({ msg: error.title || error.slice(0, 700), variant: 'error' });
      setLoading(false);
    });
};
export const fazerPedidoCrud = (carroid, userid, setLoading, sendNotification) => {
  setLoading(true);
  fazerPedidoRequest(carroid, userid)
    .then((data) => {
      debugger;
      if (data.data.id === 0) {
        sendNotification({
          msg: 'PEDIDO FEITO, UM CONSULTOR O CONTATARÁ LOGO EM DIANTE' || error.slice(0, 700),
          variant: 'success',
        });
      } else {
        sendNotification({
          msg:
            'PEDIDO FEITO, PORÉM SEM ESTOQUE, QUANDO HOUVER ABERTURA DE ESTOQUE CHEGARÁ UM EMAIL' ||
            error.slice(0, 700),
          variant: 'success',
        });
      }
      setLoading(false);
    })
    .catch((error) => {
      sendNotification({ msg: error.title || error.slice(0, 700), variant: 'error' });
      setLoading(false);
    });
};

export const createCarro = (Carro, setLoading, sendNotification, handleClose, setCarros) => {
  setLoading(true);
  createCarros(Carro)
    .then((data) => {
      getCarros({ id: data.data }).then((data) => {
        if (data.data) {
          setCarros(data.data);
        } else {
          setCarros([]);
        }
        setLoading(false);
      });
      setLoading(false);
      handleClose();
    })
    .catch((error) => {
      sendNotification({ msg: error.title || error.slice(0, 700), variant: 'error' });
      setLoading(false);
    });
};

export const deleteCarro = (Carro, setLoading, sendNotification, handleClose, setCarros) => {
  setLoading(true);
  deleteCarros(Carro)
    .then((data) => {
      getCarros().then((data) => {
        if (data.data) {
          setCarros(data.data);
        } else {
          setCarros([]);
        }
        setLoading(false);
      });
      setLoading(false);
      handleClose();
    })
    .catch((error) => {
      sendNotification({ msg: error.title || error.slice(0, 700), variant: 'error' });
      setLoading(false);
    });
};

export const editCarro = (Carro, CarroID, setLoading, sendNotification, handleClose, setCarros) => {
  setLoading(true);
  editCarros(Carro, CarroID)
    .then((data) => {
      getCarros({ id: Carro.id }).then((data) => {
        if (data.data) {
          setCarros(data.data);
        } else {
          setCarros([]);
        }
        setLoading(false);
      });
      setLoading(false);
      handleClose();
    })
    .catch((error) => {
      sendNotification({ msg: error.title || error.slice(0, 700), variant: 'error' });
      setLoading(false);
    });
};
