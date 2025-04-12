import { Input } from "@/components/ui/input";
import React from "react";

interface Formprops {
  name: string;
  placeholder: string;
}

const Form = ({ name, placeholder }: Formprops) => {
  return (
    <div>
      <Input name={name} placeholder={placeholder} />
    </div>
  );
};

export default Form;
