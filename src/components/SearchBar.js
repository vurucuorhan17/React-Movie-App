import React from "react";
import { Link } from "react-router-dom";

class SearchBar extends React.Component
{

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render(){
        return (
            <form className="form-row mb-5 mt-3" onSubmit={this.handleSubmit}>
                <div className="col-10">
                    <input
                        onChange={this.props.searchMovieProp}
                        type="text"
                        className="form-control"
                        placeholder="Search a movie"
                    />
                </div>
                <div className="col-2">
                        <Link 
                                to="/add"
                                type="button" 
                                className="btn btn-md btn-danger"
                                style={{float:'right'}}>Add Movie
                        </Link>
                    </div>
            </form>
        );
    }
}

export default SearchBar;