import React from 'react';
import './Media.css';
import Nav from '../nav/Nav';
import Slide from '../home/Slide';
import {getAlbum} from '../../services/heroku';
import toastr from 'toastr';
import {Spin} from 'antd';
import Lightbox from 'react-images';


export class MediaDisplayDetail extends React.Component{ 

    state = {
        album:{pics:[]},
        images:[],
        lightboxIsOpen:false,
        currentImage:0

    };

    toggleLightBox = (i) => {
        this.setState({lightboxIsOpen:!this.state.lightboxIsOpen, currentImage:i})
    }
    gotoPrevious = () => this.setState({currentImage: this.state.currentImage - 1,})
	
	gotoNext = () => this.setState({currentImage: this.state.currentImage + 1,})
	

    componentWillMount(){
        const id = this.props.match.params.id;
        getAlbum(id)
        .then(album=>{

            this.setState({album})
            this.prepareImagesForLightBox(album.pics);
        })
        .catch(e=>{
            toastr.error('No se pudo cargar el album')
        })
    }


    prepareImagesForLightBox = (links) => {
        const images = [];
        for(let link of links){
            images.push({src:link});
        }
        this.setState({images});
        return images;
    }

    render(){
        console.log(this.state.album)
        const {title, 
            desc,
            fecha,
            pics,
            place
        } = this.state.album;
        return (

    <div>
        <Slide />
        <Nav />
        {pics.length ? null : <Spin />}
        <div>
            <div className="box_media">
                <div className="img_album" style={{backgroundImage:`url('${pics[0]}')`}}>
                </div>
                <div className="data_album">
                    <h2>{title}</h2>
                    <h3>{place}</h3>
                    <hr/>
                    <p>{desc}
                    </p>
                    <br/>
                    <p><strong>Fecha</strong></p>
                    <p>{fecha}</p>
                </div>
                <br/>
            </div>

        </div>
        <div className="flexito contenedor">
                {pics.map((pic,i)=>{
                    return (
                        <div>
                        <img onClick={()=>this.toggleLightBox(i)} key={i} className="images_al" src={pic} alt={title}/>
                        </div>);
                })}


            </div>
  

<Lightbox
  currentImage={this.state.currentImage}
  images={this.state.images}
  isOpen={this.state.lightboxIsOpen}
  onClickPrev={this.gotoPrevious}
  onClickNext={this.gotoNext}
  onClose={this.toggleLightBox}
/>

    </div>
);
    }
}

