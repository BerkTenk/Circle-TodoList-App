import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const API_URL = 'https://api.circle.com/v1/w3s';
const API_BASE_URL = 'https://api.circle.com';
const API_KEY = process.env.REACT_APP_API_KEY;
const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
};

export const createWallet = async (userId) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/v1/wallets`, { userId }, { headers });
      return response.data;
  } catch (error) {
      console.error('Error creating wallet:', error);
      throw error;
  }
};

export const getWalletDetails = async (walletId) => {
  try {
      const response = await axios.get(`${API_BASE_URL}/v1/wallets/${walletId}`, { headers });
      return response.data;
  } catch (error) {
      console.error('Error getting wallet details:', error);
      throw error;
  }
};

export const get_app_id = async () => {
  try {
    const options = {
      method: "GET",
      url: `${API_URL}/config/entity`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    const response = await axios.request(options);
    return response.data.data.appId;
  } catch (error) {
    console.error(error);
  }
};

export const create_a_new_user = async () => {
  const userId = uuidv4();

  try {
    const options = {
      method: "POST",
      url: `${API_URL}/users`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      data: { userId: userId },
    };

    const response = await axios.request(options);
    console.log(response);
    return {
      userId: userId,
      status: response.data.data.status,
    };
  } catch (error) {
    console.error(error);
  }
};

export const acquire_session_token = async (userId) => {
  try {
    const options = {
      method: "POST",
      url: `${API_URL}/users/token`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      data: { userId: userId },
    };

    const response = await axios.request(options);
    return {
      userToken: response.data.data.userToken,
      encryptionKey: response.data.data.encryptionKey,
    };
  } catch (error) {
    console.error(error);
  }
};



export const transfer = async (userToken) => {
  try {
    const userCredentials = await acquire_session_token(userToken) || {
      userToken: "",
      encryptionKey: "",
    };

    const userToken = userCredentials.userToken;
    const encryptionKey = userCredentials.encryptionKey;
    const idempotencyKey = uuidv4();

    const url = `${API_URL}/user/transactions/transfer`;

    const options = {
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "X-User-Token": userToken,
      },
      data: {
        idempotencyKey: idempotencyKey,
        userId: `${process.env.NEXT_PUBLIC_USER_ID}`,
        destinationAddress: `${process.env.NEXT_PUBLIC_ADDRESS}`,
        refId: "Circle Course Deneme",
        amounts: ["1"],
        feeLevel: "HIGH",
        tokenId: `${process.env.NEXT_PUBLIC_TOKEN_ID}`,
        walletId: `${process.env.NEXT_PUBLIC_WALLET_ID}`,
      },
    };

    console.log(options);

    const response = await axios.request(options);
    console.log(response?.data);
    console.log("user token: ", userToken);
    console.log("encryption key: ", encryptionKey);
    console.log("idempotency key: ", idempotencyKey);
  } catch (error) {
    console.error("error: (hata)" + error);
  }
};