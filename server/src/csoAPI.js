const getNameData = require(`./csoBabyNameJsonStatParser.js`)

/**
 * Constructs a single data object from the CSO Births Registered In Ireland for Boys and Girls (VSA10 & VSA11)
 * 
 * An example of the data object can be found in the server/test folder
 */
async function getBirthNameDataFromCSO () {
  // fetch raw data from the birth name CSO statbank api
  const fetchBirthRegistrationBoysNames = () => getNameData(
    `https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA10`,
    `Male`,
  )

  const fetchBirthRegistrationGirlsNames = () => getNameData(
    `https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA11`,
    `Female`,
  )
   // await for results
   const res1 = await fetchBirthRegistrationBoysNames()
   const res2 = await fetchBirthRegistrationGirlsNames()
   const birthNames = [...res1.nameData, ...res2.nameData];
    // we are removing any person data that has zero for rank and total. this indicates the CSO didn't record or the data was noted as statistically unreliable
    birthNames.forEach(person => { person.data = person.data.filter(dataObj => dataObj.rank !== 0 && dataObj.total !== 0) })

   return { data: birthNames, lastRecordedYear: res1.lastRecordedYear }
  }

/**
 * Constructs a single data object from the CSO Names In Ireland with 3 or More Occurrences for Boys and Girls (VSA50 & VSA60)
 * 
 * An example of the data object can be found in the server/test folder
 */
async function getNameOccurrenceNameDataFromCSO () {
  // fetch raw data from the birth name CSO statbank api
  const fetchOccurrencesBoysNames = () => getNameData(
    `https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA50`,
    `Male`,
  )

  const fetchOccurrencesGirlsNames = () => getNameData(
    `https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA60`,
    `Female`,
  )
   // await for results
   const res1 = await fetchOccurrencesBoysNames()
   const res2 = await fetchOccurrencesGirlsNames()
   const occurrences = [...res1.nameData, ...res2.nameData];
    // we are removing any person data that has zero for rank and total. this indicates the CSO didn't record or the data was noted as statistically unreliable
    occurrences.forEach(person => { person.data = person.data.filter(dataObj => dataObj.rank !== 0 && dataObj.total !== 0) })

   return { data: occurrences, lastRecordedYear: res1.lastRecordedYear }
  }

  module.exports = { getBirthNameDataFromCSO, getNameOccurrenceNameDataFromCSO }