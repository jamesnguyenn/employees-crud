function toast(message) {
  const template = ` <div class="toast-item">
  <div class="toast-body bg-success text-white">${message}</div>
</div>`;
  $(".toast-lists").insertAdjacentHTML("afterbegin", template);

  setTimeout(() => {
    $(".toast-item").remove();
  }, 2500);
}

function toastError(message) {
  const template = ` <div class="toast-item">
  <div class="toast-body bg-danger text-white">${message}</div>
</div>`;
  $(".toast-lists").insertAdjacentHTML("afterbegin", template);

  setTimeout(() => {
    $(".toast-item").remove();
  }, 2500);
}
