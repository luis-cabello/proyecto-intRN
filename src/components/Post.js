import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
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
        if(this.props.postData.data.likes.includes(auth.currentUser.email)){ 
            this.setState({
                miLike:true
            })
        }
    }

    like(){
        db.collection('posts')
            .doc(this.props.postData.id) 
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
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
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
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
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Profile',{email:this.props.postData.data.owner})}>
                    <Text>Subido por {this.props.postData.data.owner}</Text>
                    </TouchableOpacity>

                { this.state.miLike ? 
                    <TouchableOpacity onPress={ ()=> this.unlike() }>
                        <Text>Dislike</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={ ()=> this.like() }>
                        <Text>Like</Text>
                    </TouchableOpacity>
                }

                <Text>{this.state.cantidadDeLikes} likes </Text>
                <Text>{this.props.postData.data.textoPosteo}</Text>
                
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