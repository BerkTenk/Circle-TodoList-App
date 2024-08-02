"use server"

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;
export const initialize_user = async (userToken) => {
    const idempotencyKey = uuidv4(); // generates an idempotency key
  
    try{
      const response = await axios.post('http://localhost:5000/api/initialize_user',{idempotencyKey} );
      console.log("idempotency key:", idempotencyKey);
      return response.data.challengeId;
    } catch (error){
      console.error("Error in initializeUser", error.response?.data || error.message );
    }
  }