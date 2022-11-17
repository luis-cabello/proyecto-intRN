import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList, TextInput } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cantidadDeLikes: this.props.postData.data.likes.length,
            miLike: false,
            comment: '',
            seeComment: false,
            seeAll: false,
        }
    }

    componentDidMount() {
        if (this.props.postData.data.likes.includes(auth.currentUser.email)) {
            this.setState({
                miLike: true,
            })
            
        }
    }

    like() {
        db.collection('posts')
            .doc(this.props.postData.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes + 1,
                miLike: true,
            })
            )
            .catch(e => console.log(e))
    }

    unlike() {
        db.collection('posts')
            .doc(this.props.postData.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes - 1,
                miLike: false,
            })
            )
            .catch(e => console.log(e))
    }


    addComment() {
        let oneComment = {
            author: auth.currentUser.email,
            createdAt: Date.now(),
            commentText: this.state.comment

        }
        db.collection('posts').doc(this.props.postData.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion(oneComment)
        })
            .then(() => {
                this.setState({
                    comment: ''
                })
            })
            .catch(e => console.log(e))
    }

    borrarPosteo(){
        db.collection('post')
        .doc(this.props.id)
        .delete()
        .then(()=> {this.props.navigation.navigate('Profile')})
        .catch(err=> console.log(err))
    }

    seeComment() {
        this.setState({
            seeComment: true,
        })
    }

    hideComment() {
        this.setState({
            seeComment: false,
            seeAll: false,
        })
    }
    seeAll() {
        this.setState({
            seeAll: true,
        })
    }

    seeLess() {
        this.setState({
            seeComment: true,
            seeAll: false,
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.photo}
                    source={{ uri: this.props.postData.data.photo }}
                    resizeMode='cover'
                />
              
                
                <TouchableOpacity onPress={()=> auth.currentUser.email === this.props.postData.data.owner ? this.props.props2.navigation.navigate('Profile', {email : this.props.postData.data.owner}) : this.props.props2.navigation.navigate('OthersProfile', {email : this.props.postData.data.owner}) }>
                    <Text style={styles.data} >Subido por {this.props.postData.data.owner}</Text>
                </TouchableOpacity>

                {this.state.miLike ?
                    <TouchableOpacity onPress={() => this.unlike()}>
                        <Text style={styles.data} >Dislike</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => this.like()}>
                        <Text style={styles.data}>Like</Text>
                    </TouchableOpacity>
                }

                <Text style={styles.data}> {this.state.cantidadDeLikes} likes </Text>
                <Text style={styles.data}>{this.props.postData.data.textoPosteo}</Text>


                <View>
                    <TextInput style={styles.input} keyboardType='default'
                        placeholder='Escribí tu comentario'
                        onChangeText={(text) => { this.setState({ comment: text }) }}
                        value={this.state.comment}
                    />
                    <TouchableOpacity onPress={() => this.addComment()}>
                        <Text style={styles.button} >Comentar</Text>
                    </TouchableOpacity>
                </View>

                {/* Listar los comentarios  */}
                {
                    this.props.postData.data.comments ? //si comentarios es true
                        <View>
                            {
                                this.state.seeComment ? //si ver comentarios es true (apreto boton ver comentarios)
                                    <View>
                                        <FlatList
                                            data={
                                                this.state.seeAll ? // ver todos es true
                                                    this.props.postData.data.comments
                                                    : //me devuelve todos los comments
                                                    this.props.postData.data.comments.slice(-4)  // me devuelve 4 y tengo boton ver todos
                                            }
                                            keyExtractor={post => post.createdAt.toString()}
                                            renderItem={({ item }) => <Text style={styles.data}> {item.author}: {item.commentText}</Text>}
                                        />
                                        {this.state.seeAll ? //si ver TODOS es true (apreto boton ver TODOS)
                                            //mostrar boton ver menos
                                            <TouchableOpacity onPress={() => this.seeLess()}>
                                                <Text style={styles.button}>Ver menos comentarios</Text>
                                            </TouchableOpacity>
                                            : // ver todos es false, mostrar boton ver todos
                                            <TouchableOpacity onPress={() => this.seeAll()}>
                                                <Text style={styles.button}>Ver todos los comentarios</Text>
                                            </TouchableOpacity>
                                        }
                                        {/* always opcion de hideComment */}
                                        <TouchableOpacity onPress={() => this.hideComment()}>
                                            <Text style={styles.button}>Ocultar los comentarios</Text>
                                        </TouchableOpacity>
                                    </View>

                                    : // si no apreto ver comentarios me muestra el boton
                                    <TouchableOpacity onPress={() => this.seeComment()}>
                                        <Text style={styles.button}>Ver los comentarios</Text>
                                    </TouchableOpacity>
                            }
                            <View>

                            </View>
                        </View>
                        :
                        <Text> No hay comentarios</Text>
                }
              
            </View>
        )
    }
}

const styles = StyleSheet.create({
    photo: {
        height: 500,
        borderRadius:6 ,
        width: 500,
        margin: 20
        
    },
    container: {
        flex: 1,
        backgroundColor: 'grey',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',   
    },
    data : {
        color: 'white'
    },
    input: {
        width: 300,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: '#47cf73',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        color: "white"
    },
    button: {
        backgroundColor: '#47cf73',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
})

export default Post;