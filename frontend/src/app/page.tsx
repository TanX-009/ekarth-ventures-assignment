import FootballTable from "./components/FootballTable";
import Navbar from "./components/Navbar";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <Navbar />
      <FootballTable />
    </div>
  );
}
