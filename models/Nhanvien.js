function Nhanvien(
  maNhanvien,
  tenNhanvien,
  chucVu,
  luongCoBan,
  gioLam,
  xepLoai
) {
  this.maNhanvien = maNhanvien;
  this.tenNhanvien = tenNhanvien;
  this.chucVu = chucVu;
  this.luongCoBan = luongCoBan;
  this.gioLam = gioLam;
  this.xepLoai = xepLoai;
  this.tongLuong;
  switch (this.chucVu) {
    case "Giám Đốc":
      this.tongLuong = this.luongCoBan * 3;
      break;
    case "Quản Lý":
      this.tongLuong = this.luongCoBan * 2;
      break;
    case "Nhân Viên":
      this.tongLuong = this.luongCoBan * 1;
      break;
    default:
      throw new Error("Invalid data");
  }
}
