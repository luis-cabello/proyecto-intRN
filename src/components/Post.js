import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';

import {auth, db} from '../firebase/config';
import firebase from 'firebase';

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            cantidadDeLikes:this.props.postData.data.likes.length, 
            miLike:false
        }
    }

    componentDidMount(){
        if(this.props.postData.data.likes.includes('pedromainardi45@gmail.com')){ 
            this.setState({
                miLike:true
            })
        }
    }

    like(){
        db.collection('posts')
            .doc(this.props.postData.id) 
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion('pedromainardi45@gmail.com')
            })
            .then(()=> this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes +1,
                miLike: true, 
                })
            )
            .catch(e=>console.log(e))
    }

    unlike(){
        db.collection('posts')
        .doc(this.props.postData.id) 
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion('pedromainardi45@gmail.com')
        })
        .then(()=> this.setState({
            cantidadDeLikes: this.state.cantidadDeLikes -1,
            miLike: false, 
            })
        )
        .catch(e=>console.log(e))
    }

    render(){
        console.log(this.props);
        return(
            <View>
                <Image 
                    style={styles.photo}
                    source={{uri: this.props.postData.data.photo}}
                    resizeMode='cover'
                />
                <Text> {this.props.postData.data.textoPost} </Text>
                <Text>{this.props.postData.data.owner}</Text>
                <Text>{this.props.postData.data.textoPosteo}</Text>
                <Text>Cantidad de Likes: {this.state.cantidadDeLikes} </Text>
                { this.state.miLike ? 
                    <TouchableOpacity onPress={ ()=> this.unlike() }>
                        <Text>Dislike</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={ ()=> this.like() }>
                        <Text>Like</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    photo:{
        height:250
    }
}) 

export default Post;