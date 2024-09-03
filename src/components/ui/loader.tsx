import { ThreeDots } from "react-loader-spinner";

export const Loader = () => {
  return (
    <ThreeDots
      visible={true}
      height="40"
      width="40"
      color="#43978E"
      radius="9"
      ariaLabel="three-dots-loading"
    />
  );
};
