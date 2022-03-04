//BIND QUERYSELECTOR
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//DOM
const maNhanvien = $("#maNhanvien");
const tenNhanvien = $("#tenNhanvien");
const chucVu = $("#chucVu");
const luongCoBan = $("#luongCoBan");
const gioLam = $("#gioLam");
const loaiNhanvien = $("#loaiNhanvien");

// EMPLOYEES APPLICATION
const app = {
  employees: JSON.parse(localStorage.getItem("employees")) || [],
  //Handle addEmployee
  addEmployee: function () {
    const _this = this;
    $("#confirm").addEventListener("click", () => {
      const newEmployee = new Nhanvien(
        maNhanvien.value.trim(),
        tenNhanvien.value.trim(),
        chucVu.value,
        Number(luongCoBan.value.trim()),
        Number(gioLam.value.trim()),
        loaiNhanvien.value
      );
      const kiemTraMNV = kiemTraMaNV(
        maNhanvien.value.trim(),
        "Mã nhân viên phải từ 4-6 ký tự và phải là số"
      );

      const kiemTraTen = kiemTraTenNV(
        tenNhanvien.value.trim(),
        "Tên nhân viên phải là chữ"
      );

      const kiemTraLuong = kiemTraLuongCoBan(
        Number(luongCoBan.value.trim()),
        "Lương cơ bản phải từ 1,000,000 - 20,000,000 và phải là số"
      );

      const kiemTraGio = kiemTraSoGioLam(
        Number(gioLam.value.trim()),
        "Giờ làm phải từ 50 - 150 và phải là số"
      );

      const checkId = checkID(maNhanvien.value.trim(), _this.employees);
      if (!checkId) {
        const idScroll = `#id-${maNhanvien.value.trim()}`;
        toastError("Số ID đã có !");
        scrollToEmployee(idScroll);
      }

      if (kiemTraMNV && kiemTraTen && kiemTraLuong && kiemTraGio && checkId) {
        _this.employees.push(newEmployee);
        localStorage.setItem("employees", JSON.stringify(_this.employees));
        _this.display();
        const newEmployeeID = maNhanvien.value.trim();
        const idScroll = `#id-${newEmployeeID}`;
        scrollToEmployee(idScroll);
        toast("Thêm nhân viên thành công !");
        maNhanvien.value = "";
        tenNhanvien.value = "";
        chucVu.value = "Giám Đốc";
        luongCoBan.value = "";
        gioLam.value = "";
        loaiNhanvien.value = "Nhân Viên Xuất Sắc";
      }
    });
  },
  removeEmployee: function () {
    const _this = this;
    document.body.addEventListener("click", (e) => {
      if (e.target.matches(".btn-danger")) {
        const employeeID =
          e.target.parentNode.parentNode.children[0].textContent;
        const employeeIndex = _this.employees.findIndex(
          (employee) => employee.maNhanvien === employeeID
        );
        this.employees.splice(employeeIndex, 1);
        localStorage.setItem("employees", JSON.stringify(_this.employees));
        this.display();
      }
    });
  },
  handleEditEmployee: function (index) {
    const _this = this;
    $("#edit").addEventListener("click", () => {
      const checkId = checkID(maNhanvien.value.trim(), _this.employees);

      const newEmployee = new Nhanvien(
        maNhanvien.value.trim(),
        tenNhanvien.value.trim(),
        chucVu.value,
        Number(luongCoBan.value.trim()),
        Number(gioLam.value.trim()),
        loaiNhanvien.value
      );
      const kiemTraMNV = kiemTraMaNV(
        newEmployee.maNhanvien,
        "Mã nhân viên phải từ 4-6 ký tự và phải là số"
      );
      const kiemTraTen = kiemTraTenNV(
        newEmployee.tenNhanvien,
        "Tên nhân viên phải là chữ"
      );

      const kiemTraLuong = kiemTraLuongCoBan(
        newEmployee.luongCoBan,
        "Lương cơ bản phải từ 1,000,000 - 20,000,000 và phải là số"
      );

      const kiemTraGio = kiemTraSoGioLam(
        newEmployee.gioLam,
        "Giờ làm phải từ 50 - 150 và phải là số"
      );

      if (kiemTraMNV && kiemTraTen && kiemTraLuong && kiemTraGio) {
        _this.employees.splice(index, 1, newEmployee);
        localStorage.setItem("employees", JSON.stringify(_this.employees));
        _this.display();
        const scrollIntoID = `#id-${maNhanvien.value.trim()}`;
        scrollToEmployee(scrollIntoID);
      }
    });
  },
  editEmployee: function () {
    const _this = this;
    document.body.addEventListener("click", (e) => {
      if (e.target.matches(".btn-primary")) {
        const employeeID =
          e.target.parentNode.parentNode.children[0].textContent;
        const employee = _this.employees.find(
          (employee) => employee.maNhanvien === employeeID
        );
        maNhanvien.value = employee.maNhanvien;
        tenNhanvien.value = employee.tenNhanvien;
        chucVu.value = employee.chucVu;
        luongCoBan.value = employee.luongCoBan;
        gioLam.value = employee.gioLam;
        loaiNhanvien.value = employee.xepLoai;
        if ($("#edit")) $("#edit").remove();
        const templateButton = `<button id="edit" class="btn btn btn-outline-primary">
        Update
      </button>`;
        $(".section-button").insertAdjacentHTML("beforeend", templateButton);
        const employeeIndex = _this.employees.findIndex(
          (employee) => employee.maNhanvien === employeeID
        );
        maNhanvien.focus();
        this.handleEditEmployee(employeeIndex);
      }
    });
  },
  display: function () {
    const tbody = $("#tblNhanvien");
    tbody.innerHTML = "";
    for (let i = this.employees.length - 1; i >= 0; i--) {
      tbody.insertAdjacentHTML(
        "beforeend",
        `<tr id="id-${this.employees[i].maNhanvien}" >
      <td>${this.employees[i].maNhanvien}</td>
      <td>${this.employees[i].tenNhanvien}</td>
      <td>${this.employees[i].chucVu}</td>
      <td>${this.employees[i].luongCoBan}</td>
      <td>${this.employees[i].tongLuong}</td>
      <td>${this.employees[i].gioLam}</td>
      <td>${this.employees[i].xepLoai}</td>
      <td class="btn-edit"><span class="btn btn-primary">Edit</span><span class="btn btn-danger">Remove</span></td>
      </tr>`
      );
    }
  },
  handleClickSearch: function () {
    document.body.addEventListener("mousedown", (e) => {
      if (!$("#search").contains(e.target)) {
        $("#search").classList.remove("active");
        $(".clear-search").classList.remove("active");
        $(".icon").classList.remove("active");
        if ($(".search.active")) {
          $(".search-lists").style = "opacity:1;visibility:visible;";
        } else {
          $(".search-lists").style = "opacity:0;visibility:hidden;";
        }
      }
    });
    $(".icon").addEventListener("click", () => {
      $("#search").classList.toggle("active");
      if ($(".search.active")) {
        $(".search-lists").style = "opacity:1;visibility:visible;";
      } else {
        $(".search-lists").style = "opacity:0;visibility:hidden;";
      }
      $(".icon").classList.toggle("active");
      $(".clear-search").classList.toggle("active");
      $(".clear-search").addEventListener("click", () => {
        $("#search").classList.remove("active");
        $(".clear-search").classList.remove("active");
        $(".icon").classList.remove("active");
        if ($(".search.active")) {
          $(".search-lists").style = "opacity:1;visibility:visible;";
        } else {
          $(".search-lists").style = "opacity:0;visibility:hidden;";
        }
      });
    });
  },
  handleSearch: function () {
    const _this = this;

    $("#mySearch").addEventListener("input", (e) => {
      let searchText = e.target.value.trim().toLowerCase();
      let newEmployees = _this.employees.filter((employee) =>
        employee.tenNhanvien.toLowerCase().includes(searchText)
      );
      console.log(newEmployees);
      const lists = $(".search-lists");
      lists.innerHTML = "";
      newEmployees.forEach((employee) => {
        lists.insertAdjacentHTML(
          "beforeend",
          `<li class="search-item" onclick="scrollToEmployee('#id-${employee.maNhanvien}')">
          <span class="item-id"> ${employee.maNhanvien} </span>
          <span class="item-name"> ${employee.tenNhanvien} </span>
          <span class="item-name"> ${employee.chucVu} </span>
        </li>`
        );
      });
    });
  },
  start: function () {
    this.handleSearch();
    this.handleClickSearch();
    this.editEmployee();
    this.removeEmployee();
    this.addEmployee();
    this.display();
  },
};

app.start();
