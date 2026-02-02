export const GET = async ({ url }) => {
  const code = url.searchParams.get('code');
  const clientID = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientID,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return new Response(`GitHub Error: ${data.error_description}`, { status: 500 });
    }

    // Decap CMSが受け取れる形式のHTML/スクリプトを返却
    const content = `
      <html>
        <body>
          <script>
            (function() {
              function recieveMessage(e) {
                console.log("Recieved message:", e.data);
                if (e.data === "authorizing:github") {
                  window.opener.postMessage(
                    'authorization:github:success:${JSON.stringify({
                      token: data.access_token,
                      provider: 'github',
                    })}',
                    e.origin
                  );
                  window.removeEventListener("message", recieveMessage, false);
                  window.close();
                }
              }
              window.addEventListener("message", recieveMessage, false);
              window.opener.postMessage("authorizing:github", "*");
            })();
          </script>
        </body>
      </html>
    `;

    return new Response(content, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    return new Response(`Server Error: ${error.message}`, { status: 500 });
  }
};