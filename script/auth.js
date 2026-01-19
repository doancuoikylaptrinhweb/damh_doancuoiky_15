// ===== ĐĂNG KÝ =====
function signup(e) {
    e.preventDefault();

    var sdt   = document.getElementById("sdt").value.trim();
    var email = document.getElementById("email").value.trim();
    var hoten = document.getElementById("hoten").value.trim();
    var mk    = document.getElementById("mk").value.trim();

    if (!sdt || !email || !hoten || !mk) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    var users = JSON.parse(sessionStorage.getItem("users")) || [];

    for (var i = 0; i < users.length; i++) {
        if (users[i].sdt === sdt) {
            alert("Số điện thoại đã tồn tại");
            return;
        }
    }

    users.push({
        sdt: sdt,
        email: email,
        hoten: hoten,
        mk: mk
    });

    sessionStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    window.location.href = "dangnhap.html";
}

// ===== ĐĂNG NHẬP =====
function login(e) {
    e.preventDefault();

    var sdt = document.getElementById("sdt").value.trim();
    var mk  = document.getElementById("mk").value.trim();

    var users = JSON.parse(sessionStorage.getItem("users")) || [];

    for (var i = 0; i < users.length; i++) {
        if (users[i].sdt === sdt && users[i].mk === mk) {

            sessionStorage.setItem("userLogin", JSON.stringify({
                sdt: users[i].sdt,
                hoten: users[i].hoten,
                email: users[i].email
            }));

            alert("Đăng nhập thành công!");
            window.location.href = "index.html"; // hoặc trang bạn muốn
            return;
        }
    }

    alert("Sai số điện thoại hoặc mật khẩu");
}

// ===== HIỂN THỊ TÊN (GỌI Ở HEADER) =====
function showUser() {
    var user = JSON.parse(sessionStorage.getItem("userLogin"));
    var box = document.getElementById("user-box");

    if (!box) return;

    if (user) {
        box.innerHTML =
            "Xin chào, <b>" + user.hoten + "</b> | " +
            "<a href='#' onclick='logout()'>Đăng xuất</a>";
    } else {
        box.innerHTML = "<a href='dangnhap.html'>Đăng nhập</a>";
    }
}

// ===== ĐĂNG XUẤT =====
function logout() {
    sessionStorage.removeItem("userLogin");
    window.location.href = "dangnhap.html";
}
function login(e) {
    e.preventDefault();

    var sdt = document.getElementById("sdt").value.trim();
    var mk  = document.getElementById("mk").value.trim();

    var users = JSON.parse(sessionStorage.getItem("users")) || [];

    for (var i = 0; i < users.length; i++) {
        if (users[i].sdt === sdt && users[i].mk === mk) {

            sessionStorage.setItem("userLogin", JSON.stringify(users[i]));

            alert("Đăng nhập thành công!");
            window.location.href = "../index.html";
            return;
        }
    }

    alert("Sai số điện thoại hoặc mật khẩu");
}
sessionStorage.setItem("userLogin", JSON.stringify({
    sdt: users[i].sdt,
    hoten: users[i].hoten,
    email: users[i].email
}));
function showUser() {
    var user = JSON.parse(sessionStorage.getItem("userLogin"));
    var box = document.getElementById("user-box");

    if (!box) return;

    if (user && user.hoten) {
        box.innerHTML =
            'Xin chào, <b>' + user.hoten + '</b> | ' +
            '<a href="#" onclick="logout()">Đăng xuất</a>';
    } else {
        box.innerHTML =
            '<a href="dangnhap.html">Đăng nhập</a>';
    }
}
function logout() {
    sessionStorage.removeItem("userLogin");
    window.location.href = "dangnhap.html";
}
