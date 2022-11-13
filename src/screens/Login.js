import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { auth } from '../firebase/config'
import { Switch } from 'react-native'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            userName: '',
            errors: '',
            rememberMe: ''
        }
    }

    loginUser(email, password) {
        auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                this.props.navigation.navigate('HomeMenu')
            })
            .catch(error => alert(error))
    }
    
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.props.navigation.navigate('HomeMenu')
            } 
           
        })
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


                        <TouchableOpacity onPress = {() => this.loginUser(this.state.email, this.state.password)}>
                            <Text>Log in</Text>
                        </TouchableOpacity>                     
                        <Text onPress = {() => this.props.navigation.navigate('Register')}> Go to Register</Text>

                    

                </View>
            </View>
        )
    }





}

export default Login