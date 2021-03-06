import React from "react";
import "./App.css";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

class App extends React.Component {
  state = {
    products: data.products,
    size: "",
    sort: ""
  };
  filterProducts = e => {
    if (e.target.value === "") {
      this.setState(prevState => ({
        ...prevState,
        size: e.target.value,
        products: data.products
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        size: e.target.value,
        products: data.products.filter(product => product.availableSizes.indexOf(e.target.value) >= 0)
      }));
    }
  };

  sortProducts = e => {
    const sort = e.target.value;
    this.setState(prevState => ({
      ...prevState,
      sort: sort,
      products: data.products.slice().sort((a, b) => (sort === "lowest" ? (a.price > b.price ? 1 : -1) : 
      sort === "highest" ? (a.price < b.price ? 1 : -1) : a._id < b._id ? 1 : -1))
    }));
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length} size={this.state.size} sort={this.state.sort} fiterProducts={this.filterProducts} sortProducts={this.sortProducts} />
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>All Rights Reserved.</footer>
      </div>
    );
  }
}

export default App;
