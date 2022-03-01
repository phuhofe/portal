describe('On portal page search', () => {

  let deathDateRange;
  let birthdateRange;
  let firstNameSearchText;
  let lastNameSearchText;

  before(() => {
    cy.fixture('test-data').then((testData) => {
      deathDateRange = testData.deathDateRange;
      birthdateRange = testData.birthdateRange;
      firstNameSearchText = testData.searchFirstNameText;
      lastNameSearchText = testData.searchLastNameText;
    });
  });

  before(() => {
    cy.visit('');
  });

  describe('When we search by first name Agness, then we expect each search result should have Agness in first name', () => {
    it('', () => {
      // Given
      cy.get('[data-cy=first-name-input]').type(firstNameSearchText);

      // When
      cy.get('[data-cy=search-button]').click();

      // Then
      cy.get('[data-cy=user-list]')
        .find('li')
        .each(() => {
          cy.get('[data-cy=user-item]').contains(firstNameSearchText);
        });
    });
  });

  describe('When we search by last name Hatlem, then we expect each search result should have Hatlem in last name', () => {
    it('', () => {
      // Given
      cy.get('[data-cy=last-name-input]').type(lastNameSearchText);

      // When
      cy.get('[data-cy=search-button]').click();

      // Then
      cy.wait(1000);
      cy.get('[data-cy=user-list]')
        .find('li')
        .each(() => {
          cy.get('[data-cy=user-item]').contains(lastNameSearchText);
        });
    });
  });

  describe('When we search full name Agness Hatlem, then we expect each search result should have Agness Hatlem', () => {
    it('', () => {
      // Given
      cy.get('[data-cy=first-name-input]').clear();
      cy.get('[data-cy=last-name-input]').clear();

      cy.get('[data-cy=first-name-input]').type(firstNameSearchText);
      cy.get('[data-cy=last-name-input]').type(lastNameSearchText);

      // When
      cy.get('[data-cy=search-button]').click();

      // Then
      const fullName = firstNameSearchText + ' ' + lastNameSearchText;
      cy.get('[data-cy=user-list]')
        .find('li')
        .each(() => {
          cy.get('[data-cy=user-item]').should('contain', fullName);
        });
    });
  });

});
