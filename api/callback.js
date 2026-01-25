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

  if (data.error) {
    return res.status(401).send(`Auth Error: ${data.error_description}`);
  }

  // wwwありのドメインを明示的に指定
  const targetOrigin = "https://www.radiostrike.jp";

  const content = `
    <!DOCTYPE html>
    <html>
    <body>
      <script>
        const token = "${data.access_token}";
        const provider = "github";
        
        if (window.opener) {
          // メッセージを親ウィンドウへ送信
          window.opener.postMessage(
            'authorization:github:success:' + JSON.stringify({token, provider}),
            "${targetOrigin}"
          );
          // 少し待ってから閉じる（確実に送信するため）
          setTimeout(() => window.close(), 200);
        } else {
          document.body.innerHTML = "ログイン完了。この画面を閉じてください。";
        }
      </script>
    </body>
    </html>
  `;
  res.setHeader('Content-Type', 'text/html');
  res.send(content);
}