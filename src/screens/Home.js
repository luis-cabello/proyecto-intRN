import React, { Component } from 'react';
import {auth, db} from '../firebase/config';
import {Text, View, FlatList, ScrollView, StyleSheet} from 'react-native'
import Post from '../components/Post';



class Home extends Component{
    constructor(){
        super();
        this.state = {
            posts:[]
        }
    }

    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
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
        return(
            <ScrollView style={styles.container}>
               
                <Text>Posts</Text>
                <FlatList style={styles.posts}
                        data={this.state.posts}
                        keyExtractor={ onePost => onePost.id.toString()}
                        renderItem={ ({item}) => <Post postData={item} props2={this.props} />}
                    />               
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
        textAlign: 'center',
        padding: 10,
    }
})

export default Home