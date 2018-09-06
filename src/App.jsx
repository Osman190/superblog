import React from 'react';
import axios from 'axios';
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      posts: [],
      form: {},
      order: 0,
      editing: false,
      searchString: "ahmed",
      text: "EDIT"
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentWillMount(){
    fetch(`http://localhost:5000/api/posts`).then(resp => resp.json()).then(posts => {
      this.setState({ posts });
    });
  }
  
  handleSubmit (e) {
    e.preventDefault();
    let form = this.state.form
    console.log(form);
    axios.post('http://localhost:5000/api/posts', form).then(response => {
      console.log("Slide added successful: ", response);
      fetch(`http://localhost:5000/api/posts`).then(resp => resp.json()).then(posts => {
        this.setState({ posts: posts })
        M.toast({ html: 'Submited!' })
      });
    }).catch(function (error) {
      console.log("Error: ", error);
    })
  }
  
  handleChange(e) {
    let form = {...this.state.form};
    console.log(form)
    console.log(e.target.value)
    if(e.target.value !== ""){
      form[e.target.id] = e.target.value
      console.log(form[e.target.id])
    }
    console.log(form)
    this.setState({form: form})
  }
  
  handleDelete(id) {
    console.log(id);
    axios.delete(`http://localhost:5000/api/posts/${id}`).then(response => {
      console.log("Slide Deleted successful: ", response);
      fetch(`http://localhost:5000/api/posts`).then(resp => resp.json()).then(posts => {
        this.setState({ posts: posts })
        M.toast({ html: 'Deleted!' })
      });
    }).catch(function (error) {
      console.log("Error: ", error);
    })
  }
  
  handleEdit(post) {
    console.log(post)
      this.setState({
        form: post,
        editing: post
      });
  }

  handleUpdate(post){
    console.log(this.state.form);
    let form = this.state.form
      axios.put(`http://localhost:5000/api/posts/${post._id}`, form).then(response => {
        console.log("Slide updated successful: ", response);
        fetch(`http://localhost:5000/api/posts`).then(resp => resp.json()).then(posts => {
          this.setState({ posts, editing: null })
          M.toast({ html: 'Slide update successful' })
        });
      }).catch(function (error) {
        console.log("Error: ", error);
      })
  }
  render() {
    const styles = {
      button: {
        margin: "0 20px",
        borderRadius: "50%"
      },
      badge: {
        position: "absolute",
        top: "1rem",
        right: "1rem" 
      },
      badgeInput: {
        width: "20%",
        position: "absolute",
        top: "1rem",
        right: "1rem" 
      },
      otherInput: {
        width: "70%"
      }
    }
    console.log(localposts)
    var localposts = this.state.posts.filter(post => post.name.toLowerCase() == this.state.searchString.toLowerCase())
    console.log(localposts)
    const posttemplate = localposts.map((post, i) => (
      this.state.editing && this.state.editing._id === post._id ? (
        <li className="list-group-item" key={i}>
        <div className="ahmed"> 
            <input style={styles.otherInput} className="materialize-textarea" defaultValue={post.name} id="name" onChange={this.handleChange} />
            <textarea style={styles.otherInput} className="materialize-textarea" id="content" defaultValue={post.content} onChange={this.handleChange}/>
            <input  style={styles.badgeInput} className="materialize-textarea" id="order" defaultValue={post.order} onChange={this.handleChange}/>
          </div>
          <div className="nacho"> 
            <button style={styles.button} className="btn-floating btn-large waves-effect waves-light red" onClick={() => this.handleDelete(post._id)}>
              <i className="material-icons delete">delete</i>
            </button>
            <button className="btn-floating btn-large waves-effect waves-light green darken-4" onClick={() => this.handleUpdate(post)}>
              <i className="material-icons save">save</i>
            </button>
          </div>
        </li>
      ) : (
          <li className="list-group-item" key={i}>
            <h4 >{post.name}</h4>
            <p >{post.content}</p>
            <span style={styles.badge} className="new badge blue">{post.order}</span>

            <button style={styles.button} className="btn-floating btn-large waves-effect waves-light red" onClick={() => this.handleDelete(post._id)}>
              <i className="material-icons delete">delete</i>
            </button>
            <button className="btn-floating btn-large waves-effect waves-light brown darken-2" onClick={() => this.handleEdit(post)}>
              <i className="material-icons mode_edit">mode_edit</i>
            </button>
          </li>
        )
    ))
    
    return (
      <div className="container">
        <div className="my-3">
          <h2>Create a post:</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>
                Name:
                <input className="validate" id="name" onChange={this.handleChange} />
              </label>
            </div>
            <div className="form-group">
              <label>
                Content:
                <textarea id="content" className="materialize-textarea" onChange={this.handleChange} />
              </label>
            </div>
            <div className="form-group">
              <label>
                Order:
                <input type="number" id="order" className="validate" onChange={this.handleChange} />
              </label>
            </div>
              <button className="waves-effect waves-light btn-large" type="submit" value="Submit">Submit
              <i className="material-icons left send">send</i>
              </button>
          </form>
        </div>
        <div className="my-3">
          <h2>List of all posts:</h2>
          <ul className="list-group">
            {posttemplate}
          </ul>
        </div>
      </div>
    );
  }
}
export default App;
