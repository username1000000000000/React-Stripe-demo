import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import StripeCheckout from 'react-stripe-checkout';
function App() {

  const [product, setProduct] = useState({
    name: "Item1",
    price: 10,
    productBy: "Facebook"
  });

  const makePayment = token => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }

    return fetch('http://localhost:3000/payment', {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log(response);
      const {status} = response;
      console.log(status)

    }).catch()
  }


  return (
    <div className="App">
      <header className="App-header">
        <StripeCheckout 
        stripeKey="pk_test_51HA9rDC8y1PxQqoIcdrIPl0g6PmQaj7REI5DdubnUB1Hx9lYKzGrNoGZan524ctlEX4Jyewgs4D6bO25Bl8T8V6Y00BYhLg1Nw"
        token={makePayment}
        name="Buy this"
        amount={product.price * 100}
        >
          <button>Buy now</button>
        </StripeCheckout>
        
      </header>
    </div>
  );
}

export default App;
