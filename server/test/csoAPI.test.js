const { default: Item } = require("antd/lib/list/Item")

const csoAPI = require("../src/csoAPI")
const testResponse = require("./csoRegisteredBirthJsonResult.example.json")

describe("CSO API tests", () => {
  describe("Births Registered in Ireland", () => {
    test("should match test response object (2020)", async () => {
      const response = await csoAPI.getBirthNameDataFromCSO()
      expect(response).toMatchObject(testResponse)
    })
  })
  describe("Occurences of Name in Ireland", () => {
    xtest("should match test response object (2021)", async () => {
      const response = await csoAPI.getOccurenceNameDataFromCSO()
      expect(response).toMatchObject(testResponse)
    })
  })
})