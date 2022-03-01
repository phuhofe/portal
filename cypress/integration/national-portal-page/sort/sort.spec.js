describe('On sort portal page', () => {

  const sortSelectionLength = 3;

  beforeEach(() => {
    cy.visit('');
  });

  it('When we sort by birthdate, then we expect each search result date of birth should be sort descending', () => {
    // Given
    cy.get('[data-cy=sort-selection]').should('be.visible');

    // When
    cy.get('[data-cy=sort-selection]').click();

    const dateOfBirthIndex = 1;
    cy.get('.ng-dropdown-panel-items')
      .find('.ng-option')
      .should('have.length', sortSelectionLength)
      .eq(dateOfBirthIndex)
      .click();

    let birthDateArray = [];

    // Then
    cy.wait(500);
    cy.get('[data-cy=user-birthdate]')
      .each(element => {
        birthDateArray.push(element[0].innerText);
      })
      .then(() => {
        for (let i = 0; i < birthDateArray.length; i++) {
          for (let j = 0; j < birthDateArray - 1; j++) {
            expect(birthDateArray[i]).to.be.gte(birthDateArray[j]);
          }
        }
      });
  });

  it('When we sort by date of death, then we expect each search result date of death should be sort descending', () => {
    // Given
    cy.get('[data-cy=sort-selection]').should('be.visible');

    // When
    cy.get('[data-cy=sort-selection]').click();

    const dateOfDeathIndex = 2;
    cy.get('.ng-dropdown-panel-items')
      .find('.ng-option')
      .should('have.length', sortSelectionLength)
      .eq(dateOfDeathIndex)
      .click();

    cy.wait(500);

    // Then
    const deathDateArray = [];
    cy.get('[data-cy=user-death-date]')
      .each(element => {
        const deathDateString = element[0].innerText.substr(element.text().length - 4);
        deathDateArray.push(deathDateString);
      })
      .then(() => {
        for (let i = 0; i < deathDateArray.length; i++) {
          for (let j = 0; j < deathDateArray - 1; j++) {
            expect(deathDateArray[i]).to.be.gte(deathDateArray[j]);
          }
        }
      });
  });

});
