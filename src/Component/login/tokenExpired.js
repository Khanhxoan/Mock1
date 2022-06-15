import jwtDecode from "jwt-decode";

const tokenExpired = (accessToken, callback) => {
  let timeExpired;
  window.clearTimeout(timeExpired);
  const currentTime = Date.now();
  const { exp } = jwtDecode(accessToken);
  const timeLeft = exp * 1000 - currentTime;

  timeExpired = window.setTimeout(() => {
    console.log("expired");
    callback();
  }, timeLeft);
};

export default tokenExpired;
