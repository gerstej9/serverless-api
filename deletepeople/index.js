const dynamoose = require('dynamoose');
const peopleModel = require('./people.schema.js');

exports.handler = async(event) => {

  let data;
  let id = event.pathParameters && event.pathParameters.id;
  try{
    let result = await peopleModel.delete({id: id});
    console.log(result);
  }catch(e){
    return {
      statusCode: 500,
      body: e.message,
    }
  }
  let response = {
    statusCode: 200,
    body: JSON.stringify({}),
  }
  console.log(response.body);
  return response;
}