import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity} from 'react-native'
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
            <View>
                <Text>Register</Text>
                <View >
                    <TextInput
                        placeholder="Email"
                        keyboardType="Email-Adress"
                        onChangeText={text => { this.setState({ email: text, disabled: false}) }} //setemoas el estado y la info que ponga el usuario se guardara alli
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

                    {
                        this.state.showCamera ?
                        <View style={{width: '100vw', heigth: '100vh'}}>
                            <MyCamera onImageUpload={url => this.onImageUpload(url)}/> 
                        </View> 
                        :
                        <TouchableOpacity onPress={()=> this.setState({showCamera:true})}>
                            <Text>Subir foto de perfil</Text>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity disabled={this.state.disabled} onPress={() => this.registerUser(this.state.email, this.state.password, this.state.userName, this.state.bio, this.state.fotoPerfil )}>
                        <Text>Register</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
    


}
export default Register