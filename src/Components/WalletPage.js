import React, { useState } from 'react';
import { Button, Container, Form, Row, Col, Alert } from 'react-bootstrap';
import { get_app_id, create_a_new_user, acquire_session_token } from '../api/CircleApi';
import { initialize_user } from '../api/ChallengeId';

function WalletPage() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [tokenAmount, setTokenAmount] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [encryptionKey, setEncryptionKey] = useState(null);
  const [challengeId, setChallengeId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      <h1 className="my-4">Nice Wallet</h1>
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
    </Container>
  );
}

export default WalletPage;
