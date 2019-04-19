import React from "react";
import SearchBar from "./SearchBar";

class App extends React.Component {
  onFormSubmit(term) {
    console.log(`from app ${term}`);
  }

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onFormSubmit} />
      </div>
    );
  }
}

export default App;
