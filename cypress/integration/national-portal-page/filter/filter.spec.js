describe('On filter portal page', () => {

  let mainColor;

  before(() => {
    cy.visit('');
    cy.fixture('portal').then((portalConstant) => {
      mainColor = portalConstant.mainColor;
    });
  });

  describe(`When we filter by memorial page, then we expect each search result's memorial page link should be enabled`, () => {
    it('', () => {
      // Given
      cy.get('[data-cy=filter-selection]').should('be.visible');

      // When
      cy.get('[data-cy=filter-selection]').click();

      cy.get('.ng-dropdown-panel-items')
        .find('.ng-option')
        .should('have.length', 5);

      const memorialPageIndex = 1;
      cy.get('.ng-dropdown-panel-items')
        .find('.ng-option')
        .eq(memorialPageIndex).click();

      // Then
      cy.get('[data-cy=user-list]').each(() => {
        cy.get('[data-cy=memorial-page-link]')
          .should('have.attr', 'href')
          .and('contain', '/memorial_page/');

        cy.get('[data-cy=memorial-page-link]')
          .should('have.css', 'background')
          .and('contain', mainColor);
      });

    });
  });

  describe('When we filter by having donation, then we expect each search result\'s donation link should be enabled', () => {
    it('', () => {
      // Given
      cy.get('[data-cy=filter-selection]').should('be.visible');

      // When
      const haveDonationIndex = 2;
      cy.get('[data-cy=filter-selection]').click();

      cy.get('.ng-dropdown-panel-items')
        .find('.ng-option')
        .should('have.length', 5);

      cy.get('.ng-dropdown-panel-items')
        .find('.ng-option')
        .eq(haveDonationIndex)
        .click();

      // Then
      cy.get('[data-cy=user-list]').each(() => {
        cy.get('[data-cy=donation-link]')
          .should('have.attr', 'href')
          .and('contain', '/donation');

        cy.get('[data-cy=donation-link]')
          .should('have.css', 'background')
          .and('contain', mainColor);
      });
    });
  });
});
