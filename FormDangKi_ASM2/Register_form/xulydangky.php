<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["student_card"];
    $name = $_POST["fullname"];
    $password = $_POST["password"];
    $repassword = $_POST["re-password"];
    $email = $_POST["email"];
    $sothich = isset($_POST["sothich"]) ? implode(', ', $_POST["sothich"]) : "";
    $gioitinh = isset($_POST["gender"]) ? $_POST["gender"] : "";
    $quoctich = $_POST["nationality"];
    $ghichu = $_POST["note"];
    if ($password != $repassword) {
        echo "Lỗi: Mật khẩu không đồng nhất";
        exit;
    }
    if (filter_var($email, FILTER_VALIDATE_EMAIL)==false) {echo "Email sai định dạng<br>";exit; }
    if(isset($_POST["gender"])) {
        $gioitinh = $_POST["gender"];
    } else {
        echo "Vui lòng chọn giới tính.";
        exit;
    }
    if(isset($_POST["sothich"]) && is_array($_POST["sothich"]) && count($_POST["sothich"]) > 0) {
        $sothich = implode(', ', $_POST["sothich"]);
    } else {
        echo "Vui lòng chọn ít nhất một sở thích.";
        exit;
    }
    if(isset($_POST["nationality"])) {
        $quoctich = $_POST["nationality"];
    } else {
        echo "Vui lòng chọn quốc tịch.";
        exit;
    }
    $host = "localhost";
    $dbname = "test";
    $db_username = "root";
    $db_password = "";
    try {
        $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $db_username, $db_password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT * FROM resgesiter WHERE masv = ?");
        $stmt->execute([$username]);
        $existingUsername = $stmt->fetch();

        // Kiểm tra email đã tồn tại hay chưa
        $stmt = $conn->prepare("SELECT * FROM resgesiter WHERE email = ?");
        $stmt->execute([$email]);
        $existingEmail = $stmt->fetch();

        if ($existingUsername) {
            echo "Username đã tồn tại.";
            exit;
        }

        if ($existingEmail) {
            echo "Email đã tồn tại.";
            exit;
        }
        $stmt = $conn->prepare("INSERT INTO resgesiter (masv, ten, pass, email, sothich, gioitinh, quoctich, ghichu) VALUES (?, ?, ?, ?, ?, ?, ?,?)");
        $stmt->execute([$username,$name, $password, $email, $sothich, $gioitinh, $quoctich, $ghichu]);

        echo "Đăng ký thành viên thành công.";
    } catch (PDOException $e) {
        echo "Lỗi: " . $e->getMessage();
    }
}
?>
