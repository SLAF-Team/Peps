export const checkLogAuth = (user) => {
  if (!user) {
    return false;
  }
  return true;
};

export const checkAdminAuth = (user) => {
  if (user?.isadmin) {
    return true;
  }
  return false;
};

export const emailValidation = (email) => {
  if (
    email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return true;
  }
  return false;
};
