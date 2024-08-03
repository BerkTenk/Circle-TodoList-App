"use server"

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;
export const initialize_user = async (userToken) => {
  const options = {
    method: 'POST',
    url: 'https://api.circle.com/v1/w3s/user/wallets',
    headers: {
      accept: 'application/json',
      'X-User-Token': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoTW9kZSI6IlBJTiIsImRldmVsb3BlckVudGl0eUVudmlyb25tZW50IjoiVEVTVCIsImVudGl0eUlkIjoiOGM5Y2E2ZmQtNTBhYi00YWFmLTkyN2YtMTU3Yzg1YjE3MzZkIiwiZXhwIjoxNzIyNjI5NjkzLCJpYXQiOjE3MjI2MjYwOTMsImludGVybmFsVXNlcklkIjoiNjBlYWMwODAtNWFkYy01M2I3LWEyNmEtNzZjYTc5NjQ2ZmI1IiwiaXNzIjoiaHR0cHM6Ly9wcm9ncmFtbWFibGUtd2FsbGV0LmNpcmNsZS5jb20iLCJqdGkiOiJmYjkxNGFkNy00MjhiLTQxZmQtODRmYS04YjkyNWIxZjUxMTAiLCJzdWIiOiI2NGQ3OWY5Ni1lNDJjLTQ1ZTctYWZhOC02MzNjOGQwZTMyNGYifQ.ZGLnqbyZwlZ2DrdBCVo_r0tiTLC0sQvJ0vmJzsvl5rzfCQeGItEbOKTpWQ5nJLDubpir6S-UMsfILYW2x6YlRwGYiTGIcqUET6zqtFWbf8nOd73rGhyTh5B29KeZhIaN2Mo6b45oWkN3pI722lDhWVNBGtfvKqP3lfPW7sB3vT6HAkdJB6r6_E16_w48XUOvEiKquFfNFBQ2is_7-wSDfLUEisTXtCdvlVUsD5jN2G5P64i8XI27_UrDVDVb0vP0I3ILcMdbgzqz1JW7YZbiPUleeTuvjQpC28iBCuuIl3t5WDsEuM3c8E_Dl_ypC9s33qG1KBTcxo1SqyXGfM51gA',
      'content-type': 'application/json',
      authorization: 'Bearer TEST_API_KEY:8f22c069dcd303edfb0006a60abe69f0:eb14847d6a736b21113c85f3e039762a'
    },
    data: {
      accountType: 'EOA',
      blockchains: ['MATIC-AMOY'],
      idempotencyKey: '831572bf-d9a2-4dda-acf5-535cd3e86d23'
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