import React from 'react';
import PropTypes from 'prop-types'



const TextInputGroup = ({
    label,name,value,placeholder,type,onChange,error
}) => {
    let errn;
    if(error){
        errn = 'form-control is-invalid'
    }else{
        errn = 'form-control '
    }
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input 
                name={name}
                type={type}
                placeholder={placeholder} 
                className={errn}
                value={value}
                onChange={onChange}
            />
            {error ? <div className='invalid-feedback'>
                {error}
            </div>:null}
            
        </div>
     );
}

TextInputGroup.propTypes={
    label:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    placeholder:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired
}

TextInputGroup.defaultProps = {
    type:'text'
}
 
export default TextInputGroup;