import styled from 'styled-components';

export const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  gap: 5%;
  justify-content: space-around;
  align-items: center;

  .right-div {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    > div {
      width: fit-content;
      align-self: flex-end;
      margin-right: 5%;
    }

    h2 {
      font-size: 60px;
      font-weight: 700;
      font-family: 'Fira Code', monospace;
      color: var(--pale-dogwood);
    }

    h2:first-child {
      font-weight: 400;
      font-size: 22px;
      text-align: right;
      margin-bottom: -16px;
    }

    img {
      width: 90%;
      align-self: center;
      /* margin-top: -15%; */
    }
  }

  .left-div {
    width: 35%;
    height: 100vh;
    background-color: var(--color-gray-100);
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.8s;

    :hover {
      background-color: var(--isabelline);
    }
  }

  form {
    padding: 20px 16px;
    min-height: 350px;
    transition: 1.6s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;

    p {
      font-weight: 500;
      align-self: center;
      width: max-content;
      transition: 0.5s;
    }
    p:hover {
      cursor: pointer;
      color: var(--pale-dogwood);
    }
  }
`;
