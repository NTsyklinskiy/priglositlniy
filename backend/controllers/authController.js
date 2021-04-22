const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id => {
  return jwt.sign({id}, 'secretniypriglostutAyaTut', {expiresIn: 90})
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), 
    httpOnly: true
  }

  if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions)


  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  })
}

exports.login = catchAsync(async (req,res,next) => {
  const {firstName, lastName} = req.body;

  console.log(req.body);
  if(!firstName || !lastName) {
    return next(new AppError('Please provide email and password!',400))
  }
  const fl = String(`${firstName + lastName}`).toLocaleLowerCase()
  // console.log({fl: fl});
  const user = await User.findOne({fl: fl}  )
  // console.log(user);
  if(!user) {
    return next(new AppError('Попробуйте ещё раз', 401))
  }

  createSendToken(user, 200, res)
})

exports.protect = catchAsync(async(req,res,next)=> {
  // Getting token and check of it's there
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }
  if(!token) {
    return next(new AppError('You are not logged in! Please log in to get access.',401))
  }

  // Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

// Check if user still exists
  const currentUser = await User.findById(decoded.id)
  if(!currentUser) {
    return next(new AppError('The user belonging to this token does  no longer exist', 401))
  }
  if(currentUser.changePasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again.', 401))
  }

  // Grant access to protectd route
  req.user = currentUser;
  // console.log(req.user);
  next()
})

