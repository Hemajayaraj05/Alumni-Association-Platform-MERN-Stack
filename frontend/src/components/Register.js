import React, { useState, useEffect } from 'react';
import './Register.css';


const departments = [
  { code: '101', name: 'Computer Science' },
  { code: '102', name: 'Electrical Engineering' },
  { code: '103', name: 'Mechanical Engineering' },
  { code: '104', name: 'Information Technology' },
  { code: '105', name: 'Biomedical Engineering' },
  { code: '106', name: 'Biotech Engineering' },
  { code: '107', name: 'Civil Engineering' },
  { code: '108', name: 'AIDS Engineering' },

];

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [yearOfPassing, setYearOfPassing] = useState('');
  const [currentlyWorking, setCurrentlyWorking] = useState('');
  const [yearOfJoining, setYearOfJoining] = useState('');
  const [departmentCode, setDepartmentCode] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');

  
  useEffect(() => {
    if (yearOfJoining.length === 2 && departmentCode && rollNumber.length === 3) {
      setRegistrationNumber(`7140${yearOfJoining}${departmentCode}${rollNumber}`);
    } else {
      setRegistrationNumber(''); 
    }
  }, [yearOfJoining, departmentCode, rollNumber]);

  const handleRegistration = (event) => {
    event.preventDefault();
    console.log({
      name,
      email,
      phone,
      yearOfPassing,
      currentlyWorking,
      registrationNumber,
    });
 
  };

  return (
    <div className="registration-form">
      <h2>REGISTRATION FORM</h2>
      <form onSubmit={handleRegistration}>
        <div className="form-grid">
      
          <div className="form-column">
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label>
              Email ID:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Phone Number:
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>

            <label>
              Year of Passing:
              <input
                type="number"
                value={yearOfPassing}
                onChange={(e) => setYearOfPassing(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-column">
            <label>
              Currently Working:
              <input
                type="text"
                value={currentlyWorking}
                onChange={(e) => setCurrentlyWorking(e.target.value)}
                required
              />
            </label>

            <label>
              Year of Joining:
              <input
                type="number"
                value={yearOfJoining}
                onChange={(e) => setYearOfJoining(e.target.value)}
                min="00"
                max="99"
                required
              />
            </label>

            <label>
              Department Code:
              <select
                value={departmentCode}
                onChange={(e) => setDepartmentCode(e.target.value)}
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.code} value={dept.code}>
                    {dept.name} ({dept.code})
                  </option>
                ))}
              </select>
            </label>

            <label>
              Roll Number:
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                pattern="\d{3}"
                title="Roll number should be a 3-digit number"
                maxLength="3"
                required
              />
            </label>

            <label>
              Registration Number:
              <input type="text" value={registrationNumber} readOnly />
            </label>
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
