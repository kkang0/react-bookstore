import { Banner as IBanner } from "@/models/banner.model";
import styled from "styled-components";

interface Props {
  banner: IBanner;
}

function BannerItem({ banner }: Props) {
  return (
    <BannerItemStyle>
      <div className="img">
        <img src={banner.image} alt={banner.title} />
      </div>
      <div className="content">
        <h2>{banner.title}</h2>
        <p>{banner.description}</p>
      </div>
    </BannerItemStyle>
  );
}

const BannerItemStyle = styled.div`
  flex: 0 0 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;

  .img {
    img {
      width: 100%;
      max-width: 100%;
    }
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: ${({ theme }) => theme.color.primary};
    }

    p {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.color.text};
      margin: 0;
    }
  }
`;

export default BannerItem;
