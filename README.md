# Pics App

This app uses a number of react concepts to fetch images from an API and displays them.

This app is following a Udemy tutorial. Notes are personal but you can use them.

We used semantic UI for styling

on a function callback for any event handler we do not place parenthesis after the function name like

```
<input type="text" onChange={this.onSearchChange} />
```

some events are `onChange`, `onSubmit` and `onClick`.
It is a community convention to name the handler with starting as `on` or sometimes called `handle` and then the element `input` and finally the event `change`, so we have `onInputChange`.

```
onInputChange(event) {
    console.log(event.target.value);
  }
```

See the difference between controleed vs uncontrolled event handling

```
<input
              type="text"
              value={this.state.term}
              onChange={(e)=>{this.setState({term:e.target.value})}}
            />
```

Default behaviour of html forms is that whenever you press `enter` it refreshes the page.

Note how to bind a function that calls state.

```
constructor(props){
        super(props);
        this.state = { term: "" };
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }


  onFormSubmit(event){
      event.preventDefault();
      console.log(this.state.term);
  }
```

another way to solve this is to convert the `onFormSubmit` to arrow function

```
 state = {term:''};

  onFormSubmit = (event)=> {
      event.preventDefault();
      console.log(this.state.term);
  }

```

A third way without binding is to invoke arrow function withint the form

```
onFormSubmit(event) {
    event.preventDefault();
    console.log(this.state.term);
}
...


<form onSubmit={(e)=>this.onFormSubmit(e)} className="ui form">

```

`props` can pass information always from father down to child and not the other way

To pass info from child back to father, we pass a function from father (`App.js`) to the child as follows

```
//App.js
onFormSubmit(term){
        console.log(`from app ${term}`)
    }

  render() {
    return (
      <div className="ui container" style={{marginTop:'10px'}}>
        <SearchBar onSubmit={this.onFormSubmit} />
      </div>
    );
  }

```

```
//child
onFormSubmit=(event)=> {
    event.preventDefault();
    this.props.onSubmit(this.state.term);
  }

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>Image Search</label>
            <input
              type="text"
              value={this.state.term}
              onChange={e => {
                this.setState({ term: e.target.value });
              }}
            />
```

For API we will use `axios`

After a promise we use `then()` like the following snippet.

```
onFormSubmit(term) {
    axios.get('https://api.unsplash.com/search/photos',{
        params: {query: term},
        headers: {
            Authorization: 'Client-ID cfadcc63674541ef1c2229f851cabf95b1b5102f693983f1ea5b467bc7791670'
        }
    }).then((response)=>{
        console.log(response.data.results)
    })
```

The second way is to use `async` and `await` syntax as follows:

```
onFormSubmit = async (term) => {
    const response =  await axios.get('https://api.unsplash.com/search/photos',{
        params: {query: term},
        headers: {
            Authorization: 'Client-ID cfadcc63674541ef1c2229f851cabf95b1b5102f693983f1ea5b467bc7791670'
        }
    });

    this.setState({images:response.data.results});

```

refactor axios by creating a seperate file inside a new folder called `api` which will contain:

```
import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization:
      "Client-ID cfadcc63674541ef1c2229f851cabf95b1b5102f693983f1ea5b467bc7791670"
  }
});
```

Next, we turn to ImageList.js component.

we can create a functional component as below

```
const ImageList = props => {
  console.log(props.images);
  const images = props.images.map((image)=> {
      return <img key={image.id}  src={image.urls.regular} alt={image.description}/>
  })
  return <div>{images}</div>;
};
```

also we can destructure and `image` in the map funciton to reduce some coding as follows:

```
const ImageList = props => {
  console.log(props.images);
  const images = props.images.map(({ id, urls, description }) => {
    return <img key={id} src={urls.regular} alt={description} />;
  });
  return <div>{images}</div>;
};
```

## Version 2 - CSS and image layout

Grid CSS system, <div style="display:grid"> and with following CSS rule

```CSS
.image-list {
    display: grid;
    grid-template-columns: :repeat(auto-fill, minmax(250px, 1fr));
}
```

Eventually we will create a new component to render one image car `ImageCard`

To access DOM elements in React we use `ref`. This is done by the following code:

```javascript
class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
  }
  render() {
    const { description, urls } = this.props.image;
    return (
      <div>
        <img ref={this.imageRef} alt={description} src={urls.regular} />
      </div>
    );
  }
}
```
