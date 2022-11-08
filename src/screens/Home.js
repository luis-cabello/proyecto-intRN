import React, { Component } from 'react';
import {auth, db} from '../firebase/config';
import {Text, View, FlatList, ScrollView} from 'react-native'
import Post from '../components/Post';


class Home extends Component{
    constructor(){
        super();
        this.state = {
            posts:[]
        }
    }

    componentDidMount(){
        db.collection('posts').onSnapshot(
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
        console.log(this.state.posts);
        return(
            <ScrollView>
                <Text>Posts</Text>

                <FlatList 
                        data={this.state.posts}
                        keyExtractor={ onePost => onePost.id.toString()}
                        renderItem={ ({item}) => <Post postData={item} />}
                    />               
            </ScrollView>

        )
    }
}

export default Home