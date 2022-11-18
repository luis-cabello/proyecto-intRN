import React, { Component } from 'react';
import {auth, db} from '../firebase/config';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList, Image, Ionicons} from 'react-native';
import Post from '../components/Post'
import Editar from './Editar';

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            users: [],
            email: auth.currentUser.email,
            bio: '',
            fotoPerfil: '',
            posts: [],
            miPerfil:{}
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


    logout(){
        auth.signOut()
        .then(() => this.props.navigation.navigate('Login'))
    }

    render(){
        
    return(
        <ScrollView style={styles.container}>
            <View style={styles.perfil}>
        <Image
        style={styles.foto}
            source={this.state.users.fotoPerfil}
            resizeMode='cover'
            />
            <View style={styles.datos}>
        <TouchableOpacity style={styles.text} onPress={() => this.logout()}> Sign Out</TouchableOpacity>
        <Text style={styles.text}>Usuario</Text>
        <Text style={styles.text}> {this.state.users.email}</Text>
        <Text style={styles.text}> {this.state.users.userName} </Text>
        <Text style={styles.text}> {this.state.users.bio} </Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Editar", {id: this.state.miPerfil.id })}>
         <Text >EDITAR PERFIL</Text>
         </TouchableOpacity>
        </View>
        </View>
      
        <Text style={styles.titulo}> Lista de sus {this.state.posts.length} posteos  </Text>
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
    text:{
        color: "white"
    },
    titulo:{
        fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: 'grey',
        padding: 10,
    },
    foto:{
        height:200,
        width:200,
        borderRadius: 250,
        padding: 5,
        alignItems:'center'    
        },
        perfil:{
            flex: 1,
            flexDirection: 'row',
            height: 800,
            alignItems: 'center',
            padding: 80
        },
        datos:{
            flex: 1,
            flexDirection: 'column',
            padding: 20
        }

})


export default Profile