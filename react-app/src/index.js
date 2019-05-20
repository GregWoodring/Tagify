import React from 'react';
import ReactDOM from 'react-dom';
import './assets.css';
import './sidebar.css';
import './style.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignJustify, 
        faHeadphonesAlt,
        faThList,
        faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import spotifyLogo from './icons/Spotify_Logo_RGB_Green.png'
import json from './obj.js';
import jsonList from './list.js';

// import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
// import { faalignjustify } from '@fortawesome/react-fontawesome';

library.add(faAlignJustify, faHeadphonesAlt, faThList, faPlusCircle);

// console.log(json)

function BodyInfo(props){
    return(
        <div className={props.className}>
            <img src={props.img} alt="album art"></img>
            <div>
                <h1>{props.songName}</h1>
                <p>{props.artistName}</p>
            </div>
        </div>
    )
}

class SongListItem extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <li 
            className='songListItem'
            key={this.props.key}
            onClick={e => this.props.onClick(this.props.key)}
            >
                <div className="songItemName">{this.props.songName}</div>
                <div className="songItemArtist">
                <p>{this.props.artistName}</p></div>
                <div className="songItemPlayed">
                <p>{this.props.playedAt}</p></div>
            </li>
        )
    }
}


class Body extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            json: jsonList.items[0]
        }
    }

    getArtistNames(jsonObj){
        let artistString = '';
        jsonObj.track.artists.forEach((item, index, arr) => {
            artistString = arr.length - index <= 1 ? `${item.name} `: `${item.name}, `;
        })
        return artistString;
    }

    formatPlayedDate(dateStr){
        let date = new Date(dateStr);
        return `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours() + 1 > 12 ? date.getHours() - 11 : date.getHours () + 1}:${date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()}`

    }

    renderBodyInfo(jsonObj){
        return <BodyInfo 
                className='bodyInfo'
                img={jsonObj.track.album.images[1].url}
                songName = {jsonObj.track.name}
                artistName = {this.getArtistNames(jsonObj)}
                />
    }



    renderBodyList(list){
        let listItems = list.items.map((item, index) => {
            return <SongListItem 
                key={item.track.id} //this is temporary, replace with my uniqueID 
                item={item}
                songName={item.track.name}
                artistName={this.getArtistNames(item)}
                playedAt={this.formatPlayedDate(item.played_at)}
                onClick = {e => this.handleSongClick(item.track.id)}
                />
        });

        return listItems;
    }

    handleSongClick(key) {
        console.log(key);
        this.setState({json : jsonList.items[key]});
    }

    render() {
        
        return(
            <div className="mainElem" id="body">
                {this.renderBodyInfo(this.state.json)}
                <ul>
                    <li className="songListItem">
                        <div className="songItemName"><p>Song Title</p></div>
                        <div className="songItemArtist"><p>Artist Name</p></div>
                        <div className="songItemPlayed"><p>Played At</p></div>
                    </li>
                    {this.renderBodyList(jsonList)}
                </ul>
            </div>
        );
    }
}

class MenuHeader extends React.Component{
    render(){
        return(
            <div 
                className="sidebarElem"
                id="sidebar-header"
            >
                <div className="expanded-logo-Container">
                    <div className="logo-container">
                        <div className="playListHelperIcon">
                            <FontAwesomeIcon icon="align-justify"/>
                        </div>
                        <h2 className="playListHelperLogo">
                            PlayList <br/>
                            Helper
                        </h2>
                    </div>
                </div>
                <div className="logo-subtext">
                    <p>By Greg Woodring</p>
                    <h4>Powered By: </h4>
                    <img className="spotify-logo" src={spotifyLogo} alt="spotify logo"/>
                </div>
            </div>
        )
    }
}

function MenuItem(props){
    return(
        <div className={props.className}>
            <p className={props.className}>
                <div>
                    <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
                </div>
                {props.menuText}
            </p>
        </div>
    )  
}

class Menu extends React.Component{

    renderMenuItem(text, icon){
        return(
            <MenuItem className="sidebarElem listItem" menuText={text} icon={icon}/>
        )
    }

    render() {
        return(
            <div className="mainElem" id="menu">
                <MenuHeader />
                {this.renderMenuItem("Recently Played", "headphones-alt")}
                {this.renderMenuItem("Your Playlists", "th-list")}
                {this.renderMenuItem("Add a Playlist", "plus-circle")}
            </div>
        );
    }
}

class Info extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="mainElem" id="infoside"></div>
        )
    }
}



class Main extends React.Component{
    
    render(){
        return (
            <div className="main">
                <Menu />
                <Body />
                <Info />
            </div>
        )
    }
}



ReactDOM.render(<Main />, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
