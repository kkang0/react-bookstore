import styled from "styled-components";

function Home() {
  return (
    <HomeStyle>
      <div>Home body</div>
    </HomeStyle>
  );
}

const HomeStyle = styled.div`
  color: ${({ theme }) => theme.color.seconary};
`;

export default Home;
