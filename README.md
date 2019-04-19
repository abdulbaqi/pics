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

````
 state = {term:''};

  onFormSubmit = (event)=> {
      event.preventDefault();
      console.log(this.state.term);
  }

````

A third way without binding is to invoke arrow function withint the form

````
onFormSubmit(event) {
    event.preventDefault();
    console.log(this.state.term);
}
...

<form onSubmit={(e)=>this.onFormSubmit(e)} className="ui form">

````