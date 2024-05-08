const TOKEN_KEY: string = 'token'; // expected token
const TOKEN_LIFE_TIME: number = 10 * 60 * 1000; // 10 minutes

const btnLogin: Element | null = document.querySelector('.btnLogin');

function clearLocalStorage(): void {
  localStorage.removeItem(TOKEN_KEY);
  location.reload();
}

interface IUser {
  email: string;
  password: string;
}

async function login(user: IUser): Promise<void> {
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

const loginES = btnLogin?.addEventListener('click', e => {
  e?.preventDefault();

  const passwordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,8}$/;

  const mail: string = (document.getElementById('email') as HTMLInputElement).value;
  const password: string = (document.getElementById('password') as HTMLInputElement).value;

  if (!passwordValid.test(password)) {
    return alert('Password is not valid');
  }

  const user: IUser = {
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
