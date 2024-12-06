import React from "react";
import { Image } from "@nextui-org/image";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { Button } from "@nextui-org/button";

const NavigationBar = () => {
  return (
    <nav className="flex justify-between items-center px-56 py-8">
      <Image src="/amazon.png" width={120} radius="none" alt="Amazon" />
      <div className="space-x-2">
        {[FaShoppingCart, BsFillPersonFill].map((Icon, index) => (
          <Button key={index} isIconOnly>
            <Icon />
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default NavigationBar;
