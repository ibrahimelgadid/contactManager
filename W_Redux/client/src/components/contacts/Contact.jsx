import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteContacts } from "../../actions/contactActions";

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onDeleteClick = id => {
    //// DELETE CONTACT ////
    this.props.deleteContacts(id)
    
  };

  render() {
    const { _id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <div className="card card-body mb-3">
        <h4>
          {name}{' '}
          <i
            onClick={() =>
              this.setState({
                showContactInfo: !this.state.showContactInfo
              })
            }
            className="fa fa-sort-down"
            style={{ cursor: 'pointer' }}
          />
          <i
            className="fa fa-times"
            style={{ cursor: 'pointer', float: 'right', color: 'red' }}
            onClick={this.onDeleteClick.bind(this, _id)}
          />
          <Link to={`contact/edit/${_id}`}>
            <i
              className="fa fa-pencil"
              style={{
                cursor: 'pointer',
                float: 'right',
                color: 'black',
                marginRight: '1rem'
              }}
            />
          </Link>
        </h4>
        {showContactInfo ? (
          <ul className="list-group">
            <li className="list-group-item">Email: {email}</li>
            <li className="list-group-item">Phone: {phone}</li>
          </ul>
        ) : null}
      </div>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  deleteContacts:PropTypes.func.isRequired
};
// const mapStateToProps = state =>({
//   con
// })

export default connect(null, {deleteContacts}) (Contact);
