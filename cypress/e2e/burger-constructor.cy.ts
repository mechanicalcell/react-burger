describe('service is available', function() {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should open login page by default', function() {
    let email = 'viacheslavmitskevich@yandex.ru'
    let password = 'Test_Password'
    cy.get('[data-cy="orderButtonTest"]').contains('Оформить заказ').click();
    cy.get('[data-cy="loginPagetext"]').contains('Вход')
    cy.get('[data-cy="loginInput"]').type(email)
    cy.get('[data-cy="passwordInput"]').type(password)
    cy.get('[data-cy="orderLoginButton"]').contains('Войти').click();
    cy.get('[data-cy="orderButtonTest"]').contains('Оформить заказ').click();
    cy.get('[data-cy="orderModalText"]').contains('идентификатор').should('exist');
    cy.get('[data-cy="modalClose"]').click()
    cy.get('[data-cy="bun"]').eq(0).trigger('dragstart');
    cy.get('[data-cy="bunContainer"]').trigger('drop');
    cy.get('[data-cy="ingredient"]').eq(2).trigger('dragstart');
    cy.get('[data-cy="ingredientContainer"]').trigger('drop');
    cy.get('[data-cy="orderButtonTest"]').contains('Оформить заказ').click();
    cy.get('[data-cy="orderModalText"]').contains('идентификатор').should('exist');
  });

});

export {}