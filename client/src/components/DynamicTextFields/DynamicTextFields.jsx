import React, { useState } from 'react';

const DynamicTextFields = () => {
  const [textFields, setTextFields] = useState(['']);

  const handleTextFieldChange = (index, event) => {
    const newFields = [...textFields];
    newFields[index] = event.target.value;
    setTextFields(newFields);
  };

  const handleAddTextField = () => {
    setTextFields([...textFields, '']);
  };

  return (
    <div>
      {textFields.map((text, index) => (
        <div key={index}>
          <input
            type='text'
            value={text}
            onChange={(event) => handleTextFieldChange(index, event)}
          />
        </div>
      ))}
    </div>
  );
};

export default DynamicTextFields;
