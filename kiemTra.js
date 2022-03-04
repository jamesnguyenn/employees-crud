//FUNCTION HANDLE INPUT ERROR

function kiemTraMaNV(maNhanvien, message) {
  let flag = true;
  const errorDOM = $(".error-maNV");
  errorDOM.textContent = "";
  if (
    maNhanvien.length < 4 ||
    maNhanvien.length > 6 ||
    !/^[^a-zA-Z]*$/g.test(maNhanvien)
  ) {
    flag = false;
    errorDOM.textContent = message;
    return flag;
  }
  return flag;
}

function kiemTraTenNV(tenNhanvien, message) {
  let flag = true;
  const errorDOM = $(".error-tenNV");
  errorDOM.textContent = "";
  if (/\d/g.test(tenNhanvien) || tenNhanvien === "") {
    flag = false;
    errorDOM.textContent = message;
    return flag;
  }
  return flag;
}
function kiemTraLuongCoBan(luongCoBan, message) {
  let flag = true;
  const errorDOM = $(".error-luong");
  errorDOM.textContent = "";
  if (luongCoBan < 1000000 || luongCoBan > 20000000 || isNaN(luongCoBan)) {
    flag = false;
    errorDOM.textContent = message;
    return flag;
  }
  return flag;
}

function kiemTraSoGioLam(gioLam, message) {
  let flag = true;
  const errorDOM = $(".error-gio-lam");
  errorDOM.textContent = "";
  if (gioLam < 50 || gioLam > 150 || isNaN(gioLam)) {
    flag = false;
    errorDOM.textContent = message;
    return flag;
  }
  return flag;
}

function checkID(maNhanvien, employees) {
  let flag = true;
  const checkID = employees.find(
    (employee) => employee.maNhanvien === maNhanvien
  );
  if (checkID) {
    flag = false;
    return flag;
  } else {
    return flag;
  }
}
