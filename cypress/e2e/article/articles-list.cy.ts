describe('Пользователь заходит на страницу со списком статей', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      cy.visit('articles')
    })
  })

  it('и статьи успешно подгружаются', () => {
    cy.getByTestId('ArticleList').should('exist')
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3)
  })

  // стаб это синоним фикстуры - фейковые заранее подготовленные данные
  it('на стабах (фикстурах)', () => {
    // мокаем запрос (т.е. запроса не будет): интерсептор перехватит
    // запрос из beforeEach и вместо него вернет фикстуру articles.json
    cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' })
    cy.getByTestId('ArticleList').should('exist')
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3)
  })

  // если не можем понять причину падения теста (например что то поменялось на
  // backend'e и нас не предупредили об этом), то что бы не засорять отчеты и мочь
  // прогнать релизную регрессию и вмержить pull request, можно его пропустить - skip
  it.skip('Пример заскипанного теста', () => {
    cy.getByTestId('ArticleList').should('exist')
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3)
    cy.get('asfasf').should('exist') // нарочная ошибка
  })
})
