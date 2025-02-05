import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";

const Form = ({ name, register, placeholder }) => {
  return (
    <div>
      <Input name={name} placeholder={placeholder} />
    </div>
  );
};

export default Form;
