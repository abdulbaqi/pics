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
