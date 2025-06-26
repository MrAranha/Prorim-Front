import {
  createLaudos,
  deleteLaudos,
  editLaudos,
  fazerDownloadRequest,
  fazerPedidoRequest,
  getLaudoByIDs,
  getLaudos,
} from './crud';
import axios from 'axios';

export const searchLaudos = (queries, setLoading, setLaudos, sendNotification) => {
  setLoading(true);
  getLaudos(queries)
    .then((data) => {
      if (data.data) {
        setLaudos(data.data);
      } else {
        setLaudos([]);
      }
      setLoading(false);
    })
    .catch((error) => {
      sendNotification({ msg: error.title || error.slice(0, 700), variant: 'error' });
      setLoading(false);
    });
};

export const fazerPedidoCrud = (laudoid, userid, setLoading, sendNotification) => {
  setLoading(true);
  fazerPedidoRequest(laudoid, userid)
    .then((data) => {
      if (data.data.id === 0) {
        sendNotification({
          msg: 'PEDIDO FEITO, UM CONSULTOR O CONTATARÁ LOGO EM DIANTE',
          variant: 'success',
        });
      } else {
        sendNotification({
          msg: 'PEDIDO FEITO, PORÉM SEM ESTOQUE, QUANDO HOUVER ABERTURA DE ESTOQUE CHEGARÁ UM EMAIL',
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

export const createLaudo = (laudo, setLoading, sendNotification, handleClose, setLaudos) => {
  setLoading(true);
  createLaudos(laudo)
    .then((data) => {
      getLaudos({ id: data.data }).then((data) => {
        if (data.data) {
          setLaudos(data.data);
        } else {
          setLaudos([]);
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

export const deleteLaudo = (laudoID, setLoading, sendNotification, handleClose, setLaudos) => {
  setLoading(true);
  deleteLaudos(laudoID)
    .then((data) => {
      getLaudos().then((data) => {
        if (data.data) {
          setLaudos(data.data);
        } else {
          setLaudos([]);
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

export const editLaudo = (laudo, laudoID, setLoading, sendNotification, handleClose, setLaudos) => {
  setLoading(true);
  editLaudos(laudo, laudoID)
    .then((data) => {
      getLaudos({ id: laudo.id }).then((data) => {
        if (data.data) {
          setLaudos(data.data);
        } else {
          setLaudos([]);
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

function base64ToUint8Array(base64) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export const fazerDownloadCrud = (laudoId, userId, setLoading, sendNotification) => {
  setLoading(true);
  fazerDownloadRequest(laudoId)
    .then((response) => {
      const { nomeArquivo, pdf } = response.data;

      const extension = nomeArquivo.split('.').pop().toLowerCase();

      const mimeTypes = {
        pdf: 'application/pdf',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        odt: 'application/vnd.oasis.opendocument.text',
        rtf: 'application/rtf',
        txt: 'text/plain',
        csv: 'text/csv',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ods: 'application/vnd.oasis.opendocument.spreadsheet',
        ppt: 'application/vnd.ms-powerpoint',
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        odp: 'application/vnd.oasis.opendocument.presentation',
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        gif: 'image/gif',
        bmp: 'image/bmp',
        webp: 'image/webp',
        svg: 'image/svg+xml',
        ico: 'image/x-icon',
        mp3: 'audio/mpeg',
        wav: 'audio/wav',
        ogg: 'audio/ogg',
        m4a: 'audio/mp4',
        mp4: 'video/mp4',
        webm: 'video/webm',
        avi: 'video/x-msvideo',
        mov: 'video/quicktime',
        mkv: 'video/x-matroska',
        zip: 'application/zip',
        rar: 'application/vnd.rar',
        '7z': 'application/x-7z-compressed',
        tar: 'application/x-tar',
        gz: 'application/gzip',
        js: 'application/javascript',
        json: 'application/json',
        html: 'text/html',
        css: 'text/css',
        xml: 'application/xml',
        sh: 'application/x-sh',
        py: 'text/x-python',
        c: 'text/x-c',
        cpp: 'text/x-c++src',
      };

      const mimeType = mimeTypes[extension] || 'application/octet-stream';
      const byteArray = base64ToUint8Array(pdf);
      const blob = new Blob([byteArray], { type: mimeType });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nomeArquivo || 'arquivo.bin');
      document.body.appendChild(link);
      link.click();
      link.remove();

      sendNotification({
        msg: 'Arquivo baixado com sucesso.',
        variant: 'success',
      });
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      sendNotification({
        msg: error.response?.data?.message || 'Erro ao baixar o arquivo.',
        variant: 'error',
      });
      setLoading(false);
    });
};
