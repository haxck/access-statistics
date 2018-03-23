import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
  }

  componentDidMount() {
    fetch("wp-json/wp/v2/posts/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <header className="news-list-nav">
          <a href="#">US...</a>
          </header>
          <div className="news-list-view">
            <ul className="news-list">
              {items.map(item => (
                <li key={item.id} className="news-item">
                <span className="item-title">
                <a href={"http://localhost:8000/api/p/" + item.link} target="_blank">{item.id}:{item.title.rendered}</a>
                </span>
                <br/>
                <span className="item-time">
                  {item.date}
                </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
  }
}

export default App;
