import React, { Component } from 'react';
class Home extends Component{
    render() {
        const propsHome = this.props;
        console.log(propsHome);

        return (
            <h1>
                Welcome this is your Home page.
            </h1>
        )
    }
}
export default Home;