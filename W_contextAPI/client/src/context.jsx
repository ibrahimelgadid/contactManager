import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case 'DELETE_CONTACT':
            
           return{
               ...state,
               contacts:state.contacts.filter(
                   contact => contact._id !== action.payload
               )
           };

        case 'ADD_CONTACT':
            
           return{
               ...state,
               contacts:[action.payload, ...state.contacts]
           };

        case 'EDIT_CONTACT':
            
           return{
               ...state,
               contacts:state.contacts.map(
                   contact =>contact._id === action.payload._id ?
                   (contact = action.payload) :contact
               )
           };
    
        default:
            return state;
    }
}

export class Provider extends Component {
    state = { 
        contacts:[
            
        ],

        dispatch:action => this.setState(
            state=>reducer(state,action)
            )
     }

        async componentDidMount() {
        let res =await axios.get('http://localhost:8000/contacts')
        
        this.setState({contacts:res.data})
     }
     
     

    render() { 
        return ( 
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
         );
    }
}

export const Consumer = Context.Consumer;