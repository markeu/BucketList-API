export default {
    checkForEmptyFields: (field, value) => {
      if (!value || !value.trim()) return [`${field} is required`];
      return [];
    },
  
    checkPatternedFields: (field, value, regex) => {
      if (!regex.test(value)) return [`${field} is invalid`];
      return [];
    },
  
    checkIntergerFields: (field, value) => {
      const valueInt = parseFloat(value);
      if (!Number(valueInt)) return [`${field} must be number or float`];
      return [];
    },
  
    checkStringFields: (field, value) => {
      if (/\d/.test(value)) return [`${field} must not contain numbers.`];
      return [];
    },
  
    checkStatus: (field, value) => {
      const final = value.includes('Active' || 'Cancelled');
      if (!final) return [`${field} must be limited to ACTIVE or CANCELLED.`];
      return [];
    },
  };
  