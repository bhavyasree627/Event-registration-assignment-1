import React, { useState } from 'react';
import './EventRegistrationForm.css';

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: false,
    guestName: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.email) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "Email is invalid";
    if (!formData.age) formErrors.age = "Age is required";
    else if (isNaN(formData.age) || formData.age <= 0) formErrors.age = "Age must be a number greater than 0";
    if (formData.attendingWithGuest && !formData.guestName) formErrors.guestName = "Guest Name is required if attending with a guest";
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitted(true);
    } else {
      setErrors(formErrors);
    }
  };

  if (isSubmitted) {
    return (
      <div className="confirmation">
        <div className="checkmark">✓</div>
        <h2>Registration Successful</h2>
        <div className="registered-info">
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Age:</strong> {formData.age}</p>
          {formData.attendingWithGuest && (
            <p><strong>Guest Name:</strong> {formData.guestName}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-field">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="form-field">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="form-field">
        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} />
        {errors.age && <span className="error">{errors.age}</span>}
      </div>
      <div className="form-field">
        <label>Are you attending with a guest?</label>
        <input type="checkbox" name="attendingWithGuest" checked={formData.attendingWithGuest} onChange={handleChange} />
      </div>
      {formData.attendingWithGuest && (
        <div className="form-field">
          <label>Guest Name:</label>
          <input type="text" name="guestName" value={formData.guestName} onChange={handleChange} />
          {errors.guestName && <span className="error">{errors.guestName}</span>}
        </div>
      )}
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default EventRegistrationForm;
