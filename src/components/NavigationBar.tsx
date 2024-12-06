import React from "react";
import { Image } from "@nextui-org/image";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { Button } from "@nextui-org/button";

const NavigationBar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <nav className="flex z-50 bg-white sticky top-0 w-full justify-between items-center py-8">
      <Image src="/amazon.png" width={120} radius="none" alt="Amazon" />
      <div className="items-center flex gap-2">
        {children}
        {[FaShoppingCart, BsFillPersonFill].map((Icon, index) => (
          <Button key={index} isIconOnly size="lg">
            <Icon />
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default NavigationBar;
