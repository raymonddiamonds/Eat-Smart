import React, { Component } from 'react';

class AuthForm extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            username: "Username",
            password: "Password"
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.props.history.push("/")) //this.setState({ data: res.express })
            .catch(err => console.log(err));
    }

    callBackendAPI = async () => {
        const response = await fetch('/authenticate/login');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message) 
        }
        return body;
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        alert('A form was submitted. User: ' +this.state.username 
            +', Pass: ' +this.state.password);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Enter username:
                    <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                </label>
                <label>
                    Enter password:
                    <input type="text" name="password" value={this.state.password} onChange={this.handleInputChange} />
                </label>
                <label>
                    <input type="submit" value="Submit" />
                </label>
            </form>
        )
    }
}

export default AuthForm;
