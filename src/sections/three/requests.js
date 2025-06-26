import {
  createReceituarios,
  deleteReceituarios,
  editReceituarios,
  fazerDownloadRequest,
  fazerPedidoRequest,
  getReceituarioByIDs,
  getReceituarios,
} from './crud';
import axios from 'axios';

export const searchReceituarios = (queries, setLoading, setReceituarios, sendNotification) => {
  setLoading(true);
  getReceituarios(queries)
    .then((data) => {
      if (data.data) {
        setReceituarios(data.data);
      } else {
        setReceituarios([]);
      }
      setLoading(false);
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

export const fazerDownloadCrud = (receituarioId, userId, setLoading, sendNotification) => {
  setLoading(true);
  console.log(receituarioId)
  fazerDownloadRequest(receituarioId)
  .then((response) => {
    const { nomeArquivo, pdf } = response.data;

    const extension = nomeArquivo.split('.').pop().toLowerCase();

    const mimeTypes = {
      // Documentos
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      odt: 'application/vnd.oasis.opendocument.text',
      rtf: 'application/rtf',
      txt: 'text/plain',
      csv: 'text/csv',

      // Planilhas
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ods: 'application/vnd.oasis.opendocument.spreadsheet',

      // Apresentações
      ppt: 'application/vnd.ms-powerpoint',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      odp: 'application/vnd.oasis.opendocument.presentation',

      // Imagens
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
      bmp: 'image/bmp',
      webp: 'image/webp',
      svg: 'image/svg+xml',
      ico: 'image/x-icon',

      // Áudio
      mp3: 'audio/mpeg',
      wav: 'audio/wav',
      ogg: 'audio/ogg',
      m4a: 'audio/mp4',

      // Vídeo
      mp4: 'video/mp4',
      webm: 'video/webm',
      avi: 'video/x-msvideo',
      mov: 'video/quicktime',
      mkv: 'video/x-matroska',

      // Compactados
      zip: 'application/zip',
      rar: 'application/vnd.rar',
      '7z': 'application/x-7z-compressed',
      tar: 'application/x-tar',
      gz: 'application/gzip',

      // Código / scripts
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
    const byteArray = base64ToUint8Array(pdf); // <- correção aqui
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
    console.log(error.response?.data);
    sendNotification({
      msg: error.response?.data?.message || 'Erro ao baixar o arquivo.',
      variant: 'error',
    });
    setLoading(false);
  });
};

export const createReceituario = (receituario, setLoading, sendNotification, handleClose, setReceituarios) => {
  setLoading(true);
  console.log(receituario);
  createReceituarios(receituario)
    .then((data) => {
      getReceituarios({ id: data.data }).then((data) => {
        if (data.data) {
          setReceituarios(data.data);
        } else {
          setReceituarios([]);
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

export const deleteReceituario = (receituarioID, setLoading, sendNotification, handleClose, setReceituarios) => {
  setLoading(true);
  deleteReceituarios(receituarioID)
    .then((data) => {
      getReceituarios().then((data) => {
        if (data.data) {
          setReceituarios(data.data);
        } else {
          setReceituarios([]);
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

export const editReceituario = (receituario, receituarioID, setLoading, sendNotification, handleClose, setReceituarios) => {
  setLoading(true);
  editReceituarios(receituario, receituarioID)
    .then((data) => {
      getReceituarios({ id: receituario.id }).then((data) => {
        if (data.data) {
          setReceituarios(data.data);
        } else {
          setReceituarios([]);
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
