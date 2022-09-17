import styles from './styles/UserTab.module.sass';

export default function Tab({ handlerClick, tab, name, selected }) {
  return (
    <button
      onClick={() => handlerClick(tab)}
      className={`${styles.tab} ${tab === selected ? styles.selected : null}`}
    >
      {name}
    </button>
  );
}
