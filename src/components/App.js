import React from "react";

import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";

import axios from "axios";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component
{
    state = {
        movies: [],
        searchQuery: ""
    }

    // FETCH 
    /*async componentDidMount()
    {
        const response = await fetch("http://localhost:3001/movies");
        const responseJson = await response.json();
        
        this.setState({ movies: responseJson });
    }*/

    async componentDidMount(){
        this.getMovies();
    }

    async getMovies()
    {
        const response = await axios.get("http://localhost:3001/movies");
        
        this.setState({ movies: response.data });
    }


    // FETCH API
    // deleteMovie = async (movie) => {
    //     const endPoint = `http://localhost:3001/movies/${movie.id}`
    //     const response = await fetch(endPoint,{
    //         method: "DELETE"
    //     });
    //     const newMovieList = this.state.movies.filter(m => m.id !== movie.id);
    //     this.setState(state => ({
    //         movies: newMovieList
    //     }));
    // }

    // AXIOS API
    deleteMovie = async (movie) => {
        await axios.delete(`http://localhost:3001/movies/${movie.id}`);
        const newMovieList = this.state.movies.filter(m => m.id !== movie.id);
        
        this.setState({ movies: newMovieList });
    }


    searchMovie = (event) => {
        this.setState({
            searchQuery: event.target.value
        })
    }

    addMovie = async (movie) => {
        await axios.post("http://localhost:3001/movies/",movie);
        this.setState(state => ({
            movies: state.movies.concat([movie])
        }));
        this.getMovies();
    }

    editMovie = async (id,movie) => {
        await axios.put(`http://localhost:3001/movies/${id}`,movie);
        this.getMovies();
    };

    render(){

        let filteredMovie = this.state.movies.filter((movie) => {
            return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1 
        }).sort((a, b) => {
            return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
        });

        return(
            <Router>

                <div className="container">
                    <Switch>

                        <Route path="/" exact render={() => (
                            <React.Fragment>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <SearchBar searchMovieProp={this.searchMovie}/>
                                    </div>
                                </div>
                                <MovieList
                                    movies={this.state.movies}
                                    movies={filteredMovie}
                                    deleteMovieProp={this.deleteMovie}
                                />
                            </React.Fragment>
                        )}>
                        </Route>
                    
                        <Route path="/add" render={ ({history}) => (
                            <AddMovie
                                onAddMovie={(movie) => {
                                    this.addMovie(movie);
                                    history.push("/");
                                }}
                            />
                        )}>
                        </Route>

                        <Route path="/edit/:id" render={ (props) => (
                            <EditMovie
                                {...props}
                                onEditMovie={(id,updatedMovie) => {
                                    this.editMovie(id,updatedMovie);
                                }}
                            />
                        )}>
                        </Route>
                    
                    </Switch> 
                </div>
                
            </Router>
        );
    }
}

export default App;