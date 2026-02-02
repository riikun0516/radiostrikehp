export const GET = async ({ redirect }) => {
  const clientID = process.env.GITHUB_CLIENT_ID;
  
  // Client IDが設定されていない場合の安全策
  if (!clientID) {
    return new Response("Error: GITHUB_CLIENT_ID is not defined in environment variables.", { status: 500 });
  }

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=repo,user`;
  
  return redirect(githubAuthUrl);
};