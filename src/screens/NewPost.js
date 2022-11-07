import React, { Component } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, db } from '../firebase/config'

class NewPost extends Component {
    constructor() {
        super()
        this.state = {
            textoPosteo: '',
            createdAt: '',
            photo: ''
        }
    }



    createPost(texto, photo) {
        db.collection('posts').add({
            owner: auth.currentUser.email,
            textoPosteo: texto,
            photo: photo,
            likes: [],
            comments: [],
            createdAt: Date.now()

        })
            .then(() => {
                this.setState({
                    texto: '',
                })
                this.props.navigation.navigate('Home')
            })
            .catch(error => console.log(error))
    }
    render() {
        return (
            <View>
                <Text> New Post </Text>
                <View>
                    <TextInput
                        placeholder='Texto Posteo'
                        keyboardType='default'
                        onChangeText={text => this.setState({ textoPosteo: text })}
                        value={this.state.textoPosteo}
                    />

                    <TouchableOpacity onPress={() => this.createPost(this.state.textoPosteo, this.state.photo)}>
                        <Text> Guardar</Text>
                    </TouchableOpacity>


                </View>
            </View>
        )
    }

}
export default NewPost ; 