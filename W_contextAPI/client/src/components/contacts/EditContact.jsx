import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layouts/TextInputGroup';
import axios from 'axios';


class EditContact extends Component {
    state = { 
        name:'',
        email:'',
        phone:'',
        errors:{}
     }

    componentDidMount = async () => {
       const {id} = this.props.match.params;
       const res = await axios.get('http://localhost:8000/contacts/'+id);
       this.setState({
           name:res.data.name,
           email:res.data.email,
           phone:res.data.phone
       })
    }
     
    onValueChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit =async (dispatch,e) =>{
        e.preventDefault();
        const {name, email, phone} = this.state;
        const newContact = {
                name,email,phone
            };

        if(name ===''){
            return(this.setState({
                errors:{name:'Name is required'}
            }))
        }

        if(email ===''){
            return(this.setState({
                errors:{email:'Email is required'}
            }))
            
        }

        if(phone ===''){
            return(this.setState({
                errors:{phone:'Phone is required'}
            })) 
        }

        const {id} = this.props.match.params;

        let res = await axios.put('http://localhost:8000/contacts/'+id,newContact)
        dispatch({
            type:'EDIT_CONTACT',
            payload:res.data
        })
        
        this.props.history.push('/')
     }

    render() { 
        const {name,email,phone,errors}=this.state;

        
        return ( 
            <Consumer>
            {value=>{
                const {dispatch} = value;
                return(
                    <div className='card mb-3'>
                        <div className="card-header">
                            Edit Contact
                        </div>
                        <div className="card-body">
                            <form onSubmit = {this.onSubmit.bind(this,dispatch)}>
                                <TextInputGroup
                                    label='Name'
                                    name='name'
                                    placeholder='Enter Name'
                                    value={name}
                                    onChange={this.onValueChange}
                                    error={errors.name}
                                />

                                <TextInputGroup
                                    label='E-mail'
                                    name='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={this.onValueChange}
                                    error={errors.email}
                                />

                                <TextInputGroup
                                    label='Phone'
                                    name='phone'
                                    placeholder='Enter Phone'
                                    value={phone}
                                    onChange={this.onValueChange}
                                    error={errors.phone}
                                />
                                <input 
                                    type="submit" 
                                    className="btn btn-block"
                                    value='Edit Contact'
                                    />
                            </form>
                        </div>
                    </div>
                )
                
            }}
        </Consumer>
            
         );
    }
}
 
export default EditContact;