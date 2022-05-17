const filterRequestBody = (requestBody, ...allowedFields) => {
    const filterRequest = {};
    Object.keys(requestBody).forEach((el) => {
      if (allowedFields.includes(el)) {
        filterRequest[el] = requestBody[el];
      }
    });
  
    return filterRequest;
  };


  export default filterRequestBody;