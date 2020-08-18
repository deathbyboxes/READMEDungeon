document.addEventListener('DOMContentLoaded', () => {
  fetch("/svgs/processed/svg-defs.svg")
  .then(res => res.text())
  .then(data =>{
    let htmlObj = document.createElement('div');
    htmlObj.innerHTML = data;
    document.querySelector("body").append(htmlObj);
  })
});