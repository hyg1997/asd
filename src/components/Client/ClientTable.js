import React from 'react';
import { Table, Divider } from 'antd';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const { Column } = Table;

const ClientTable = (props) => (
    <Table dataSource={props.data} loading={props.loading} style={{overflow: 'auto'}}>
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="LastName" dataIndex="lastname" key="lastname" />
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
            title="Action"
            key="action"
            render={(text, record) => (
                <span>
                    <Link to={`${ROUTES.CLIENTS}/${record.key}`}>
                        Edit
                    </Link>
                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={() => props.onDelete(record.key)}>Delete</a>
                </span>
            )}
        />
    </Table>
);

export default ClientTable;