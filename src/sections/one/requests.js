import {
  changeLembretePasswords,
  createLembretes,
  deleteLembretes,
  editLembretes,
  fazerPedidoRequest,
  getLembreteByIDs,
  getLembretes,
} from './crud';

export const searchLembretes = (queries, setLoading, setLembretes, sendNotification) => {
  setLoading(true);
  getLembretes(queries)
    .then((data) => {
      if (data.data) {
        setLembretes(data.data);
      } else {
        setLembretes([]);
      }
      setLoading(false);
    })
    .catch((error) => {
      sendNotification({ msg: error.title || error.slice(0, 700), variant: 'error' });
      setLoading(false);
    });
};


export const fazerPedidoCrud = (lembreteid, userid, setLoading, sendNotification) => {
  setLoading(true);
  fazerPedidoRequest(lembreteid, userid)
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

export const createLembrete = (Lembrete, setLoading, sendNotification, handleClose, setLembretes) => {
  setLoading(true);
  createLembretes(Lembrete)
    .then((data) => {
      getLembretes({ id: data.data }).then((data) => {
        if (data.data) {
          setLembretes(data.data);
        } else {
          setLembretes([]);
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

export const deleteLembrete = (Lembrete, setLoading, sendNotification, handleClose, setLembretes) => {
  setLoading(true);
  deleteLembretes(Lembrete)
    .then((data) => {
      getLembretes().then((data) => {
        if (data.data) {
          setLembretes(data.data);
        } else {
          setLembretes([]);
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

export const editLembrete = (Lembrete, LembreteID, setLoading, sendNotification, handleClose, setLembretes) => {
  setLoading(true);
  editLembretes(Lembrete, LembreteID)
    .then((data) => {
      getLembretes({ id: Lembrete.id }).then((data) => {
        if (data.data) {
          setLembretes(data.data);
        } else {
          setLembretes([]);
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
