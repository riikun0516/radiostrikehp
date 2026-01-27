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
    <script>
      (function() {
        const token = "${data.access_token}";
        const provider = "github";
        // wwwありを明示
        const target = "https://www.radiostrike.jp";
        
        if (window.opener) {
          window.opener.postMessage(
            'authorization:github:success:' + JSON.stringify({token, provider}),
            target
          );
          window.close();
        }
      })();
    </script>
  `;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(content);
}