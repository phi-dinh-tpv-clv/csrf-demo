## Demo 1

- Step 1: cd into **csrf** folder, run `node csrf\website` then access into **http://localhost:3000/login** and click **Login**
- Step 2: open another terminal, run `node csrf\hacker` then access into **http://127.0.0.1:3300** and click button **Click here to hack**
- Step 3: Back to website, F5 and review the result. You can see there are some post appear on your website even if you still perform anythings

Solution:

1. Use `sameSite: true`
2. Use `csrf_token`
3. Use `CORS`
