import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            userName: '',
            errors: ''
        }
    }


    render() {
        return (
            <View>
                <Text> Login </Text>
                <View>
                    <TextInput
                        placeholder='Email'
                        keyboardType='Email-Adress'
                        onChangeText={text => { this.setState({ email: text }) }}
                        value={this.state.email} />

                    <TextInput
                        placeholder='Password'
                        keyboardType='default'
                        onChangeText={text => { this.setState({ password: text }) }}
                        value={this.state.password}
                        secureTextEntry={true} />

                    <Text on onPress={() => this.props.navigation.navigate('Register')}> Ir a Register</Text>

                </View>
            </View>
        )
    }





}

export default Login