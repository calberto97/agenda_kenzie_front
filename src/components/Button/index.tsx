import { StyledButton } from "./styles";

export interface iButton {
  text: string;
  width?: number;
  isDirty?: boolean;
  isValid?: boolean;
  onClick?: unknown;
}

export const Button = ({ text, width, isDirty, isValid}: iButton) => {
  return (
    <>
      {!isDirty || !isValid ? (
        <StyledButton
          type="submit"
          width={width}
        >
          {text}
        </StyledButton>
      ) : (
        <StyledButton
          type="submit"
          width={width}
        >
          {text}
        </StyledButton>
      )}
    </>
  );
};
