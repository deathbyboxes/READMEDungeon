/*
  * This function will take any array of words or numbers and return a concatenated string
  * of the same values, punctuated with the proper delimiter and conjunction word of your choosing.
  * @param list - the array of strings or numbers you wish to format
  * @param sep - the punctuation you wish to delimit the list e.g. ","
  * @param junc - the conjunction word you wish to end the list with e.g. "and", "or"
  ! note that this formatting does not account for spacing and oxford commas, thus you must
  ! include them within your parameters
  ! e.g. strFormatList(stringArr, ", ", ", and ")
*/

export default function strFormatList (list, sep, junc) {
  let str = list.join(sep);
  let i = str.lastIndexOf(sep);

  // if there is more than 1 item in the list, account for
  // grammar and punctuation of a list
  if (list.length > 1) str = str.slice(0, i) + str.slice(i).replace(sep, junc);
  return str;
};