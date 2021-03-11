const dynamoose = require('dynamoose');
const peopleModel = require('./people.schema.js');

exports.handler = async(event) => {

  let data;
  let id = event.pathParameters && event.pathParameters.id;
  const {name, phone } = JSON.parse(event.body);
  try{
    let result = await peopleModel.update({id: id, name: name, phone: phone});
    console.log(result);
    peopleModel.update({id: id, name: name, phone: phone }, function (err) {
  if (err) {
    return console.log(err);
  }

})
      data = await peopleModel.query('id').eq(id).exec();
  }catch(e){
    return {
      statusCode: 500,
      body: e.message,
    }
  }
  let response = {
    statusCode: 200,
    body: JSON.stringify(data),
  }
  console.log(response.body);
  return response;
}