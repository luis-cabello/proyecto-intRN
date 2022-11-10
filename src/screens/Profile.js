import React, { Component } from 'react';
import {auth, db} from '../firebase/config';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList} from 'react-native';

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            email : auth.currentUser.email,
            users: ''
            
        }

    }

    componentDidMount(){
        db.collection('users').where( 'email', "==" , auth.currentUser.email).onSnapshot(
            docs => {
                let users = [];
                docs.forEach(doc => {
                    console.log(doc);
                    users.push({
                        id : doc.id,
                        data: doc.data(),
                        userName : doc.data().userName,
                        bio : doc.data().bio,
                        foto : doc.data().fotoPerfil
                    })
                    this.setState({
                        users : users[0]
                    })
                })
            }
            )
        }
        render(){
        console.log(this.state.users.data);
        console.log(this.state.email);
        return(
            <ScrollView>
            <Text>Usuario</Text>
            <Text> {this.state.email}</Text>
            <Text> {this.state.users.userName} </Text>
            <Text> {this.state.users.bio} </Text>
            

                    
        </ScrollView>
        )
    }
}

















export default Profile