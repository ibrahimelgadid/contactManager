import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Consumer } from '../../context';
import axios from 'axios';
import { Link } from 'react-router-dom';



class Contact extends Component {

    state={
        showingUser :false
    };

    toggleShowingUser=(e)=>{
        this.setState ({
           showingUser:!this.state.showingUser
        })
       
    };

    deleteItem = async (id,dispatch)=>{
        await axios.delete(`http://localhost:8000/contacts/${id}`)
        dispatch({
            type:"DELETE_CONTACT",
            payload:id
          })
      
    };

    render() { 
        let sort;
        if(this.state.showingUser){
            sort = 'fa fa-sort-down'
        }else{
            sort = 'fa fa-sort-up'
        }
        const {_id, name, email, phone} = this.props.contact;

        return(
            <Consumer>
                {value=>{
                    const { dispatch } = value;
                    return ( 
                        <div className='card card-body mb-3'>
                        
                            <h5  className='card-header'>
                                {name}{' '}
                                <i  style={{cursor:'pointer'}}
                                    onClick={this.toggleShowingUser}
                                    className= {sort}>
                                    </i> 
                                    <i
                                    onClick={()=>this.deleteItem(_id,dispatch)}
                                    style={{cursor:'pointer', float:'right', color:'red'}}
                                    className="text-danger fa fa-times">
                                    </i>
                                    <Link to={`/contact/edit/${_id}`} >
                                        <i
                                        style={{cursor:'pointer', float:'right', color:'green'}}
                                        className="text-success mr-2 fa fa-edit">
                                        </i>
                                    </Link>
                                    
                            </h5>
                            
                            {this.state.showingUser ? (
                                <ul className='list-group'>
                                    <li className='list-group-item'>Email: {email}</li>
                                    <li className='list-group-item'>Phone: {phone}</li>
                                </ul>
                            ) : null}
                        </div>
                    );
                }}
            </Consumer>
        )
    }
}

Contact.propTypes ={
    contact:PropTypes.object.isRequired
}

 
export default Contact;