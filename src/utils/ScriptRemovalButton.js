import React, { Component } from 'react';
import axios from 'axios';

class ScriptRemovalButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      successMessage: '',
      errorMessage: ''
    };
  }


  handleRemoveScript = async () => {
    const { shopId, identifier } = this.props; // Assuming shopId is passed as a prop

    this.setState({ loading: true, successMessage: '', errorMessage: '' });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/shopify/product-recommendations/`,  // Backend API URL
        { shopId: shopId ,action:"remove_specific_script",preference:identifier , internal_call:true},  // Send shopId in the body of the request
        { headers: { "Content-Type": "application/json",'ngrok-skip-browser-warning': 'true', } }
      );

      if (response.data.success) {
        this.setState({ successMessage: 'Script removed successfully!' });
      } else {
        this.setState({ errorMessage: response.data.error || 'An error occurred' });
      }
    } catch (error) {
      this.setState({ errorMessage: 'Failed to remove script. Please try again.' });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, successMessage, errorMessage } = this.state;
    const { identifier } = this.props;
    return (
      <div>

      
        <button  style={{
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px"
    }} onClick={this.handleRemoveScript} disabled={loading}>
          {loading ? 'Removing...' : 'Remove Tracking Script'}
        </button>

        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>



      
     
     
    );
  }
}

export default ScriptRemovalButton;
