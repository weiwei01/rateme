
module.exports = (app, passport) => {
  app.get('/', (req, res, next) =>{
    res.render('index',{title: 'Index || RateMe'});
  });
  app.get('/signup', (req, res) =>{
    var errors = req.flash('error');
    console.log(errors);
    res.render('user/signup', {title: 'Sign Up || RateMe', messages:errors, hasErrors:
    errors.length > 0});
  });

  app.post('/signup', validate, passport.authenticate('local.signup', {
    successRedirect:'/',
    failureRedirect:'/signup',
    failureFlash:true
  }));



  app.get('/login', (req, res) =>{
    res.render('user/login', {title: 'Log In || RateMe'});
  });
};


function validate(req, res, next){
  req.checkBody('fullname', 'Full name is Required').notEmpty();
  req.checkBody('fullname', 'Full name Must Not Be Less Than 5').isLength({min:5});
  req.checkBody('email', 'Email is Required').notEmpty();
  req.checkBody('email', 'Email is Invalid').isEmail();
  req.checkBody('password', 'Password is Required').notEmpty();
  req.checkBody('password', 'Password Must Not Be Less Than 5').isLength({min:5});
  req.check("password", "Password Must Contain at least 1 Number.").matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/, "i");

  var errors = req.validationErrors();

  if (errors){
    var messages = [];
    errors.forEach((error) => {
      messages.push(error.msg);
    });
    req.flash('error', messages);
    res.redirect('/signup');
  }else{
    return next();
  }
}
