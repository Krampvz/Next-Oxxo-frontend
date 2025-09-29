// app/dashboard/_components/Header.tsx
import Image from "next/image";

export default function Header() {
    return (
        <div className="w-screen h-[10vh] bg-orange-200 flex flex-row items-center px-10">
            <Image 
                src="/0xxo_logo.svg" 
                width={100} 
                height={40} 
                alt="0cso logo" 
                draggable={false} 
            />
        </div>
    );
}