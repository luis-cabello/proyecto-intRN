import { Text, View,StyleSheet,TextInput, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config';
import Profile from './Profile';

class Editar extends Component {
    constructor(props){
        super(props);
        this.state = {
           user: "",
           perfil: ""
           
        }
    }

    actualizar(){
      db.collection("users")
      .doc(this.props.route.params.id)
      .update({
        user: this.state.user,
        perfil: this.state.perfil
      })
      .then(()=>{
        {this.props.navigation.navigate("Profile")}
      })
      .catch((error) => console.log(error))
    }
 

  render() {
    return (
      <View style={styles.container} >
        <TextInput 
        style = {styles.input}
        onChangeText={ (text) => this.setState({ user: text})}
        placeholder = "Editar nombre de usuario"
        value= {this.state.user}
        />
        <TextInput 
        style = {styles.input}
        onChangeText={ (text) => this.setState({ perfil: text})}
        placeholder = "Editar descripción"
        value= {this.state.perfil}
        />
         <View>
            <TouchableOpacity  onPress={() => this.actualizar()}>
                <Text style = {styles.botonColor}> Cambiar</Text>
            </TouchableOpacity>
        </View>
    </View>
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
export default Editar