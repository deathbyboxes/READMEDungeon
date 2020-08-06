export default function strFormatList (list, sep, junc) {
  let str = list.join(sep);
  let i = str.lastIndexOf(sep);

  // if there is more than 1 item in the list, account for
  // grammar and punctuation of a list
  if (list.length > 1) str = str.slice(0, i) + str.slice(i).replace(sep, junc);
  return str;
};