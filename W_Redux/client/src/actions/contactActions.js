import {GET_CONTACTS,GET_CONTACT,DELETE_CONTACT,ADD_CONTACT,UPDATE_CONTACT} from './types'
import axios from "axios";

export const getContacts = ()=>async dispatch =>{
    let res =await axios.get('http://localhost:8000/contacts')
  dispatch({
      type:GET_CONTACTS,
      payload:res.data
  })
}

export const getContact = (id)=>async dispatch =>{
    let res =await axios.get('http://localhost:8000/contacts/'+id)
  dispatch({
      type:GET_CONTACT,
      payload:res.data
  })
}

export const deleteContacts = (id)=>async dispatch =>{
    await axios.delete('http://localhost:8000/contacts/'+id) 
    dispatch({
        type:DELETE_CONTACT,
        payload:id
    })
  }


  export const addContacts = (newContact)=>async dispatch =>{
    let res =await axios.post('http://localhost:8000/contacts',newContact) 

    dispatch({
        type:ADD_CONTACT,
        payload:res.data
    })
  }


  export const updateContact = (upContact)=>async dispatch =>{
    let res =await axios.put('http://localhost:8000/contacts/'+upContact.id,upContact) 

    dispatch({
        type:UPDATE_CONTACT,
        payload:res.data
    });
    dispatch(getContacts())
  }

  