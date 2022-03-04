function scrollToEmployee(id) {
  document.querySelector(`${id}`).scrollIntoView();
  $(`${id}`).style = "box-shadow: 0px 0px 10px #ff0000;";
  setTimeout(() => {
    $(`${id}`).style = "    box-shadow: none";
  }, 500);
}
