"use server"

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;
export const initialize_user = async (userToken) => {
    const idempotencyKey = uuidv4(); // generates an idempotency key
  
    try {
      const options = {
        method: "POST",
        url: 'https://api.circle.com/v1/w3s/user/initialize'
  ,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
          "X-User-Token": `${userToken}`,
        },
        data: {
          idempotencyKey: idempotencyKey,
          accountType: "SCA",
          blockchains: ["MATIC-AMOY"],
        },
      };
  
      const response = await axios.request(options);
      console.log("response:", response);
  
      return response.data.data.challengeId;
    } catch (error) {
      console.error(error);
    }
  };