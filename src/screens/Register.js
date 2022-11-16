import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import { auth, db } from '../firebase/config'
import MyCamera from '../components/MyCamera';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            userName: '',
            bio: '',
            fotoPerfil: '',
            showCamera: false,
            disabled: true
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
                    fotoPerfil: fotoPerfil,
                    createdAt: Date.now()
                })

                    .then(() => {
                        email: 'email'
                    })
                    .then(() => this.props.navigation.navigate('Login')) //una vez que se registra, que me redirija a una pagina
                    

                    .catch(error => alert(error))

            }) .catch(error => alert(error))
    }

    onImageUpload(url){
        this.setState({
            fotoPerfil: url,
            showCamera: false,
        })
        
    }

    render() {
        console.log(this.state.disabled);
        return (
            <View style={styles.container}>
                <Text>Register</Text>
                <View >
                    <TextInput style={styles.input}
                        placeholder="Email"
                        keyboardType="Email-Adress"
                        onChangeText={text => { this.setState({ email: text}) }} //setemoas el estado y la info que ponga el usuario se guardara alli
                        value={this.state.email} />

                    <TextInput style={styles.input}
                        placeholder="Password"
                        keyboardType="default"
                        onChangeText={text => { this.setState({ password: text }) }} //setemoas el estado y la info que ponga el usuario se guardara alli
                        value={this.state.password}
                        secureTextEntry={true} />

                    <TextInput style={styles.input}
                        placeholder="User name"
                        keyboardType="default"
                        onChangeText={text => { this.setState({ userName: text }) }} //setemoas el estado y la info que ponga el usuario se guardara alli
                        value={this.state.userName} />

                    <TextInput style={styles.input}
                        placeholder="Bio"
                        keyboardType="default"
                        onChangeText={text => { this.setState({ bio: text }) }} //setemoas el estado y la info que ponga el usuario se guardara alli
                        value={this.state.bio} />

                    {
                        this.state.showCamera ?
                        <View style={{width: '100vw', heigth: '100vh'}}>
                            <MyCamera onImageUpload={url => this.onImageUpload(url)}/> 
                        </View> 
                        :
                        <TouchableOpacity style={styles.button} onPress={()=> this.setState({showCamera:true})}>
                            <Text>Subir foto de perfil</Text>
                        </TouchableOpacity>
                    }
                    
                    <TouchableOpacity style={styles.button} onPress={() => this.registerUser(this.state.email, this.state.password, this.state.userName, this.state.bio, this.state.fotoPerfil )}>
                        <Text>Register</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1e22',
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

export default Register