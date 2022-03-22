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
