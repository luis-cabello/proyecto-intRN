import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

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
       
        if(this.props.postData.data.likes.includes('nico@dh.com')){ 
            this.setState({
                miLike:true
            })
        }
    }

    like(){
        db.collection('posts')
            .doc(this.props.postData.id) 
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion('nico@dh.com') 
            })
            .then(()=> this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes +1,
                miLike: true, 
                })
            )
            .catch(e=>console.log(e))
    }

    unlike(){
      
    }

    render(){
        console.log(this.props);
        return(
            <View>
                <Text> {this.props.postData.data.textoPost} </Text>
                <Text> Cantidad de Likes: {this.state.cantidadDeLikes} </Text>
                { this.state.miLike ? 
                    <TouchableOpacity onPress={ ()=> this.unlike() }>
                        <Text>No me gusta más</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={ ()=> this.like() }>
                        <Text>Me gusta</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

export default Post;