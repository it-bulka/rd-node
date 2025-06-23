export const setReqParams = (req, regexUrlMatch) => {
  req.params = regexUrlMatch.groups
}