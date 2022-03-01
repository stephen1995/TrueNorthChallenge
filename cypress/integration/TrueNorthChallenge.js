/// <reference types="Cypress" />

describe('My First Test Suite', function () {

    it('Challengue #1', function () {

        //Given user is in https://www.booking.com/
        //User enters Patagonia in "Where are you going"?  
        //User enters dates between  10th and 15th of next month
        //User clicks on Search
        //User click on filters: 5 stars and Breakfastincluded
        //User verify search results have a review greater than 8
        cy.visit("https://www.booking.com/")
        cy.get("#ss").type("Patagonia")
        cy.get(".xp__dates").click()
        cy.get(".bui-calendar__content > :nth-child(2)").as("nextMonthLocator")
        cy.get("@nextMonthLocator").find("[aria-label*='10']").click()
        cy.get("@nextMonthLocator").find("[aria-label*='15']").click()
        cy.get(".sb-searchbox__button").click()
        cy.contains("Breakfast Included").click({ force: true })
        cy.contains("5 stars").click({ force: true })
        cy.get("h1").should("contain.text", "Patagonia")

        cy.wait(2000);

        cy.get("[data-testid='review-score']>:nth-child(1)").each(($e1, index, $list) => {
            if ($list.length == 0) {
                cy.log("No rooms available")
                return false;
            }
            let text = $e1.text()
            if (text > 8) {

                cy.get("[data-testid=title]").eq(index).then(function (name) {
                    let priceText = name.text()
                    cy.log(priceText + "Score greater than 8")
                })
            }



        })



    })



})