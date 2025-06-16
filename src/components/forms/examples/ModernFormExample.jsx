import React, { useState } from 'react';
import {
  FormContainer,
  FormLayout,
  FormInput,
  FormSelect,
  FormTextarea,
  FormButton
} from '../index';

const ModernFormExample = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      // Reset form or show success message
    }, 1500);
  };

  const departmentOptions = [
    { value: 'hr', label: 'Human Resources' },
    { value: 'it', label: 'Information Technology' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Finance' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <FormContainer
        title="Employee Information"
        subtitle="Please fill in the details below to register a new employee."
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <FormLayout cols={2}>
          <FormInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            required
          />
          <FormInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            required
          />
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            required
          />
          <FormInput
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
          />
          <FormSelect
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            options={departmentOptions}
            required
          />
          <FormInput
            label="Job Title/Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g., Software Developer"
            required
          />
        </FormLayout>
        
        <FormTextarea
          label="Additional Notes"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Any additional information or special requirements..."
          rows={4}
        />
        
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
          <FormButton
            type="button"
            variant="secondary"
            onClick={() => setFormData({
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              role: '',
              department: '',
              message: ''
            })}
            disabled={isSubmitting}
          >
            Reset
          </FormButton>
          <FormButton
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Save Employee'}
          </FormButton>
        </div>
      </FormContainer>
    </div>
  );
};

export default ModernFormExample;
