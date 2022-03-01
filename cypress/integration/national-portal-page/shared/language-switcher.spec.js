describe('Language switcher', () => {

  const flags = [
    {value: 'cs', label: 'Česky'},
    {value: 'da', label: 'Dansk'},
    {value: 'nl', label: 'Nederlands'},
    {value: 'en', label: 'English'},
    {value: 'de', label: 'Deutsch'},
    {value: 'nb', label: 'Norsk'},
    {value: 'sk', label: 'Slovensky'},
    {value: 'sv', label: 'Svenska'},
  ];

  beforeEach(() => {
    cy.visit('');
    cy.get('.spinner-border').should('be.visible');
    cy.wait(3000);
  });

  it('Should display languages support', () => {
    cy.get('[data-cy=language-switcher]').should('be.visible').click();
    cy.get('[data-cy=language-option]').each(element => {
      const option = flags.find(item => item.label = element.text());
      expect(option).to.be.not.null;
    });
  });

  it('Should change label to Deutsch language on select Deutsch language option', () => {
    const deutshIndex = 4;
    cy.get('[data-cy=language-switcher]').should('be.visible').click();
    cy.get('[data-cy=language-option]').eq(deutshIndex).click();

    cy.get('[data-cy=first-name-label]').should("contain", "Vorname");
    cy.get('[data-cy=last-name-label]').should("contain", "Familienname");
    cy.get('[data-cy=birthdate-range-label]').should("contain", "Geboren range");
    cy.get('[data-cy=death-date-range-label]').should("contain", "Gestorben range");
    cy.get('[data-cy=region]').should("contain", "Region");
    cy.get('[data-cy=city]').should("contain", "Stadt");
  });
});
