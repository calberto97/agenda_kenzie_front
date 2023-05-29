import styled from 'styled-components';

export const StyledCard = styled.div`
  width: 100%;
  min-height: 124px;
  padding: 10px 16px;

  font-family: 'Fira Code', monospace;
  color: var(--ultra-violet);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  > div:first-child {
  }

  > div > p:first-child {
    font-weight: bold;
    font-size: 22px;
  }

  .icon-div {
    display: flex;
    gap: 14px;
    font-size: 20px;
    align-self: flex-start;
    margin-top: 6px;
  }
`;
