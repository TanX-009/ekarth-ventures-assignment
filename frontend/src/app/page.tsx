import FootballTable from "./components/FootballTable";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.table}>
        <FootballTable />
      </div>
    </div>
  );
}
