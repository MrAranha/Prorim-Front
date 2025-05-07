import { DataGrid, GridActionsCellItem, GridDeleteIcon } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { LoadingScreen } from 'src/components/loading-screen';
import { getUsers } from './requests';
import Iconify from 'src/components/iconify';
import { DeleteUserModal } from './DeleteUserModal';

export const UsersTable = ({
  rows,
  loading,
  setOpenDeleteModal,
  setUserID,
  setOpenEditModal,
  setOpenTrocarSenhaModal,
}) => {
  const [pageSize, setPageSize] = useState(20);
  const columns = [
    {
      field: 'actions',
      type: 'actions',
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Iconify width={24} icon={'mdi:pencil'} />}
          onClick={() => {
            setUserID(params.row['id']);
            setOpenEditModal(true);
          }}
          label="Editar"
        />,
        <GridActionsCellItem
          onClick={() => {
            setUserID(params.row['id']);
            setOpenDeleteModal(true);
          }}
          icon={<GridDeleteIcon />}
          label="Deletar"
        />,
        <GridActionsCellItem
          onClick={() => {
            setUserID(params.row['id']);
            setOpenTrocarSenhaModal(true);
          }}
          icon={<Iconify width={24} icon={'mdi:eye'} />}
          label="Deletar"
        />,
      ],
    },
    { field: 'displayName', headerName: 'Nome', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    { field: 'phoneNumber', headerName: 'Telefone', width: 200 },
    { field: 'country', headerName: 'País', width: 200 },
    { field: 'address', headerName: 'Endereço', width: 200 },
    { field: 'state', headerName: 'Estado', width: 200 },
    { field: 'city', headerName: 'Cidade', width: 200 },
    { field: 'zipCode', headerName: 'CEP', width: 200 },
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
