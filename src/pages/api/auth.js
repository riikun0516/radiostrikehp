export const GET = async ({ redirect }) => {
  const clientID = process.env.GITHUB_CLIENT_ID;
  
  if (!clientID) {
    return new Response("Error: GITHUB_CLIENT_ID is not defined", { status: 500 });
  }

  // ★重要：ここを github.com の絶対URLにする
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=repo,user`;
  
  return redirect(githubAuthUrl);
};