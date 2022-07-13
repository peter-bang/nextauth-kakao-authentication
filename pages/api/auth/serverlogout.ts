import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

async function handleLogout(req: NextApiRequest, res: NextApiResponse) {
  // req.query will return {userId:xxxxxxxxx}
  // console.log("request query:", req.query);
  const result = await axios.post(
    `https://kapi.kakao.com/v1/user/logout?target_id_type=user_id&target_id=${req.query.userId}`,
    {},
    {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_AK}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  if (result.status == 200) {
    //logged out successfully
    res.redirect("/");
  }
}

async function serverlogout(req: NextApiRequest, res: NextApiResponse) {
  try {
    await handleLogout(req, res);
  } catch (error) {
    console.error(error);
    res.status(400).end(error);
  }
}

export default serverlogout;
