import { baseUrl } from "../components/utils/base-url"
import { CustomResponse } from "./api-types"

export const getIngredients = async (): Promise<CustomResponse> => await fetch(`${baseUrl}ingredients`)

export const getOrderNumber = (ingredientId: string[]): Promise<CustomResponse> => 
  fetch(`${baseUrl}orders`, {
    method: 'POST',
    body: JSON.stringify({
      ingredients: ingredientId 
    }),
    headers: {
      'Content-type': 'application/json'
    },
  })    

export const passwordResetRequest = (email: string): Promise<CustomResponse> => 
  fetch(`${baseUrl}password-reset`, {
    method: 'POST',
    body: JSON.stringify({
      "email": email 
    }),
    headers: {
      'Content-type': 'application/json'
    },
  }) 

export const newPasswordRequest = (newPassword: string, code: string): Promise<CustomResponse> => 
fetch(`${baseUrl}password-reset/reset`, {
  method: 'POST',
  body: JSON.stringify({
    "password": newPassword,
    "token": code
  }),
  headers: {
    'Content-type': 'application/json'
  },
})

export const userRegistrationRequest = (name: string, email: string, password: string): Promise<CustomResponse> => 
fetch(`${baseUrl}auth/register`, {
  method: 'POST',
  body: JSON.stringify({
    "email": email,
    "password": password,
    "name": name
  }),
  headers: {
    'Content-type': 'application/json'
  },
}) 

export const loginRequest = async (email: string, password: string): Promise<CustomResponse> => 
 await fetch(`${baseUrl}auth/login`, {
  method: 'POST',
  body: JSON.stringify({
    "email": email,
    "password": password,
  }),
  headers: {
    'Content-type': 'application/json'
  },
})

export const logoutRequest = async (refreshToken: string): Promise<CustomResponse> => 
await fetch(`${baseUrl}auth/logout`, {
  method: 'POST',
  body: JSON.stringify({
    "token": refreshToken
  }),
  headers: {
    'Content-type': 'application/json'
  },
})

export const getUserDataRequest = async (accessToken: string): Promise<CustomResponse> => 
await fetch(`${baseUrl}auth/user`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
    Authorization: accessToken
  },
})

export const patchUserDataRequest = async (accessToken: string, name: string, email: string, password: string): Promise<CustomResponse> => 
await fetch(`${baseUrl}auth/user`, {
  method: 'PATCH',
  headers: {
    'Content-type': 'application/json',
    Authorization: accessToken
  },
  body: JSON.stringify({
    email: email,
    name: name, 
    password: password
  }),  
})

export const tokenRefreshRequest = async (refreshToken: string): Promise<CustomResponse> => 
await fetch(`${baseUrl}auth/token`, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify({
    "token": refreshToken
  }),  
})
