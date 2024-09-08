import React from "react";
import { Title } from "../../atomics/typography/title/title";
import { Input } from "../../atomics/input/Input";
import { Button } from "../../atomics/button/Button";
import "./formsTemplate.css";
import { useForm } from "../../../../node_modules/react-hook-form/dist";

export const FormsTemplate = ({
  onSubmit,
  title,
  inputs,
  buttons,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  console.log("first", errors);

  return (
    <div className="small-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title variant="h1">{title}</Title>
        {inputs.map((input) => {
          return (
            <>
              {input.label && <label htmlFor={input.id}>{input.label}</label>}
              <input
                id={input.id}
                type={input.type}
                name={input.name}
                {...register(input.name, input.rules)}
                style={{ borderColor: errors[input.name] && "red" }}
              />
              {errors[input.name] && (
                <span role="alert" style={{ color: "red" }}>
                  {errors[input.name].message}
                </span>
              )}
            </>
          );
        })}

        <div className="button-container">
          {buttons.map((button) => {
            return (
              <Button
                key={button.buttonText}
                variant={button.variant}
                type={button.type}
                buttonText={button.buttonText}
                onClick={button?.onClick}
                {...button}
              />
            );
          })}
        </div>
      </form>
    </div>
  );
};
