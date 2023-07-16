import { signIn, signOut, useSession } from "next-auth/react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { BsArrowDownCircle } from "react-icons/bs";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="flex h-20 w-full flex-row justify-between">
      <div className="ml-7 flex h-full flex-row items-center justify-center gap-x-2 text-3xl text-white">
        <div className=" flex justify-center rounded-full bg-black bg-opacity-50 p-2 align-middle">
          <MdArrowBackIos className=" text-sm " />
        </div>
        <div className="flex justify-center rounded-full bg-black bg-opacity-50 p-2 align-middle">
          <MdArrowForwardIos className="text-sm"/>
        </div>
      </div>
      <div className="mr-5 flex w-full flex-row items-center justify-end gap-x-6 text-lg font-semibold text-white">
        {session ? (
          <>
            <span className="flex flex-row rounded-full bg-black bg-opacity-50 p-2 px-4 text-sm">
              {" "}
              <BsArrowDownCircle className="mr-2 mt-1" /> Install App
            </span>
            <div className="flex aspect-square h-3/6 items-center justify-center rounded-full bg-black bg-opacity-50" onClick={()=>void signOut()}>
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
                void signIn("spotify");
              }}
            >
              Sign Up
            </button>
            <button
              className="h-11 w-32 rounded-full bg-white p-2 text-black hover:scale-105"
              onClick={(e) => {
                e.preventDefault();
                void signIn("spotify");
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
