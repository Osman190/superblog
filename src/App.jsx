import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      posts: [],
      form: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount(){
    fetch(`http://localhost:5000/api/posts`).then(resp => resp.json()).then(posts => {
      this.setState({ posts: posts });
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    console.log(event.target.elements);
    let form = this.state.form
    axios.post('http://localhost:5000/api/posts', form).then(response => {
      console.log("Slide added successful: ", response);
      fetch(`http://localhost:5000/api/posts`).then(resp => resp.json()).then(posts => {
        this.setState({ posts: posts });
      });
    }).catch(function (error) {
      console.log("Error: ", error);
    })
  }

  handleChange(e) {
    let form = {...this.state.form};
    if(e.terget.value !== ""){
      form[e.terget.id] = e.terget.value
    }
    this.setState({form: form})
  }

  render() {
    return (
      <div className="container">
        <div className="my-3">
          <h2>Create a post:</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>
                Name:
                <input className="form-control" id="name" onChange={this.handleChange} />
              </label>
            </div>
            <div className="form-group">
              <label>
                Content:
                <textarea id="content" className="form-control" onChange={this.handleChange} />
              </label>
            </div>
            <div className="form-group">
              <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        </div>
        <div className="my-3">
          <h2>List of all posts:</h2>
          <ul className="list-group">
            {
              this.state.posts.map((post, i) => (
                  <li className="list-group-item" key={i}>
                    <h2>{post.name}</h2>
                    <p>{post.content}</p>
                  </li>))
              }
          </ul>
        </div>
      </div>
    );
  }
}
export default App;
