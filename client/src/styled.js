import styled from "styled-components";

const StyledDiv = styled.div`
  margin-bottom: 3rem !important;
  @media (min-width: 370px) {
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between !important;
    align-items: center !important;
    width: 100% !important;
  }
  @media (max-width: 370px) {
    text-align: center !important;
  }
`;

export { StyledDiv };
