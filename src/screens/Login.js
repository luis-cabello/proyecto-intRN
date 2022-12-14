import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
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
            <View style={styles.container}>
                <Text> Login </Text>
                <View>
                    <TextInput style={styles.input}
                        placeholder='Email'
                        keyboardType='Email-Adress'
                        onChangeText={text => { this.setState({ email: text }) }}
                        value={this.state.email} />

                    <TextInput style={styles.input}
                        placeholder='Password'
                        keyboardType='default'
                        onChangeText={text => { this.setState({ password: text }) }}
                        value={this.state.password}
                        secureTextEntry={true} />


                        <TouchableOpacity style={styles.button} onPress = {() => this.loginUser(this.state.email, this.state.password)}>
                            <Text>Log in</Text>
                        </TouchableOpacity>                     
                        <Text  style={styles.button} onPress = {() => this.props.navigation.navigate('Register')}> Go to Register</Text>

                    

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',   
    },
    input: {
        width: 300,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: '#47cf73',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        color: "white"
    },
    button: {
        backgroundColor: '#47cf73',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
})

export default Login