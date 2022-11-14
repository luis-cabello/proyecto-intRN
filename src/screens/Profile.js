import React, { Component } from 'react';
import {auth, db} from '../firebase/config';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList, Image} from 'react-native';
import Post from '../components/Post'

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            users: [],
            email: '',
            bio: '',
            fotoPerfil: '',
            posts: [],

            
        }

    }

    componentDidMount(){
        console.log(this.props.route);
        db.collection('users').where('email', '==', this.props.route.params == undefined ? auth.currentUser.email : this.props.route.params.email).onSnapshot(
            docs => {
                //if 
                let users = [];
                docs.forEach(doc => {
                    console.log(doc);
                    users.push({
                        id : doc.id,
                        data: doc.data(),
                        email: doc.data().email,
                        userName : doc.data().userName,
                        bio : doc.data().bio,
                        fotoPerfil : doc.data().fotoPerfil
                    })
                    this.setState({
                        users : users[0]
                    })
                })
            }
            )
            db.collection('posts').where('owner', '==', this.props.route.params == undefined ? auth.currentUser.email : this.props.route.params.email).onSnapshot( 
                docs => {
                    let posts = [];
                    docs.forEach( doc => {
                        posts.push({
                            id: doc.id,
                            data: doc.data()
                        })
                        this.setState({
                            posts: posts
                        })
                    }) 
                }
            )

    }

    componentDidUpdate(){

        const currentEmail = this.props.route.params == undefined ? auth.currentUser.email : this.props.route.params.email;

        console.log(currentEmail);

        if (this.state.email === currentEmail) return;

        db.collection('users').where('email', '==', currentEmail).onSnapshot(
            docs => {
                //if 
                let users = [];
                docs.forEach(doc => {
                    console.log(doc);
                    users.push({
                        id : doc.id,
                        data: doc.data(),
                        email: doc.data().email,
                        userName : doc.data().userName,
                        bio : doc.data().bio,
                        fotoPerfil : doc.data().fotoPerfil
                    })
                    this.setState({
                        users : users[0],
                        email: currentEmail
                    })
                })
            });

        db.collection('posts').where('owner', '==', currentEmail).onSnapshot( 
            docs => {
                let posts = [];
                docs.forEach( doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts
                    })
                }) 
            }
        )

    }

    logout(){
        auth.signOut()
        .then(() => this.props.navigation.navigate('Login'))
    }

    render(){
        
    return(
        <ScrollView>
        <Text>Usuario</Text>
        <Text> {this.state.users.email}</Text>
        <Text> {this.state.users.userName} </Text>
        <Text> {this.state.users.bio} </Text>
        
        <TouchableOpacity onPress={() => this.logout()}> Sign Out</TouchableOpacity>
        <Image
        style={styles.foto}
            source={this.state.users.fotoPerfil}
            resizeMode='cover'
            />
        
        <Text> Lista de sus {this.state.posts.length} posteos  </Text>
        <FlatList 
            data={this.state.posts}
            keyExtractor={ onePost => onePost.id.toString()}
            renderItem={ ({item}) => <Post postData={item} navigation={this.props.navigation} />}
        />       
        </ScrollView>
    )
    }
}

const styles= StyleSheet.create ({

    scroll:{
        flex: 2
    },
    foto:{
        height:500,
        width:500,
        borderRadius:6 ,
        padding: 5,
        alignItems:'center'    
        },

})


export default Profile