var giohang = JSON.parse(sessionStorage.getItem("giohang")) || [];
// Cài đặt mặc định ẩn giỏ hàng
document.getElementById("showcart").style.display = "none";

//var giohang = new Array();

function themvaogiohang(x) {
    // 1. Tìm khung bao quanh sản phẩm
    var boxsp = x.closest('.card-body').parentElement; 
    var parent = x.parentElement;

    // 2. Lấy dữ liệu
    var hinh = boxsp.querySelector('img').src;
    var tensp = boxsp.querySelector('.card-text').innerText;
    // Chuyển giá sang kiểu số để tính toán (loại bỏ chữ "đ" hoặc dấu chấm nếu có)
    var giaText = parent.querySelector('h5').innerText;
    var gia = parseInt(giaText.replace(/\D/g, "")); 
    var soluong = parseInt(parent.querySelector('input[name="soluong"]').value);

    // 3. Tạo mảng sản phẩm và đẩy vào giỏ hàng
    var sp = [hinh, gia, tensp, soluong];
    giohang.push(sp);

    console.log(giohang);
    showcountsp();
    //lưu giỏ hàng
    sessionStorage.setItem("giohang", JSON.stringify(giohang));
   
}

function showcountsp() {
    var countElement = document.getElementById("countsp");
    if(countElement) {
        countElement.innerHTML = giohang.length;
    }
    
}

function showmycart() {
    var ttgh = ""; 
    var tong = 0;
    
    // Duyệt qua mảng giohang để lấy dữ liệu đã lưu
    for (var i = 0; i < giohang.length; i++) {
        // giohang[i][0]: hình, [i][1]: giá, [i][2]: tên, [i][3]: số lượng
        var gia = giohang[i][1];
        var soluong = giohang[i][3];
        var thanhTien = gia * soluong;
        tong += thanhTien;

        ttgh += '<tr>' +
                '<td>' + (i + 1) + '</td>' +
                '<td><img src="' + giohang[i][0] + '" width="50"></td>' +
                '<td>' + giohang[i][2] + '</td>' +
                '<td>' + gia.toLocaleString() + ' đ</td>' +
                '<td>' + soluong + '</td>' +
                '<td>' + thanhTien.toLocaleString() + ' đ</td>' +
                '</tr>';
    }

    ttgh += '<tr>' +
            '<th colspan="5">Tổng đơn hàng</th>' +
            '<th>' + tong.toLocaleString() + ' đ</th>' +
            '</tr>';

    document.getElementById("mycart").innerHTML = ttgh;
}

function showcart() {
    var x = document.getElementById("showcart");
    if (x.style.display === "none" || x.style.display === "") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    showmycart();
}

function showgiohang_trangthanhtoan() {
    var tbody = document.getElementById("mycart-main");
    if (!tbody) return;

    var giohang = JSON.parse(sessionStorage.getItem("giohang")) || [];
    var ttgh = "";
    var tong = 0;

    for (var i = 0; i < giohang.length; i++) {
        var gia = giohang[i][1];
        var sl = giohang[i][3];
        var tt = gia * sl;
        tong += tt;

        ttgh +=
        '<tr>' +
            '<td>' + (i + 1) + '</td>' +
            '<td><img src="' + giohang[i][0] + '" width="50"></td>' +
            '<td>' + giohang[i][2] + '</td>' +
            '<td>' + gia + '</td>' +
            '<td>' + sl + '</td>' +
            '<td>' + tt + '</td>' +
            '<td><button onclick="xoasp(' + i + ')">Xóa</button></td>' +
        '</tr>';
    }

    tbody.innerHTML = ttgh;
}

function xoagiohang() {
    sessionStorage.removeItem("giohang");
    location.reload(); // load lại trang
}
function xoasp(index) {
    var giohang = JSON.parse(sessionStorage.getItem("giohang")) || [];

    giohang.splice(index, 1);

    sessionStorage.setItem("giohang", JSON.stringify(giohang));
    showgiohang_trangthanhtoan();
}
function dathang() {
    var hotenEl     = document.querySelector('input[name="hoten"]');
    var diachiEl    = document.querySelector('input[name="diachi"]');
    var dienthoaiEl = document.querySelector('input[name="dienthoai"]');
    var emailEl     = document.querySelector('input[name="email"]');

    // nếu không tìm thấy input -> form sai / chưa load
    if (!hotenEl || !diachiEl || !dienthoaiEl) {
        alert("Không tìm thấy form đặt hàng!");
        return;
    }

    var hoten     = hotenEl.value.trim();
    var diachi    = diachiEl.value.trim();
    var dienthoai = dienthoaiEl.value.trim();
    var email     = emailEl ? emailEl.value.trim() : "";

    var giohang = JSON.parse(sessionStorage.getItem("giohang")) || [];

    if (giohang.length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }

    if (hoten === "" || diachi === "" || dienthoai === "") {
        alert("Vui lòng điền đầy đủ họ tên, địa chỉ và điện thoại!");
        return;
    }

    alert(
        "ĐẶT HÀNG THÀNH CÔNG!\n\n" +
        "Họ tên: " + hoten + "\n" +
        "Điện thoại: " + dienthoai + "\n" +
        "Địa chỉ: " + diachi + "\n" +
        "Email: " + email
    );

    // xóa giỏ hàng sau khi đặt
    sessionStorage.removeItem("giohang");
    showgiohang_trangthanhtoan();
    // lấy lịch sử đơn hàng cũ (nếu có)
var lichsu = JSON.parse(localStorage.getItem("lichsudonhang")) || [];

// tạo đơn hàng mới
var donhang = {
    hoten: hoten,
    diachi: diachi,
    dienthoai: dienthoai,
    email: email,
    sanpham: giohang,
    thoigian: new Date().toLocaleString()
};

// thêm vào lịch sử
lichsu.push(donhang);

// lưu lại
localStorage.setItem("lichsudonhang", JSON.stringify(lichsu));

}

