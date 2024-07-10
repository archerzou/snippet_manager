import Image from "next/image";

import Navbar from "@/components/Navbar";
import Description from "@/components/Description";

export default function Home() {
  return (
    <div className="poppins">
      <Navbar />
      <Description />
      <div className="w-full flex justify-center items-center mt-10">
        <Image
          src={"/app.jpg"}
          alt="dashboard"
          width={900}
          height={400}
          className="shadow-xl aspect-auto sm:w-auto w-[398px] rounded-lg max-w-full   sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
        />
      </div>
    </div>
  );
}
