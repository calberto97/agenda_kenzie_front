import styled from 'styled-components';

interface iProps {
  width?: number;
}

export const StyledButton = styled.button<iProps>`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: white;
  cursor: pointer;

  width: ${(props) => (props.width ? props.width + '%' : '')};

  :hover {
    border-color: var(--pale-dogwood);
  }

  :focus,
  :focus-visible {
    outline: 4px auto var(--pale-dogwood);
  }

  &:disabled {
    opacity: 80%;
  }
`;
