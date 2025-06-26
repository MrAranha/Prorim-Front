import { DataGrid, GridActionsCellItem, GridDeleteIcon } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { LoadingScreen } from 'src/components/loading-screen';
import Iconify from 'src/components/iconify';
import { localStorageGetItem } from 'src/utils/storage-available';

export const ReceituariosTable = ({
  rows,
  loading,
  setOpenDeleteModal,
  setReceituarioID,
  role,
  setOpenEditModal,
  fazerDownload,
}) => {
  const [pageSize, setPageSize] = useState(20);
  const userid = localStorageGetItem('userid');
  const columns =
    role === 'A'
      ? [
          {
            field: 'actions',
            type: 'actions',
            width: 120,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<Iconify width={24} icon={'mdi:pencil'} />}
                onClick={() => {
                  setReceituarioID(params.row['id']);
                  setOpenEditModal(true);
                }}
                label="Editar"
              />,
              <GridActionsCellItem
                onClick={() => {
                  setReceituarioID(params.row['id']);
                  setOpenDeleteModal(true);
                }}
                icon={<GridDeleteIcon />}
                label="Deletar"
              />,
              <GridActionsCellItem
                onClick={() => {
                  fazerDownload(params.row['id'], userid);
                }}
                icon={<Iconify width={24} icon={'mdi:exclamation'} />}
                label="Estou Interessado!"
              />,
            ],
          },
          { field: 'id', headerName: 'ID', width: 120 },
          { field: 'nomeMedico', headerName: 'Nome do Médico', width: 250 },
          { field: 'nomeArquivo', headerName: 'Nome do Arquivo', width: 250 },
          { field: 'idPaciente', headerName: 'ID do Paciente', width: 200 },
        ]
      : [
          {
            field: 'actions',
            type: 'actions',
            width: 120,
            getActions: (params) => [
              <GridActionsCellItem
                onClick={() => {
                  fazerDownload(params.row['id'], userid);
                }}
                icon={<Iconify width={24} icon={'mdi:Download'} />}
                label="Download"
              />,
            ],
          },
          { field: 'id', headerName: 'ID', width: 120 },
          { field: 'nomeMedico', headerName: 'Nome do Médico', width: 250 },
          { field: 'nomeArquivo', headerName: 'Nome do Arquivo', width: 250 },
          { field: 'idPaciente', headerName: 'ID do Paciente', width: 200 },
        ];

  return (
    <div
      style={{
        height: '500px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
      }}
    >
      {loading ? (
        <LoadingScreen />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 20, 50, 100]}
          disableSelectionOnClick
          pagination
          paginationMode="client"
          onPageChange={(e) => {
            handlePageChange(e);
          }}
        />
      )}
    </div>
  );
};
