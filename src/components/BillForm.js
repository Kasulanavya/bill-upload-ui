import React, { useState } from 'react';

function BillForm() {
  const [form, setForm] = useState({
    hospitalName: '',
    patientName: '',
    amount: '',
    date: '',
    file: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File too large! Max 5MB allowed.');
      return;
    }   

    setForm({ ...form, file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.hospitalName || !form.patientName || !form.amount || !form.file) {
      alert('Please fill all required fields!');
      return;
    }
    alert('Form submitted successfully!');
    console.log('Form Data:', form);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input name="hospitalName" placeholder="Hospital Name" onChange={handleChange} required />
      <input name="patientName" placeholder="Patient Name" onChange={handleChange} required />
      <input name="amount" type="number" placeholder="Amount" onChange={handleChange} required />
      <input name="date" type="date" onChange={handleChange} />
      <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileChange} required />

      {preview && (
        <div className="preview">
          <p>Preview:</p>
          {form.file.type === 'application/pdf' ? (
            <p>📄 PDF File Uploaded</p>
          ) : (
            <img src={preview} alt="Preview" height="100px" />
          )}
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}

export default BillForm;
