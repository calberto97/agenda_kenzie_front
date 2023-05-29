import styled from 'styled-components';

export const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0 50px;

  display: flex;
  top: 0;

  .left-div {
    width: 40%;
    position: sticky;
    top: 0;
    height: 100vh;
    padding: 20px;

    > div {
      height: 120px;
      background-color: var(--isabelline);
      border: 2px solid var(--pale-dogwood);
      border-radius: 8px;
      padding: 20px;
      

      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--ultra-violet);

      position: relative;

      > svg {
        font-size: 20px;
        align-self: flex-start;
      }

      > svg:last-child {
        position: absolute;
        bottom: 20px;
        right: 20px;
        font-size: 16px;

        transition: 0.4s;

        :hover {
          color: var(--pale-dogwood);
        }
      }

      > div > p:first-child {
        font-weight: bold;
        font-size: 22px;
      }
    }
  }

  .right-div {
    width: 60%;
    height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  .contact-div {
    background-color: var(--color-gray-100);
    height: 90%;
    overflow-y: scroll;

    > .card:nth-child(odd) {
      background-color: var(--color-gray-100);
    }

    > .card:nth-child(even) {
      background-color: var(--isabelline);
    }

    scrollbar-width: auto;
    scrollbar-color: var(--pale-dogwood) var(--color-gray-100);

    ::-webkit-scrollbar {
      width: 16px;
    }

    ::-webkit-scrollbar-track {
      background: var(--color-gray-100);
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--pale-dogwood);
      border-radius: 10px;
      border: 3px solid var(--color-gray-100);
    }
  }

  .no-contacts {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    line-height: 40px;
    margin-left: 16px;

    h1 {
      padding-top: 10px;
    }

    > svg {
      font-size: 40px;
      align-self: center;
    }
  }

  .right-div > .top-bar {
    background-color: var(--pale-dogwood);
    border-radius: 8px 8px 0px 0px;
    padding: 10px;

    > small {
      display: flex;
      justify-content: end;
      gap: 14px;
    }

    svg {
      font-size: 30px;
      color: var(--ultra-violet);
    }
  }

  .right-div > .bottom-bar {
    background-color: var(--pale-dogwood);
    border-radius: 0px 0px 8px 8px;
    padding: 20px;
  }

  .observer {
    /* background-color: red; */
  }
`;
