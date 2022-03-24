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

export const checkAuthorAuth = (user, element) => {
  if (user?.id == element?.userId) {
    return true;
  }
  return false;
};
