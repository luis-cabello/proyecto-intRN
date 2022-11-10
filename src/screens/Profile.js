import React, { Component } from 'react';
import {auth, db} from '../firebase/config';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList} from 'react-native';

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            email : auth.currentUser.email,
            
        }

    }

    componentDidMount(){
        db.collection('users').onSnapshot(
            docs => {
                let users = [];
                docs.forEach(doc => {
                    users.push({
                        id : doc.id,
                        data : doc.data()
                    })
                    this.setState({
                        users : users
                    })
                })
            }
        )
    }
    render(){
        return(
            <ScrollView>
            <Text>Usuario</Text>

            <FlatList 
                    data={this.state.email}
                     
                    renderItem={ ({email}) => <Text> {this.state.email}</Text>}
                  
                />               
        </ScrollView>
        )
    }
}

















export default Profile