import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import Post from '../components/Post';

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            email: auth.currentUser.email,
            users: '',
            usersPosts: []

        }

    }

    componentDidMount() {
        db.collection('users').where('email', "==", auth.currentUser.email).onSnapshot(
            docs => {
                let users = [];
                docs.forEach(doc => {
                    console.log(doc);
                    users.push({
                        id: doc.id,
                        data: doc.data(),
                        userName: doc.data().userName,
                        bio: doc.data().bio,
                        foto: doc.data().fotoPerfil
                    })
                    this.setState({
                        users: users[0]
                    })
                })
            }
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