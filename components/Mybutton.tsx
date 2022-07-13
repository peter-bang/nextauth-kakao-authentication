import React, { useEffect } from "react";
import { Button, ButtonProps } from "@mui/material";
import tw, { css, styled } from "twin.macro";

import { useSession, signIn, signOut } from "next-auth/react";

const MyButton = styled(Button)((props: ButtonProps) => [
  tw`
    text-blue-400
    border-purple-500
    text-5xl
    shadow-md
    rounded-xl
`,
]);

const LoginButtonBox: React.FC<any> = () => {
  const { data: session } = useSession();
  useEffect(() => {
    console.log("user:", session?.user);
  }, [session]);
  if (session) {
    return (
      <>
        Signed in as {session.user.id} <br />
        <MyButton
          onClick={() => {
            // console.log("session id:", session.id);
            signOut({
              redirect: true,
              callbackUrl: `http://localhost:3000/api/auth/serverlogout?userId=${session.user.id}`,
            });
          }}
        >
          Sign out
        </MyButton>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <MyButton onClick={() => signIn()}>Sign in</MyButton>
    </>
  );
};

export default LoginButtonBox;
