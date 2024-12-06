## Demo 1

- Step 1: cd into **csrf** folder, run `node csrf\website` then access into **http://localhost:3000/login** and click **Login**
- Step 2: open another terminal, run `node csrf\hacker` then access into **http://127.0.0.1:3300** and click button **Click here to hack**
- Step 3: Back to website, F5 and review the result. You can see there are some post appear on your website even if you still perform anythings

---

Solution:

1. Use `sameSite: true`

- **Strict**: sẽ không included cookie vào request từ bên thứ 3, có nghĩa là mọi request từ bên thứ 3 gửi vào website của chúng ta sẽ bị chặn, sử dụng thuộc tính này sẽ làm giảm hiệu năng người dùng từ trang website

  > Ví dụ: you click a link to redirect to your facebook profile (not from facebook), you have to login again if facebook set `sameSite: strict`. This is because you access to facebook from another site, it will not sent along with cookie in the request

- **Lax**: cookie sẽ được gửi cùng với GET request đền từ bên thứ 3 (HEAD, OPTION ...) nhưng chủ yếu chúng ta dùng GET thôi, vì đây được gọi là request an toàn (RFC 7321)

_Prefer link_

- https://betterprogramming.pub/handling-samesite-cookie-attacks-664184811e39
- https://web.dev/samesite-cookies-explained/
- https://jub0bs.com/posts/2021-01-29-great-samesite-confusion/

2. Use `csrf_token`
3. Use `CORS`

---

Conclusion:

- CSRF attacks comprise a good percentage of web-based attacks. It is crucial to be aware of the vulnerabilities that could make our website a potential target for CSRF attacks and prevent these attacks by building proper CSRF defenses in our application.

- A CSRF attack leverages the implicit trust placed in user session cookies by many web applications.
- To prevent CSRF attacks, web applications need to build mechanisms to distinguish a legitimate request from a trusted user of a website from a forged request crafted by an attacker but sent by the trusted user.
- An (anti-)CSRF token is a random string shared between the user’s browser and the web application and is a common type of server-side CSRF protection.

- Common implementation techniques of CSRF Tokens known as :

  - Using `csrf_token`
  - Using `sameSite`, `httpOnly`, or `secure`

- Đặc biệt, nếu website chúng ta không sử dụng cookie ==> please ignore it
