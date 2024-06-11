import { useLocation, useNavigate } from "react-router-dom";
import Title from "../components/common/Title";
import { CartStyle } from "./Cart";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import InputText from "../components/common/InputText";
import { useForm } from "react-hook-form";
import { Delivery, OrderSheet } from "../models/order.model";
import FindAddressButton from "../components/order/FindAddressButton";
import { order } from "../api/order.api";
import { useAlert } from "../hooks/useAlert";
import axios from "axios";

interface DeliveryForm extends Delivery {
  addressDetail: string;
}

function Order() {
  const { showAlert, showConfirm } = useAlert();
  const location = useLocation();
  const navigate = useNavigate();
  const orderDataFromCart = location.state;
  console.log(orderDataFromCart);
  const { totalQuantity, totalPrice, mainBookTitle } = orderDataFromCart;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DeliveryForm>();

  const handlePay = (data: DeliveryForm) => {
    const orderData: OrderSheet = {
      ...orderDataFromCart,
      delivery: {
        ...data,
        address: `${data.address} ${data.addressDetail}`,
      },
    };

    console.log("orderData:", orderData); // 디버깅 로그 추가

    // showConfirm("주문하시겠습니까?", async () => {
    //   try {
    //     await order(orderData);
    //     showAlert("주문이 완료되었습니다.");
    //     navigate("/orderlist");
    //   } catch (error) {
    //     if (axios.isAxiosError(error) && error.response) {
    //       console.error("Order error:", error.response.data);
    //       showAlert(
    //         `주문 실패: ${
    //           error.response.data.message || "알 수 없는 오류가 발생했습니다."
    //         }`
    //       );
    //     } else {
    //       console.error("Order error:");
    //       showAlert(`주문 실패:`);
    //     }
    //   }
    // });

    showConfirm("주문하시겠습니까?", async () => {
      // 서버로 넘기기
      order(orderData).then(() => {
        showAlert("주문이 완료되었습니다.");
        navigate("/orderlist");
      });
    });
  };

  return (
    <>
      <Title size="large">주문서 작성</Title>
      <CartStyle>
        <div className="content">
          <div className="order-info">
            <Title size="medium" color="text">
              배송 정보
            </Title>
            <form className="delivery">
              <fieldset>
                <label>주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("address", { required: true })}
                  />
                </div>
                <FindAddressButton
                  onCompleted={(address) => {
                    setValue("address", address);
                  }}
                />
              </fieldset>
              {errors.address && (
                <p className="error-text">주소를 입력해주세요</p>
              )}
              <fieldset>
                <label>상세 주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("addressDetail", { required: true })}
                  />
                </div>
              </fieldset>
              {errors.addressDetail && (
                <p className="error-text">상세 주소를 입력해주세요</p>
              )}
              <fieldset>
                <label>수령인</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("recipient", { required: true })}
                  />
                </div>
              </fieldset>
              {errors.recipient && (
                <p className="error-text">수령인을 입력해주세요</p>
              )}
              <fieldset>
                <label>전화번호</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("contact", { required: true })}
                  />
                </div>
              </fieldset>
              {errors.contact && (
                <p className="error-text">전화번호를 입력해주세요</p>
              )}
            </form>
          </div>
          <div className="order-info">
            <Title size="medium" color="text">
              주문 상품
            </Title>
            <strong>
              {mainBookTitle} 등 총 {totalQuantity} 권
            </strong>
          </div>
        </div>
        <div className="summary">
          <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
          <Button
            size="large"
            scheme="primary"
            onClick={handleSubmit(handlePay)}
          >
            결제 하기
          </Button>
        </div>
      </CartStyle>
    </>
  );
}

export default Order;
