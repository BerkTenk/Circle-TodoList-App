import React, { useState } from 'react';
import { Button, Container, Form, Row, Col, Alert } from 'react-bootstrap';
import { get_app_id, create_a_new_user, acquire_session_token, getWalletDetails } from '../api/CircleApi';
import { initialize_user } from '../api/ChallengeId';
import { Link } from 'react-router-dom';
function WalletPage() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [tokenAmount, setTokenAmount] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [encryptionKey, setEncryptionKey] = useState(null);
  const [challengeId, setChallengeId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [walletId, setWalletId] = useState('');
  const [walletDetails, setWalletDetails] = useState(null);

  const handleLogin = async () => {
    try {
        setError('');  // Önceki hataları temizle
        const details = await getWalletDetails(walletId);
        setWalletDetails(details);
    } catch (error) {
        console.error('Error during wallet login:', error);
        setError('Girdiğiniz wallet ID geçersiz veya bulunamadı.');
    }
};

  const handleNewWallet = async () => {
    setLoading(true);
    setError(null);

    try {
      const appId = await get_app_id();
      const userResponse = await create_a_new_user();
      const tokenResponse = await acquire_session_token(userResponse.userId);
      const challengeId = await initialize_user(tokenResponse.userToken);

      setUserId(userResponse.userId);
      setUserToken(tokenResponse.userToken);
      setEncryptionKey(tokenResponse.encryptionKey);
      setChallengeId(challengeId);

      console.log('User ID:', userResponse.userId);
      console.log('User Token:', tokenResponse.userToken);
      console.log('Encryption Key:', tokenResponse.encryptionKey);
      console.log('Challenge ID:', challengeId);
    } catch (error) {
      setError("Handle new wallet error: " + error.message);
      console.error("Handle new wallet error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Wallet Register And Login</h1>
      <div className='d-flex justify-content-center mb-4'>
      <Button variant="primary m-2" >
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Return To Home</Link>
      </Button></div>
      <Row>
        <Col>
      <Button onClick={handleNewWallet} disabled={loading}>
        {loading ? 'Creating Wallet...' : 'Create Wallet'}
      </Button>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {challengeId && <Alert variant="success" className="mt-3">Challenge ID: {challengeId}</Alert>}
      <Form className="mt-4">
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">User ID</Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={userId || 'N/A'} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">User Token</Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={userToken || 'N/A'} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Encryption Key</Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={encryptionKey || 'N/A'} />
          </Col>
        </Form.Group>
      </Form>
      </Col>
      <Col>
      <div>
            <h2>Mevcut Wallet ID ile Giriş Yap</h2>
            <input 
                type="text"
                placeholder="Wallet ID"
                value={walletId}
                onChange={(e) => setWalletId(e.target.value)}
            />
            <button onClick={handleLogin}>
                Giriş Yap
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {walletDetails && (
                <div>
                    <h3>Wallet Detayları</h3>
                    <p>Wallet ID: {walletDetails.data.id}</p>
                    <p>Toplam Token Miktarı: {walletDetails.data.balances.totalAmount}</p>
                </div>
            )}
        </div>
      </Col>
      </Row>
    </Container>
  );
}

export default WalletPage;
