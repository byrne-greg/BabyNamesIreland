import enums from "./enums"

export function isMale (genderEnum) {
  return genderEnum.toUpperCase() === enums.GENDER.MALE
}
export function isFemale (genderEnum) {
  return genderEnum.toUpperCase() === enums.GENDER.FEMALE
}

export function getRankingSuffix (num) {
  if (num % 10 === 1 && num !== 11) { return `st` }
  if (num % 10 === 2 && num !== 12) { return `nd` }
  if (num % 10 === 3 && num !== 13) { return `rd` }
  return `th`
}
