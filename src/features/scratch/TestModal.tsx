import ModalWrapper from "../../App/common/modal/ModalWrapper";
import { useAppSelector } from "../../App/store/store";

function TestModal() {
  const { data } = useAppSelector((state) => state.modals);
  return (
    <ModalWrapper header={'test'}>
      <div>Test data is {data}</div>
    </ModalWrapper>
  );
}
export default TestModal;
