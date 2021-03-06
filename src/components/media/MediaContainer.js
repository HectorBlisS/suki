import React, { Component } from 'react';
import './Media.css';
//import {Link} from 'react-router-dom';
import Slide from '../home/Slide';
import Nav from '../nav/Nav';
import CardMedia from '../card/CardMedia';
import Footer from '../footer/Footer';
import toastr from 'toastr';
//import {getAlbums} from '../../services/firebase';
import {getAlbums} from '../../services/heroku';
import {Spin} from 'antd';



class BlogContainer extends Component {

    state = {
        albums:[]
    }

    componentDidMount () {
        window.scroll(0, 0)
    }

    componentWillMount(){
        getAlbums()
        .then(albums=>{
            //console.log(albums);
            this.setState({albums});
        })
        .catch(e=>{
            //console.log(e);
            toastr.error('no se pudieron cargar')
        })
    }

    render() {
        const {albums} = this.state;
        return (
            <div>
                <Slide title="Fotografía" />
                <Nav />

                <h2 className="subtitulo">Fotografía</h2>
                <hr className="line_gris"/>
                <div className="box_blog">

                    {albums.length ? null : <Spin />}

                    {albums.map((album,i)=>{
                        return <div><CardMedia key={i} cover={album.pics[0]} {...album} id={album._id} /></div>
                    })}
                    

                </div>

                <Footer />
            </div>
        );
    }
}

export default BlogContainer;