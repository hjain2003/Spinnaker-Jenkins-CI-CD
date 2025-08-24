import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    amount: '',
    email: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.substring(0, 19);
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
      if (formattedValue.length > 5) formattedValue = formattedValue.substring(0, 5);
    }

    // Format CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 3) formattedValue = formattedValue.substring(0, 3);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStatus('');

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStatus('success');
      // Reset form after successful payment
      setTimeout(() => {
        setFormData({
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          cardHolder: '',
          amount: '',
          email: ''
        });
        setPaymentStatus('');
      }, 3000);
    }, 2000);
  };

  const getCardType = (cardNumber) => {
    const num = cardNumber.replace(/\s/g, '');
    if (num.startsWith('4')) return 'visa';
    if (num.startsWith('5') || num.startsWith('2')) return 'mastercard';
    if (num.startsWith('3')) return 'amex';
    return '';
  };

  return (
    <div className="App">
      <div className="payment-container">
        <div className="payment-header">
          <h1>Secure Payment</h1>
          <div className="security-badges">
            <span className="badge">🔒 SSL Secured</span>
            <span className="badge">💳 PCI Compliant</span>
          </div>
        </div>

        {paymentStatus === 'success' && (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h3>Payment Successful!</h3>
            <p>Thank you for your payment. You will receive a confirmation email shortly.</p>
          </div>
        )}

        {paymentStatus !== 'success' && (
          <form onSubmit={handlePayment} className="payment-form">
            <div className="form-section">
              <h3>Payment Details</h3>
              
              <div className="input-group">
                <label htmlFor="amount">Amount</label>
                <div className="amount-input">
                  <span className="currency">$</span>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    min="0.01"
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Card Information</h3>
              
              <div className="input-group">
                <label htmlFor="cardHolder">Cardholder Name</label>
                <input
                  type="text"
                  id="cardHolder"
                  name="cardHolder"
                  placeholder="John Doe"
                  value={formData.cardHolder}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="cardNumber">Card Number</label>
                <div className="card-input">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="card-icons">
                    <span className={`card-icon ${getCardType(formData.cardNumber) === 'visa' ? 'active' : ''}`}>💳</span>
                    <span className={`card-icon ${getCardType(formData.cardNumber) === 'mastercard' ? 'active' : ''}`}>💳</span>
                  </div>
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className={`pay-button ${isProcessing ? 'processing' : ''}`}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="spinner"></span>
                  Processing Payment...
                </>
              ) : (
                <>
                  🔒 Pay ${formData.amount || '0.00'}
                </>
              )}
            </button>

            <div className="payment-footer">
              <p>🔐 Your payment information is encrypted and secure</p>
              <div className="accepted-cards">
                <span>We accept:</span>
                <div className="card-logos">
                  <span>💳 Visa</span>
                  <span>💳 Mastercard</span>
                  <span>💳 Amex</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;