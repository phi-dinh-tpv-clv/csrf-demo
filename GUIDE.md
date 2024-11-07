### How it work

**All the CSRF attacks almost related about `cookie`. if your site do not using cookie, ignore this vulnerability**

When a user tries to access a site, the browser often automatically includes the credentials in the request, to make the login process more convenient. These credentials may include the user’s session cookie, basic authentication credentials, IP address, and Windows domain credentials.

The risk inherent in this mechanism is that attackers can easily impersonate the user. Once a user passes the site’s identity verification, the site cannot differentiate between a forged request and a legitimate user request.

In a CSRF attack, an attacker assumes the victim’s identity, and uses it to perform actions on behalf of the user, without their consent. Attackers typically follow this process

They use social engineering techniques to persuade the victim to click a link via email, chat message, or similar form of communication.
Either the malicious link itself, or a web page the user visits, triggers a request to the targeted site
The request supposedly comes from the user, and takes advantage of the fact that the user is already signed into the website.
The website acknowledges the request and performs the attacker’s requested action, without the user’s knowledge or consent.
CSRF attacks typically attempt to change server state, but can also be used to gain access to sensitive data. If an attacker successfully performs a CSRF attack against the victim’s account, they can transfer funds, purchase a product, modify account information such as the shipping address, modify the password, or any other action available when the user is signed in.

### Example

1. Delete Users Bằng METHOD **GET**

Giả sử trong hệ thống các bạn có một action xử lý xóa người dùng với url như sau  
 `GET: https://domain.com/delete.php?id=12 HTTP/1.1`  
 Như vậy giả sử một người nào đó biết được URL này thì họ sẽ hack được, và họ sẽ lợi dụng chính admin của hệ thống. Họ sẽ gửi một email với nội dung là một hoặc nhiều thẻ hình ảnh (IMG) với SRC là url đó và mỗi hình có 1 id khác nhau, như vậy nếu admin đọc cái email đó thì trường hợp admin đang login vào hệ thống thì admin đã vô tình xóa đi những user như trong SRC của các hình trên. Đây là một ví dụ nho nhỏ điển hình thôi chứ trong thực tế ai lại đi làm chương trình xóa người dùng mà lại để cái ID to đùng trên kia :D, ấy mà đôi khi những bạn non tay nghề lại mặc phải đấy.

2. Attack by using CRSF token

A CSRF attack works as follows. While accessing the bank account, the user simultaneously browses some other websites. One of the sites ‘www.somesite.com’, contains a hidden form and a piece of JavaScript. As soon as the user visits the webpage, the browser silently submits the hidden form to ‘fictitiousbank.com’. The format and content of the request are exactly the same as the request triggered by the user clicking the submit button in the “pay bill” form provided by the bank. On sending the request, the user’s browser automatically attaches the authentication cookies to the request. Since the session is still active in the server, the request will be processed by the server as issued by the user.

let’s discuss an example of how this vulnerability can be exploited. Imagine your application has a /user/email route that accepts a POST request to change the authenticated user’s email address. Most likely, this route expects an email input field to contain the email address the user would like to begin using.

Without CSRF protection, a malicious website could create an HTML form that points to your application’s/user/email route and submits the malicious user’s own email address

```html
<form action="https://your-application.com/user/email" method="POST">
  <input type="”email”" value="”malicious-email@example.com”" />
</form>

<script>
  document.forms[0].submit();
</script>
```

If the malicious website automatically submits the form when the page is loaded, the malicious user only needs to lure an unsuspecting user of your application to visit their website and their email address will be changed in your application.

To prevent this vulnerability, we need to inspect every incoming POST, PUT, PATCH, or DELETE request for a secret session value that the malicious application is unable to access.
