import React, { Component } from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
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
<View style={styles.container}>
            <View style={styles.photo}> 
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

                    <TouchableOpacity style={styles.button} onPress={() => this.createPost(this.state.textoPosteo, this.state.photo)}>
                        <Text> Done </Text>
                    </TouchableOpacity> 
                </View> 
            </View>
            }
            </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    photo: {
        height: 600,
        borderRadius:6 ,
        width: 600,
        margin: 20
        
    },
    container: {
        flex: 1,
        backgroundColor: 'grey',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',   
    },
    button: {
        backgroundColor: '#47cf73',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
})

export default NewPost ; 