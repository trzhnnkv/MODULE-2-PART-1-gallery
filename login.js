const TOKEN_KEY = 'token'; // expected token
const TOKEN_LIFE_TIME = 10 * 60 * 1000; // 10 minutes

const btnLogin = document.querySelector('.btnLogin');

function clearLocalStorage() {
  localStorage.removeItem(TOKEN_KEY);
  location.reload();
}

async function login(user) {
  try {
    const responseLogin = await fetch(
      'https://hjdjs55gol.execute-api.us-east-1.amazonaws.com/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
      }
    );

    const resultLogin = await responseLogin.json();
    const resultToken = resultLogin.token;

    if (resultToken === TOKEN_KEY) {
      localStorage.setItem(TOKEN_KEY, resultToken);
      setTimeout(clearLocalStorage, TOKEN_LIFE_TIME);

      alert('You have successfully logged in!');
    }
  } catch (error) {
    alert(error);
  }
}

const loginES = btnLogin.addEventListener('click', e => {
  e.preventDefault();

  const passwordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,8}$/;

  const mail = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!passwordValid.test(password)) {
    return alert('Password is not valid');
  }

  const user = {
    email: mail,
    password: password,
  };

  login(user);
});

export {
  clearLocalStorage,
  login,
  btnLogin,
  TOKEN_KEY,
  TOKEN_LIFE_TIME,
  loginES,
};
