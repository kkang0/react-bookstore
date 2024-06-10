import { useLocation } from "react-router-dom";
import styled from "styled-components";

function Order() {
  const location = useLocation();
  const orderDataFromCart = location.state;

  return <OrderStyle></OrderStyle>;
}

const OrderStyle = styled.div``;

export default Order;
