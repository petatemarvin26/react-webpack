import styles from './App.module.css';

const App: React.FC = () => {
  return <div className={styles.main}>HELLO WORLD! {process.env.VERSION}</div>;
};

export default App;
