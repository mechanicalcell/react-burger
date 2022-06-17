import { baseUrl } from "../components/utils/base-url"
import { getCookie } from "../components/utils/cookie"

export const getIngredients: any = async () => {
  const res = await fetch(`${baseUrl}ingredients`)
  return res.json()
}

export const getOrderNumber = async (ingredientId: string[]) => {
  const res = await fetch(`${baseUrl}orders`, {
    method: 'POST',
    body: JSON.stringify({
      ingredients: ingredientId 
    }),
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
  return res.json()
}    

export const passwordResetRequest: any = async (email: string) => {
  const res = await fetch(`${baseUrl}password-reset`, {
    method: 'POST',
    body: JSON.stringify({
      "email": email 
    }),
    headers: {
      'Content-type': 'application/json'
    },
  }) 
  return res.json()
}    

export const newPasswordRequest: any = async (newPassword: string, code: string) => {
const res = await fetch(`${baseUrl}password-reset/reset`, {
  method: 'POST',
  body: JSON.stringify({
    "password": newPassword,
    "token": code
  }),
  headers: {
    'Content-type': 'application/json'
  },
})
return res.json()
}    

export const userRegistrationRequest: any = async (name: string, email: string, password: string) => {
const res = await fetch(`${baseUrl}auth/register`, {
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
return res.json()
}

export const loginRequest: any = async (email: string, password: string) => {
const res = await fetch(`${baseUrl}auth/login`, {
  method: 'POST',
  body: JSON.stringify({
    "email": email,
    "password": password,
  }),
  headers: {
    'Content-type': 'application/json'
  },
})
return res.json()
}

export const logoutRequest: any = async (refreshToken: string) => {
const res = await fetch(`${baseUrl}auth/logout`, {
  method: 'POST',
  body: JSON.stringify({
    "token": refreshToken
  }),
  headers: {
    'Content-type': 'application/json'
  },
})
return res.json()
}

export const getUserDataRequest: any = async (accessToken: string) => {
const res = await fetch(`${baseUrl}auth/user`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  },
}) 
return res.json()
}

export const patchUserDataRequest: any = async (accessToken: string, name: string, email: string, password: string) => {
const res = await fetch(`${baseUrl}auth/user`, {
  method: 'PATCH',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${accessToken}`  
  },
  body: JSON.stringify({
    email: email,
    name: name, 
    password: password
  }),  
})
return res.json()
}

export const tokenRefreshRequest: any = async (refreshToken: string) => {
const res = await fetch(`${baseUrl}auth/token`, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify({
    "token": refreshToken
  }),  
})
return res.json()
}