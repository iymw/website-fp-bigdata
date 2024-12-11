import React from "react";
import { Image } from "@nextui-org/image";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/react";

const NavigationBar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <nav className="sticky top-0 z-40 flex w-full items-center justify-between bg-white py-8">
      <Image src="/amazon.png" width={120} radius="none" alt="Amazon" />
      <div className="flex items-center gap-2">
        {children}
        {[FaShoppingCart, BsFillPersonFill].map((Icon, index) => (
          <Button
            as={Link}
            href="/create-product"
            isIconOnly
            key={index}
            size="lg"
            target="_blank"
          >
            <Icon />
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default NavigationBar;
