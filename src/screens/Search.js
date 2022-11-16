import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filteredUsers: [],
            filteredMail: [],
            search: false,
            postSearchText: '',
        }
        console.log(this.props);
    }

    componentDidMount() {
        db.collection('users').onSnapshot(
            docs => {
                let info = [];
                console.log(info);
                docs.forEach(doc => {
                    info.push({ 
                        id: doc.id, 
                        data: doc.data()})
                });
                this.setState({ users: info });
            }
            )
    }
    
    preventSubmit(event) {
        event.preventDefault();
        
        let textToFilter = this.state.postSearchText.toLowerCase();
        
        console.log(textToFilter);

        const filteredUsers = this.state.users.filter(user => user.data.userName?.toLowerCase().includes(textToFilter));

        console.log(filteredUsers);

        const filteredMail = this.state.users.filter(user => user.data.email?.toLowerCase().includes(textToFilter));
        
        this.setState({
            filteredUsers: filteredUsers
        });
        
        this.setState({
            filteredMail: filteredMail
        });
    };
    
    
    controlChanges(event) {
        this.setState({ postSearchText: event.target.value });
    };
    
    clear() {
        this.setState({
            result: [],
            search: false,
            postSearchText: '',
        })
    };
    
    render() {
        console.log(this.state.filteredMail);
        console.log(auth.currentUser.email);
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder='Search'
                    keyboardType='default'
                    onChangeText={text => this.setState({ postSearchText: text })}
                    value={this.state.postSearchText}
                    onChange={(event) => this.controlChanges(event)}
                    style={styles.input}
                    />


                {this.state.postSearchText == '' ?
                    <Text>El campo no puede estar vacio</Text>
                    :
                    <TouchableOpacity onPress={(event) => this.preventSubmit(event)} style={styles.button}>
                        <Text style={styles.textButton}>Enviar</Text>
                    </TouchableOpacity>
                }


                <TouchableOpacity onPress={() => this.clear()}>
                    <Text>Clear search</Text>
                </TouchableOpacity >


                {this.state.userErr ?
                    <Text>El usuario no existe</Text>
                    :
                    <FlatList 
                    style={styles.list}
                    data={this.state.filteredUsers}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => 
                    <>
                    
                    <TouchableOpacity onPress={() =>  auth.currentUser.email === item.data.email ? this.props.navigation.navigate('Profile', { email: item.data.email }) : this.props.navigation.navigate('OthersProfile', { email: item.data.email })}>
                        <Text style={styles.users} >{item.data.userName}</Text>
                    </TouchableOpacity>

                    </>}

                    /> 
                }  
            
                {this.state.userErr ?
                    <Text>El mail no existe</Text>
                    :
                    <FlatList
                    style={styles.list}
                    data={this.state.filteredMail}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => 
                    
                    
                    <>
                    <TouchableOpacity onPress={() => auth.currentUser.email === item.data.email ? this.props.navigation.navigate('Profile', { email: item.data.email }) : this.props.navigation.navigate('OthersProfile', { email: item.data.email }) }>
                        <Text style={styles.users} >{item.data.email}</Text>
                    </TouchableOpacity>
                    </>}
                    />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
    },
    input: {
        width: 300,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: '#00ADB5',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    list: {
        width: '100%',
        height: '100%',
    },
    button: {
        backgroundColor: '#00ADB5',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    textButton: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
    },

})
export default Search;
