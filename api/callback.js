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
  
  // 認証失敗時のエラー処理を追加
  if (data.error) {
    return res.status(401).send(`Auth Error: ${data.error_description}`);
  }

  const content = `
    <!DOCTYPE html>
    <html>
    <body>
      <script>
        const token = "${data.access_token}";
        const provider = "github";
        
        // 親ウィンドウ（管理画面）にトークンを送信
        if (window.opener) {
          window.opener.postMessage(
            'authorization:github:success:' + JSON.stringify({token, provider}),
            window.location.origin
          );
        } else {
          document.body.innerHTML = "ログインに成功しました。このタブを閉じて管理画面に戻ってください。";
        }
      </script>
    </body>
    </html>
  `;
  res.setHeader('Content-Type', 'text/html');
  res.send(content);
}