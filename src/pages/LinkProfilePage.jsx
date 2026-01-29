import styles from "./LinkProfilePage.module.css";
import Marquee from "../components/Marquee"
import Deco from "../components/Deco";
import Back from "../components/Back";
import shop from "../assets/shop.svg";
import LikeButtonPlus from "../components/LikeButtonPlus";

function LinkProfilePage(){
  return (
    <div>
      <Marquee className={styles.marquee} />
      <Back className={styles.Back}/>
      <div className={styles.no}>
        <div className={styles.shop}>
        <img src={shop} alt="" />
        </div>
        <div className={styles.nugnri}>너구리 직구상점</div>
        <div className={styles.pumpkin}>@pumpkinraccoon</div>
      </div>
    </div>
  );
}

export default LinkProfilePage;
