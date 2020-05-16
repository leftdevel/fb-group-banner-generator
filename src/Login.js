const siteUrl = "https://www.facebook.com/";
const usernameSelector = "#email";
const passSelector = "#pass";
const submitSelector = "#login_form input[type='submit']";


const Login = async (page) => {
  const username = process.env.USERNAME;
  const pass = process.env.PASS;

  await page.goto(siteUrl);
  await page.click(usernameSelector);
  await page.keyboard.type(username);
  await page.click(passSelector);
  await page.keyboard.type(pass);
  await page.click(submitSelector);
  await page.waitForNavigation();
};

export default Login;
