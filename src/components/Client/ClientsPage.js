import React, { Component } from 'react';
import ClientTable from './ClientTable';
import { withFirebase } from '../Firebase';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class ClientsPage extends Component {
  state = {
    loading: false,
    clients: []
  }

  componentDidMount = _ => {
    this.setState({ loading: true });
    this.onGetClients();
  }

  deleteClientHandler = async (id) => {
    try {
      await this.props.firebase.client(id).delete();
      this.onGetClients();
    } catch (error) {
      alert(`There was an error when trying to delete data.\nError description: ${error}`);
    }
  }

  onGetClients = async _ => {
    try {
      await this.props.firebase.clients().get()
        .then(snapshot => {
          let clients = [];
          snapshot.forEach(doc => {
            clients.push({ key: doc.id, ...doc.data() });
          });
          this.setState({ loading: false, clients: clients });
        });
    } catch (error) {
      alert(`There was an error when trying to fetch data.\nError description: ${error}`);
    }
  }


  render = _ =>
  <div>
    <Link to={ROUTES.CLIENTS_ADD}>
      <Button>
        Add new Client
      </Button>
    </Link>
    <br/>
    <br/>
    <ClientTable data={this.state.clients} onDelete={(id) => this.deleteClientHandler(id)} loading={this.state.loading} />
  </div>;
};


export default withFirebase(ClientsPage);
