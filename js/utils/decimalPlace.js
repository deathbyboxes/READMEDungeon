/*
    * takes a number and inserts a decimal with a number of digits to the left and right of the decimal.
    * @param num {number} - the number you wish to mutate
    * @param [left] {number} - how many digits to the left of the decimal you want
    * @param [right] {number} - how many digits to the right of the decimal you want
    * return {number}
  */
export default function makeDecimal (num, left = 0, right = 0) {
  return +(num * Math.pow(10,left)).toFixed(right)
};