import Link from "next/link";

export default function Home() {
  return (
    <div>
      Home
      <Link href={"/signup"}>About Page</Link>
    </div>
  );
}
