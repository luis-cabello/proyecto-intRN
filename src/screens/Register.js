import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity} from 'react-native'
import { auth, db } from '../firebase/config'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            userName: '',
            bio: '',
            fotoPerfil: ''
        }
    }
    registerUser(email, password, userName, bio, fotoPerfil) {
        auth.createUserWithEmailAndPassword(email, password)//preguntarle a Ale este tema.
            .then(res => {

                db.collection('users').add({ //la coleccion se crea automaticamente (vendria hacer la tabla)
                    email: email,
                    userName: userName,
                    password: password,
                    bio: bio,
                    fotoPerfil: '',
                    createdAt: Date.now()
                })

                    .then(() => {
                        email: 'email'
                    })
                    .then(() => this.props.navigation.navigate('Login')) //una vez que se registra, que me redirija a una pagina

                    .catch(error => alert(error))

            }) .catch(error => alert(error))
    }

    render() {
        return (
            <View>
                <Text>Registrate</Text>
                <View>
                    <TextInput
                        placeholder="Email"
                        keyboardType="Email-Adress"
                        onChangeText={text => { this.setState({ email: text }) }} //setemoas el estado y la info que ponga el usuario se guardara alli
                        value={this.state.email} />

                    <TextInput
                        placeholder="Password"
                        keyboardType="default"
                        onChangeText={text => { this.setState({ password: text }) }} //setemoas el estado y la info que ponga el usuario se guardara alli
                        value={this.state.password}
                        secureTextEntry={true} />

                    <TextInput
                        placeholder="User name"
                        keyboardType="default"
                        onChangeText={text => { this.setState({ userName: text }) }} //setemoas el estado y la info que ponga el usuario se guardara alli
                        value={this.state.userName} />

                    <TextInput
                        placeholder="Bio"
                        keyboardType="default"
                        onChangeText={text => { this.setState({ bio: text }) }} //setemoas el estado y la info que ponga el usuario se guardara alli
                        value={this.state.bio} />

                    <TextInput
                        placeholder="Photo"
                        keyboardType="?"
                        onChangeText={text => { this.setState({ photo: text }) }} //setemoas el estado y la info que ponga el usuario se guardara alli
                        value={this.state.fotoPerfil} /> 

                    <TouchableOpacity onPress={() => this.registerUser(this.state.email, this.state.password, this.state.userName, this.state.bio)}>
                        <Text>Registrame</Text>
                       
                    </TouchableOpacity>

                </View>
            </View>
        )
    }





}
export default Register