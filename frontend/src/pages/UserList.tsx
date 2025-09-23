import React from 'react';
import { Table, Button, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Column } = Table;

const UserList: React.FC = () => {
  const users: any[] = [];
  const loading = false;

  const handleCreate = () => {
    message.info('Created');
  };

  return (
    <div
      style={{
        padding: '24px',
        width: '90%',
        maxWidth: '1400px',
        margin: '40px auto',
        background: 'rgba(255,255,255,0.8)',
        borderRadius: 12,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
      }}
    >
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Novo Usuário
        </Button>
      </div>

      <Table
        dataSource={users}
        loading={loading}
        rowKey="id"
        scroll={{ x: true }}
        style={{ width: '100%' }}
        locale={{
          emptyText: 'Nenhum usuário cadastrado ainda'
        }}
      >
        <Column title="Nome" dataIndex="nome" key="nome" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Tipo" dataIndex="tipo" key="tipo" />
        <Column title="Status" dataIndex="status" key="status" />
        <Column
          title="Ações"
          key="actions"
          render={() => (
            <Space size="middle">
              <Button type="primary" disabled>
                Editar
              </Button>
              <Button type="primary" danger disabled>
                Excluir
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default UserList;
