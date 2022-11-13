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

    buscarPeli(movie,textSearch){
        if (movie) {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=7a176cc95147be6e695be2faf0e8ff9c&language=en-US&query=${textSearch}&page=1&include_adult=false`)
            .then(res => res.json())
            .then(data => this.setState({
                resultadosBusqueda : data.results 
            }))
            .catch(err => console.log(err))
        }
    }

    render(){
        console.log(this.state.posts);
        return(
            <ScrollView>
                <Buscador buscar = {(movie,textSearch)=> this.buscarPeli(movie,textSearch) }/>
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