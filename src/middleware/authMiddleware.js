export const auth = (req, res, next) => {
    if (req.session.email) {
      next();
    } else {
      // res.locals.errorMsg='only recruiter is allowed to access this page, login as recruiter to continue'
      res.render('404',{ errorMsg: 'only recruiter is allowed to access this page, login as recruiter to continue',recruiterEmail:req.session.email,recruiterName:req.session.name })
    }
  };
  