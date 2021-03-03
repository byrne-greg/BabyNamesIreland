const csoAPI = require("../src/csoAPI")

describe("CSO API tests", () => {
  describe("Births Registered in Ireland", () => {
    test("should match test response object (2020)", async () => {
      const testResponse = require("./csoRegisteredBirthJsonResult.example.json")
      const response = await csoAPI.getBirthNameDataFromCSO()
      expect(response).toMatchObject(testResponse)
    })
  })
  describe("Occurrences of Name in Ireland", () => {
    test("should match test response object (2021)", async () => {
      const testResponse = require("./csoNameOccurrenceJsonResult.example.json")
      const response = await csoAPI.getNameOccurrenceNameDataFromCSO()
      expect(response).toMatchObject(testResponse)
    })
  })
})