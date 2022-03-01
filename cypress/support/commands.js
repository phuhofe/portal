Cypress.Commands.add('gotoLoginKeycloak', () => {
  const kcRoot = 'http://localhost:8080';
  const kcRealm = 'demo';
  const kcClient = 'my-app';
  const kcRedirectUri = 'http://localhost:4200/';

  const loginPageRequest = {
    url: `${kcRoot}/auth/realms/${kcRealm}/protocol/openid-connect/auth`,
    qs: {
      client_id: kcClient,
      redirect_uri: kcRedirectUri,
      response_mode: 'fragment',
      response_type: 'code',
      scope: 'openid',
      nonce: createUUID()
    }
  };

  return cy.request(loginPageRequest);
});


Cypress.Commands.add('KeycloakLogin', (username, password) => {

  const kcRoot = 'http://localhost:8080';
  const kcRealm = 'demo';
  const kcClient = 'my-app';
  const kcRedirectUri = 'http://localhost:4200/';

  const loginPageRequest = {
    url: `${kcRoot}/auth/realms/${kcRealm}/protocol/openid-connect/auth`,
    qs: {
      client_id: kcClient,
      redirect_uri: kcRedirectUri,
      response_mode: 'fragment',
      response_type: 'code',
      scope: 'openid',
      nonce: createUUID()
    }
  };

  cy.visit(loginPageRequest);


  // Open the KC login page, fill in the form with username and password and submit.
  return cy.request(loginPageRequest)
    .then(submitLoginForm);


  function submitLoginForm(response) {

    const _el = document.createElement('html');
    _el.innerHTML = response.body;
    const loginForm = _el.getElementsByTagName('form');

    cy.get('[data-cy=usernameInput]').type(username);
    cy.get('[data-cy=passwordInput]').type(password);
    cy.get('[data-cy=doLoginButton]').click();

    cy.request({
      form: true,
      method: 'POST',
      url: loginForm[0].action,
      followRedirect: true,
      body: {
        username: username,
        password: password
      }
    });

    return cy.request('http://localhost:4200').then((response) => {
      console.log('response', response);
    });
  }

  // Copy-pasted code from KC javascript client. It probably doesn't need to be
  // this complicated but I refused to spend time on figuring that out.
});

function createUUID() {
  let s = [];
  let hexDigits = '0123456789abcdef';
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';
  return s.join('');
}


