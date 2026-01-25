// api/callback.js
export default async function handler(req, res) {
  const { code } = req.query;
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code,
    }),
  });
  const data = await response.json();

  const content = `
    <!DOCTYPE html>
    <html>
    <body>
      <script>
        const token = "${data.access_token}";
        const provider = "github";
        
        if (window.opener) {
          // 通信相手を制限せずメッセージを送る
          window.opener.postMessage(
            'authorization:github:success:' + JSON.stringify({token, provider}),
            "*"
          );
          window.close();
        }
      </script>
    </body>
    </html>
  `;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(content);
}