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

  // 認証に失敗していたらエラーを表示
  if (data.error) {
    return res.status(401).send(`GitHub Auth Error: ${data.error_description}`);
  }

  const content = `
    <!DOCTYPE html>
    <html>
    <head><title>認証中...</title></head>
    <body>
      <p>認証に成功しました。画面を切り替えています...</p>
      <script>
        (function() {
          const token = "${data.access_token}";
          const message = "authorization:github:success:" + JSON.stringify({token, provider: "github"});
          const target = "https://www.radiostrike.jp";

          if (window.opener) {
            // 親ウィンドウにトークンを送信
            window.opener.postMessage(message, target);
            // 送信完了を待つために少し遅延させて閉じる
            setTimeout(() => {
              window.close();
            }, 1000);
          } else {
            // 親がいない場合はローカルストレージに保存を試みる
            localStorage.setItem('decap-cms-user', JSON.stringify({token, provider: "github"}));
            document.body.innerHTML = "認証完了。このタブを閉じて管理画面をリロードしてください。";
          }
        })();
      </script>
    </body>
    </html>
  `;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(content);
}