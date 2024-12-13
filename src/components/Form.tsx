import React from "react";

const Form = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="mx-auto flex h-screen w-10/12 flex-col justify-center sm:w-6/12">
      {children}
    </section>
  );
};

export default Form;
