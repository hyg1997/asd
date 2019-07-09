import React, {Component} from 'react';
import {withFirebase} from '../Firebase';

import {
    Input,
    Form,
    InputNumber,
    Button,
    Icon,
} from 'antd';


class ClientAddEdit extends Component {
    state = {
        client: {
            key: '',
            name: '',
            lastname: '',
            age: 1,
            address: ''
        },
        isEditing: false
    };


    componentDidMount = () => {
        const {id} = this.props.match.params;
        if (id !== undefined) {
            this.setState({isEditing: true});
            this.onGetClient(id);
        }
    };

    componentWillUnmount = () => this.mounted = false;

    onGetClient = async id => {
        try {
            await this.props.firebase.client(id).get()
                .then(snapshot => {
                    let client = {key: snapshot.id, ...snapshot.data()};
                    this.setState({client: client});
                });
        } catch (error) {
            alert(`There was an error when trying to fetch data.\nError description: ${error}`);
        }
    };

    onAddClient = async client => {
        try {
            const clientRef = await this.props.firebase.clients();
            clientRef.add(client)
                .then(ref => {
                    console.log('Added client with ID: ', ref.id);
                });
        } catch (error) {
            alert(`There was an error when trying to add client.\nError description: ${error}`);
        }
    };

    onUpdateClient = async (data) => {
        try {
            const clientRef = await this.props.firebase.client(this.state.client.key);
            console.log(clientRef.update(data));
        } catch (error) {
            alert(`There was an error when trying to update client.\nError description: ${error}`);
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.state.isEditing ? this.onUpdateClient(values) : this.onAddClient(values);
                this.props.history.push('/clients');
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="Name">
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: 'Please enter a valid name!'}],
                        initialValue: this.state.client.name
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Name"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Lastname">
                    {getFieldDecorator('lastname', {
                        rules: [{required: true, message: 'Please enter a valid lastname!'}],
                        initialValue: this.state.client.lastname
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Lastname"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Age">
                    {getFieldDecorator('age', {initialValue: this.state.client.age})(<InputNumber min={1} max={150}/>)}
                    <span className="ant-form-text">years</span>
                </Form.Item>
                <Form.Item label="Address">
                    {getFieldDecorator('address', {
                        rules: [{required: true, message: 'Please enter a valid address!'}],
                        initialValue: this.state.client.address
                    })(
                        <Input
                            prefix={<Icon type="home" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Address"
                        />,
                    )}
                </Form.Item>
                <Form.Item wrapperCol={{span: 12, offset: 6}}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedClientAddEdit = Form.create({name: 'client_add_edit'})(ClientAddEdit);

export default withFirebase(WrappedClientAddEdit);