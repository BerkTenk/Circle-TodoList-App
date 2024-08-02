import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const themes = [
  { id: 1, name: 'Dark Theme', price: 10 },
  { id: 2, name: 'Light Theme', price: 15 },
  { id: 3, name: 'Blue Theme', price: 20 }
];

const ThemeStore = ({ walletAddress, userBalance, setUserBalance }) => {
  const [purchasedThemes, setPurchasedThemes] = useState([]);

  const handlePurchase = (theme) => {
    if (userBalance >= theme.price) {
      setUserBalance(userBalance - theme.price);
      setPurchasedThemes([...purchasedThemes, theme.id]);
      alert(`You have purchased ${theme.name}`);
    } else {
      alert('Insufficient balance to purchase this theme.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Theme Store</h2>
      <p>Wallet Address: {walletAddress}</p>
      <p>Balance: {userBalance} coins</p>
      <div className="row">
        {themes.map((theme) => (
          <div className="col-md-4" key={theme.id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{theme.name}</Card.Title>
                <Card.Text>Price: {theme.price} coins</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handlePurchase(theme)}
                  disabled={purchasedThemes.includes(theme.id)}
                >
                  {purchasedThemes.includes(theme.id) ? 'Purchased' : 'Buy'}
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeStore;