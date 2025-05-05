export const updateProfile = (firstname: string, lastname: string) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click()
  cy.getByTestId('ProfileCard.firstname').clear().type(firstname)
  cy.getByTestId('ProfileCard.lastname').clear().type(lastname)
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click()
}

export const resetProfile = (profileId: string) => cy.request({
  method: 'PUT',
  url: `http://localhost:8000/profile/${profileId}`,
  headers: { authorization: 'asasf' },
  body: {
    id: '4',
    first: 'test',
    lastname: 'user',
    age: 46,
    currency: 'EUR',
    country: 'Ukraine',
    city: 'Dnipro',
    username: 'testuser',
    avatar: 'https://miro.medium.com/v2/resize:fit:640/0*ngAthWxOvKZHvsw9'
  }
})

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>
            resetProfile(profileId: string): Chainable<void>
        }
    }
}
