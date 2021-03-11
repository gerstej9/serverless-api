'use strict';

const superagent = require ('superagent');


describe('testing server for CRUD functions', () =>{
  it ('should respond with an array of database items', async () => {
    const response = await superagent.get('https://5sj9nuiwd2.execute-api.us-west-2.amazonaws.com/test/people');
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].id).toEqual('001');
  })
  it ('should respond with a single database item when provided with ID parameter', async () => {
    const response = await superagent.get('https://5sj9nuiwd2.execute-api.us-west-2.amazonaws.com/test/people/001');
    expect(response.body[0].id).toEqual('001');
    expect(response.body[0].name).toEqual('James');
  })
  it ('should respond with a newly created database item when provided item on POST', async () => {
    const response = await superagent
      .post('https://5sj9nuiwd2.execute-api.us-west-2.amazonaws.com/test/people/')
      .send({id:'009', name: 'Bond', phone: '111-111-1121'})
    expect(response.body.phone).toEqual('111-111-1121');
    expect(response.body.name).toEqual('Bond');
  })
  it ('should respond with a newly updated database item when provided id on PUT', async () => {
    const createPerson = await superagent
    .post('https://5sj9nuiwd2.execute-api.us-west-2.amazonaws.com/test/people/')
    .send({id:'010', name: 'Scooby', phone: '111-111-1121'})
    const response = await superagent
      .put(`https://5sj9nuiwd2.execute-api.us-west-2.amazonaws.com/test/people/${createPerson.body.id}`)
      .send({id:'200', name: 'Scrappy', phone: '111-222-1121'})
    expect(response.body[0].phone).toEqual('111-222-1121');
    expect(response.body[0].name).toEqual('Scrappy');
  })
  it ('should respond an empty object after item deleted when provided id on delete', async () => {
    const createPerson = await superagent
    .post('https://5sj9nuiwd2.execute-api.us-west-2.amazonaws.com/test/people/')
    .send({id:'010', name: 'SoonToBeGone', phone: '123-456-789'})
    const response = await superagent
      .delete(`https://5sj9nuiwd2.execute-api.us-west-2.amazonaws.com/test/people/${createPerson.body.id}`);
    expect(response.body).toEqual({});
  })
})