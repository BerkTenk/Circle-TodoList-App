"use server"

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;
export const initialize_user = async (userToken) => {
  const idempotencyKey = uuidv4();
  const options = {
    method: 'POST',
    url: 'http://localhost:5000/api/ChallengeId',
    headers: {
      accept: 'application/json',
      'X-User-Token': {userToken},
      'content-type': 'application/json',
      authorization: 'Bearer TEST_API_KEY:8f22c069dcd303edfb0006a60abe69f0:eb14847d6a736b21113c85f3e039762a'
    },
    data: {
      accountType: 'EOA',
      blockchains: ['MATIC-AMOY'],
      idempotencyKey: idempotencyKey,
    }
  };
  
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  }