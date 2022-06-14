describe('service is available', function() {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should open login page by default', function() {
    let email = ''
    let password = ''
    cy.get('[data-cy="orderButtonTest"]').contains('Оформить заказ').click();
    cy.get('[data-cy="loginPagetext"]').contains('Вход')
    cy.get('[data-cy="loginInput"]').type(email)
    cy.get('[data-cy="passwordInput"]').type(password)
    cy.get('[data-cy="orderLoginButton"]').contains('Войти').click();
    cy.get('[data-cy="orderButtonTest"]').contains('Оформить заказ').click();
    cy.get('[data-cy="orderModalText"]').contains('идентификатор').should('exist');
  });

});

export {}