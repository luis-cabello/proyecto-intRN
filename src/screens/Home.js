import React, { Component } from 'react';
import {auth, db} from '../firebase/config';
import {Text, View, FlatList} from 'react-native'


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
            <View>
                <Text> Home</Text>
                <Text> Usarios registrados</Text>
                <FlatList 
                    data={this.state.posts}
                    keyExtractor={ onePost => onePost.id.toString()}
                    renderItem={ ({item}) => <Text> {item.data.owner } </Text>}
                />        
            </View>

        )
    }
}

export default Home