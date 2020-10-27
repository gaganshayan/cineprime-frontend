import React from 'react'
import { Switch } from 'react-router';
import MovieCard from "./MovieCard";
import './watchlist.css'



const Watchlist = (props) => {

    // console.log("movie props in card", {movie})
    console.log(props)
    const baseURL="http://localhost:4501/api/movies"


    const [movies, setMovies] = React.useState([])
    const [watchType, setWatchType] = React.useState("want-to-watch")

    const loadWantToWatchMovies = () => {
        fetch(`${baseURL}/wantToWatch/user/${props.user}`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.data);
                console.log("movie data in the fetch call", data)
            });
            setWatchType("want-to-watch");
    };
    const loadAllMovies = () => {
        fetch(`${baseURL}/all/user/${props.user}`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.data);
                console.log("movie data in the fetch call", data)
            });
        setWatchType("all");    
    };
    const loadWatchedMovies = () => {
        fetch(`${baseURL}/watched/user/${props.user}`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.data);
                console.log("movie data in the fetch call", data)
            });
            setWatchType("watched");
    };

    React.useEffect(() => {
         loadWantToWatchMovies();
    },[]);

    let movieJSX = <h3>No Movies in  your Watchlist. Please Browse and add them to the list.</h3>;
    if(movies.length > 0) {     
        movieJSX = movies.map((movie, index) =>(<MovieCard movie={movie} key={index} />));
    }   

    const checkedAll = (watchType === "all");
    const checkedAWatched = (watchType === "watched");
    const checkedAWatchToWatch = (watchType === "want-to-watch");

    return (
        <div className="movieCardContainer" >
        <input type="radio" name="watchtype" value="all" onChange={() =>loadAllMovies()} checked={{checkedAll}} /> All
        <input type="radio" name="watchtype" value="watched" onChange={() => loadWatchedMovies()} checked={checkedAWatched}/>Watched
        <input type="radio" name="watchtype" value="want-to-watch" checked={{checkedAWatchToWatch}} onChange={() => loadWantToWatchMovies()}/> Want to Watch
       {movieJSX}
        </div>
    )
}

export default Watchlist;