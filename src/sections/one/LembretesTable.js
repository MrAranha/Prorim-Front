import { DataGrid, GridActionsCellItem, GridDeleteIcon } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { LoadingScreen } from 'src/components/loading-screen';
import Iconify from 'src/components/iconify';
import { localStorageGetItem } from 'src/utils/storage-available';

export const LembretesTable = ({
  rows,
  loading,
  setOpenDeleteModal,
  setLembreteID,
  role,
  setOpenEditModal,
  fazerPedido,
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
                  setLembreteID(params.row['id']);
                  setOpenEditModal(true);
                }}
                label="Editar"
              />,
              <GridActionsCellItem
                onClick={() => {
                  setLembreteID(params.row['id']);
                  setOpenDeleteModal(true);
                }}
                icon={<GridDeleteIcon />}
                label="Deletar"
              />,
            ],
          },
          { field: 'nomeLembrete', headerName: 'Nome do Lembrete', width: 250 },
          { field: 'DataLembrete', headerName: 'Data do Lembrete', width: 200 },
          { field: 'clienteID', headerName: 'Cliente ID', width: 200 },
          { field: 'tipoTransplante', headerName: 'Tipo de Transplante', width: 200 },
          { field: 'remedio', headerName: 'Remédio', width: 200 },
        ]
      : [
          {
            field: 'actions',
            type: 'actions',
            width: 120,
            getActions: (params) => [
              <GridActionsCellItem
                onClick={() => {
                  fazerPedido(params.row['id'], userid);
                }}
                icon={<Iconify width={24} icon={'mdi:exclamation'} />}
                label="Estou Interessado!"
              />,
            ],
          },
          { field: 'nomeLembrete', headerName: 'Nome do Lembrete', width: 250 },
          { field: 'DataLembrete', headerName: 'Data do Lembrete', width: 200 },
          { field: 'clienteID', headerName: 'Cliente ID', width: 200 },
          { field: 'tipoTransplante', headerName: 'Tipo de Transplante', width: 200 },
          { field: 'remedio', headerName: 'Remédio', width: 200 },
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
        // Show a loading spinner or component when data is being fetched
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
