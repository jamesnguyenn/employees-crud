function deleteStorages(key, id) {
  let data = JSON.parse(localStorage.getItem(key));
  data.forEach((item, index) => {
    if (item.maSinhVien === id) {
      data.splice(index, 1);
    }
  });
  localStorage.setItem(key, JSON.stringify(data));
}

export default deleteStorages;
