import styled from 'styled-components';

export const StyledDiv = styled.div`
  width: 400px;
  min-height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--color-gray-100);
  position: relative;
  border-radius: 14px;
  color: var(--ultra-violet);

  .children {
    padding: 0 20px;
    h2 {
      text-align: center;
    }

    form {
      padding: 12px 0;
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 10px;
    }
  }

  .bottom-bar,
  .top-bar {
    background-color: var(--pale-dogwood);
    height: 24px;
    padding: 4px;
  }

  .bottom-bar {
    border-radius: 0px 0px 8px 8px;
    margin-top: 8px;
  }

  .top-bar {
    border-radius: 8px 8px 0px 0px;
    text-align: right;
    margin-bottom: 8px;
  }
`;
