import React from 'react';
import { ClientsPage, ClientAddEdit } from '../Client';
import Navigation from '../Navigation';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import * as ROUTES from '../../constants/routes';

const { Header, Content, Footer, Sider } = Layout;


const App = () => (
  <Router>
    <Redirect to={ROUTES.CLIENTS}/>
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <Navigation />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <h1>
            <strong>REACT CRUD FIRESTORE</strong>
          </h1>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'auto' }}>
          <div style={{ padding: 24, background: '#fff' }}>
            <Route exact path={ROUTES.CLIENTS} component={ClientsPage} />
            <Route path={ROUTES.CLIENTS_EDIT} component={ClientAddEdit} />
            <Route path={ROUTES.CLIENTS_ADD} component={ClientAddEdit} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Powered by WeBuild ©2019</Footer>
      </Layout>
    </Layout>
  </Router>
);

export default App;
