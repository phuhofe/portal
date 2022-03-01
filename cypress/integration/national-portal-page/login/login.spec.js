describe('Login with Keycloak', () => {

  const beVisible = 'be.visible';

  // it('should navigate to login page in Keycloak', () => {
  //   cy.visit('')
  //   cy.get('[data-cy=mainMenu]').click();
  //   cy.get('[data-cy=administratorLogin]').click({force: true});
  //   cy.gotoLoginKeycloak().then(() => {
  //   });
  //
  //   cy.get('.login-title')
  //     .should(beVisible)
  //     .contains(loginConstant.loginTitle);
  //   cy.get('.login-description')
  //     .should(beVisible)
  //     .contains(loginConstant.loginDescription);
  //
  //   cy.get('[data-cy=usernameLabel]')
  //     .should(beVisible)
  //     .contains(loginConstant.usernameLabel);
  //   cy.get('[data-cy=passwordLabel]')
  //     .should(beVisible)
  //     .contains(loginConstant.passwordLabel);
  // });
  //
  // it('should go back to portal page after login', () => {
  //   cy.KeycloakLogin(
  //     loginConstant.testCorrectUser.username,
  //     loginConstant.testCorrectUser.password
  //   );
  // });
  //
  // it('should display functions after login', () => {
  //   cy.KeycloakLogin(
  //     loginConstant.testCorrectUser.username,
  //     loginConstant.testCorrectUser.password
  //   );
  //
  //   cy.get('[data-cy=mainMenu]').click();
  //   cy.get('[data-cy=loggedInUsername]')
  //     .should(beVisible)
  //     .contains(loginConstant.testCorrectUser.username);
  //   cy.get('[data-cy=actionAfterLogin]')
  //     .should(beVisible)
  //     .contains(loginConstant.anotherAction);
  //   cy.get('[data-cy=logout]')
  //     .should(beVisible)
  //     .contains(loginConstant.logout);
  // });
  //
  // it('should display error when input wrong user account', () => {
  //   cy.KeycloakLogin(
  //     loginConstant.testWrongUser.username,
  //     loginConstant.testWrongUser.password
  //   );
  //
  //   cy.get('#input-error')
  //     .should(beVisible)
  //     .contains(loginConstant.invalidAccountMessage);
  // });
});
