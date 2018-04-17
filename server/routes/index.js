var path    = require("path");
module.exports = function(router){
  // middleware to use for all requests
  router.use(function(req, res, next) {
    // do logging
    //console.log("response",res);
    //console.log("request",req);
    next(); // make sure we go to the next routes and don't stop here
  });

  router.get('/', function(req, res) {
    console.log("Render index");
    res.render('index');
    // res.sendFile(path.join(__dirname+'../../../index.html'));
    // res.json({ message: 'hooray! welcome to our api!' });
  });

  return router;
}
