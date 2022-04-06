import styles from "./SingleCard.module.css";

const SingleCard = (props) => {
  const handleClick = () => {
    if (!props.disabled) {
      props.onHandleChoice(props.card);
    }
  };

  return (
    <div className={styles.card} key={props.card.id}>
      <div className={props.flipped && styles.flipped}>
        <img className={styles.front} src={props.card.src} alt="card front" />
        <img
          className={styles.back}
          src="/img/cover.png"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
};

export default SingleCard;
