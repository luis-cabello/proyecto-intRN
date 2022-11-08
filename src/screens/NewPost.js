import React, { Component } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, db } from '../firebase/config'
import MyCamera from '../components/Mycamera'

class NewPost extends Component {
    constructor() {
        super()
        this.state = {
            textoPosteo: '',
            createdAt: '',
            photo: '', 
            showCamera: true
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
                    showCamera: true,
                })
                this.props.navigation.navigate('Home')
            })
            .catch(error => console.log(error))
    }

    onImageUpload(url){
        this.setState({
            photo: url,
            showCamera: false,
        })
    }
    
    render() {
        return (

            <View> 
            {
                this.state.showCamera ?
                <MyCamera onImageUpload={url => this.onImageUpload(url)}/>
                :
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
                        <Text> Done </Text>
                    </TouchableOpacity> 
                </View> 
            </View>
            }
            </View>

        )
    }

}
export default NewPost ; 