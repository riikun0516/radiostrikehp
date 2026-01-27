// api/callback.js の中身をこちらに差し替え
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
    <script>
      (function() {
        const token = "${data.access_token}";
        const provider = "github";
        
        if (window.opener) {
          // 親ウィンドウへトークンを送信
          window.opener.postMessage(
            'authorization:github:success:' + JSON.stringify({token, provider}),
            window.location.origin
          );
          // 確実に送信されるのを待ってから閉じる
          setTimeout(() => { window.close(); }, 500);
        } else {
          document.body.innerHTML = "ログイン完了。タブを閉じてください。";
        }
      })();
    </script>
  `;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(content);
}