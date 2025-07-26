import img from "/images/header/order.jpg";
import { useScroll, useTransform, motion } from "framer-motion";
const informationVariants = {
  hidden: { x: "100vw", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
      type: "spring",
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
};
const Order = () => {
  return (
    <div>
      <div className="headerimages">
        <img src={img} alt="login" loading="lazy" className="detailImg" />
      </div>
      <motion.div
        className="information"
        variants={informationVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2>this is my order</h2>
      </motion.div>
    </div>
  );
};

export default Order;
