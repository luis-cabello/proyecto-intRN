import React, { Component } from 'react';
<<<<<<< HEAD
import { auth, db } from '../firebase/config';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import Post from '../components/Post';
=======
import {auth, db} from '../firebase/config';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList, Image} from 'react-native';
import Post from '../components/Post'
>>>>>>> ed92605945b4354d60d38ef44c4c7b48dd8f3234

class Profile extends Component {
    constructor() {
        super()
        this.state = {
<<<<<<< HEAD
            email: auth.currentUser.email,
            users: '',
            usersPosts: []

=======
            users: [],
            email: '',
            bio: '',
            fotoPerfil: '',
            posts: [],

            
>>>>>>> ed92605945b4354d60d38ef44c4c7b48dd8f3234
        }

    }

<<<<<<< HEAD
    componentDidMount() {
        db.collection('users').where('email', "==", auth.currentUser.email).onSnapshot(
=======
    componentDidMount(){
        db.collection('users').where('email', '==', this.props.route.params == undefined ? auth.currentUser.email : this.props.route.params.email).onSnapshot(
>>>>>>> ed92605945b4354d60d38ef44c4c7b48dd8f3234
            docs => {
                let users = [];
                docs.forEach(doc => {
                    console.log(doc);
                    users.push({
                        id: doc.id,
                        data: doc.data(),
<<<<<<< HEAD
                        userName: doc.data().userName,
                        bio: doc.data().bio,
                        foto: doc.data().fotoPerfil
=======
                        email: doc.data().email,
                        userName : doc.data().userName,
                        bio : doc.data().bio,
                        fotoPerfil : doc.data().fotoPerfil
>>>>>>> ed92605945b4354d60d38ef44c4c7b48dd8f3234
                    })
                    this.setState({
                        users: users[0]
                    })
                })
            }
<<<<<<< HEAD
        )


    }
    getUserPosts() {
        db.collection('posts').where('owner', '==', auth.currentUser.email).orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        usersPosts: posts
                    })
                })
            }
        )
    }

    logOut() {
        auth.signOut()
    }


=======
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
        render(){
        console.log(this.state.users.foto);
        console.log(this.state.email);
        return(
            <ScrollView>
            <Text>Usuario</Text>
            <Text> {this.state.users.email}</Text>
            <Text> {this.state.users.userName} </Text>
            <Text> {this.state.users.bio} </Text>
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
>>>>>>> ed92605945b4354d60d38ef44c4c7b48dd8f3234


    render() {
        console.log(this.state.users.data);
        console.log(this.state.email);
        return (
            <ScrollView>
                <Text>My Profile</Text>
                <Text> Email : {this.state.email}</Text>
                <Text> User Name : {this.state.users.userName} </Text>
                <Text> Bio: {this.state.users.bio} </Text>

                <Text> Cantidad de posteos : {this.state.usersPosts.length}</Text>
                <FlatList
                    data={this.state.usersPosts}
                    keyExtractor={onePost => onePost.id.toString()}
                 //   renderItem = {({item})=> <Post postData ={item}} />  Falta renderizar el posteo para cada usuario

                />
                <TouchableOpacity onPress={() => this.logOut()}>
                    <Text>Sign Out </Text>
                </TouchableOpacity>

            </ScrollView>
        )
    }
}
export default Profile