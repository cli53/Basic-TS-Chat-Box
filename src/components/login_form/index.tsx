import React from "react";

const LoginForm = () => {
  return (
    <form>
      <label htmlFor="username" />
      <input type="text" />
      <label htmlFor="password" />
      <input type="password" name="password" id="" />
      <input type="submit" name="submit" />
    </form>
  );
};

export default LoginForm;
