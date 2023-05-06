import { signIn, signOut, useSession } from "next-auth/react";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { BsArrowDownCircle } from "react-icons/bs";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="flex h-20 w-full flex-row justify-between">
      <div className="ml-7 flex h-full flex-row items-center justify-center gap-x-2 text-3xl text-white">
        <TfiArrowCircleLeft className="" />
        <TfiArrowCircleRight />
      </div>
      <div className="mr-5 flex w-full flex-row items-center justify-end gap-x-6 text-lg font-semibold text-white">
        {session ? (
          <>
            <span className="bg-black bg-opacity-50 p-2 px-4 rounded-full text-sm flex flex-row"> <BsArrowDownCircle className="mt-1 mr-2"/> Install App</span>
            <div className="aspect-square h-3/6 rounded-full bg-black bg-opacity-50 flex justify-center items-center">
              <div
                className="aspect-square h-4/5 rounded-full"
                style={{
                  backgroundImage: `url('${session.user.image ?? ""}')`,
                  backgroundSize: "cover",
                }}
              />
            </div>
          </>
        ) : (
          <>
            <button className="h-4/6 text-stone-400 hover:scale-105 hover:text-white">
              Premium
            </button>
            <button className="h-4/6 text-stone-400 hover:scale-105 hover:text-white">
              Support
            </button>
            <button className="h-4/6 text-stone-400 hover:scale-105 hover:text-white">
              Download
            </button>
            <div className="m-6 h-3/6 w-px bg-white"></div>
            <button
              className="h-4/6 text-stone-400 hover:scale-105 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                signIn("spotify");
              }}
            >
              Sign Up
            </button>
            <button
              className="h-11 w-32 rounded-full bg-white p-2 text-black hover:scale-105"
              onClick={(e) => {
                e.preventDefault();
                signIn("spotify");
              }}
            >
              Log in
            </button>
          </>
        )}
      </div>
    </header>
  );
};
