import React, {Component} from "react";
import {Camera} from 'expo-Camera'; 
import { storage } from "../firebase/config";
import { View, Text, TouchableOpacity, StyleSheet, Image  } from "react-native";

class MyCamera extends Component{ 
    constructor(props){ 
        super(props)
        this.state={
            Permission: false, 
            showCamera: true, 
            urlTemporal: '' 
        }
        this.metodosDeCamara =  ' '
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then( () => this.setState({
                permissions: true
            }))
            .catch( e => console.log(e))
    }

    sacarFoto(){
        this.metodosDeCamara.takePictureAsync()
            .then( photo => {
                this.setState({
                    urlTemporal: photo.uri,
                    showCamera: false
                })
            })
            .catch( e => console.log(e))
    }

    guardarFoto(){
        fetch(this.state.urlTemporal)
        .then(res => res.blob())
        .then( image => {
            const refStorage = storage.ref(`photos/${Date.now()}.jpg`);
            refStorage.put(image) 
            .then(()=> {
                refStorage.getDownloadURL()
                .then(url => this.props.onImageUpload(url))
            })
        })
        .catch(e => console.log(e))
    }

    cancelar(){

        this.setState({
            urlTemporal: '',
            showCamera:true 
        })
   
}

    render(){
        return(
            <View>
            {
                this.state.permissions ? 
                    this.state.showCamera ?
                    <View style={styles.cameraBody}>
                        <Camera
                            style={styles.cameraBody}
                            type = {Camera.Constants.Type.front}
                            ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara }
                        />
                        <TouchableOpacity style={styles.button} onPress={()=>this.sacarFoto()}>
                            <Text>Take Photo</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <Image 
                            style={styles.preview}
                            source={{uri: this.state.urlTemporal}}
                            resizeMode='cover'
                        />
                        <TouchableOpacity style={styles.button} onPress={()=>this.cancelar()}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=>this.guardarFoto()}>
                            <Text>Accept</Text>
                        </TouchableOpacity>
                    </View>

                :
                    <Text>No permits</Text>
            }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    cameraBody: {
        height: '80vh',
    },
    button:{
        height: '20vh',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        marginTop: 20
    },
    preview:{
        height:'40vh'
    }
}) 

export default MyCamera; 