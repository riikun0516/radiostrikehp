// api/callback.js
export default async function handler(req, res) {
  const { code } = req.query;

  try {
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

    // エラーがある場合は画面にデバッグ情報を出す
    if (data.error) {
      return res.status(500).send(`
        <div style="font-family:sans-serif; padding:20px;">
          <h2 style="color:red;">GitHub認証エラー</h2>
          <p>理由: <strong>${data.error}</strong></p>
          <p>詳細: ${data.error_description || 'なし'}</p>
          <hr>
          <p>Vercelの環境変数を確認してください。</p>
        </div>
      `);
    }

    // 成功時：親画面へ合言葉を送信
    const content = `
      <script>
        (function() {
          const message = "authorization:github:success:" + JSON.stringify({
            token: "${data.access_token}", 
            provider: "github"
          });
          if (window.opener) {
            window.opener.postMessage(message, "https://www.radiostrike.jp");
            setTimeout(() => window.close(), 500);
          } else {
            document.body.innerHTML = "認証成功。このタブを閉じてください。";
          }
        })();
      </script>
      <p style="text-align:center; padding-top:50px;">認証に成功しました！画面を閉じます...</p>
    `;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(content);

  } catch (err) {
    res.status(500).send("サーバーエラーが発生しました: " + err.message);
  }
}