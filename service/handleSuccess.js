function handleSuccess (res, data){
  res.send({
    status: true,
    data
  })
  res.end();
}
module.exports = handleSuccess;