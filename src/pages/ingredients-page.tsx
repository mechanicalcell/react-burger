import IngredientDetails from '../components/ingredient-details/ingredient-details';
import styles from './page-container.module.css';

export function IngredientsPage() {
  return (
    <div className={styles.detail_container}>
      <IngredientDetails />
    </div>
  );
} 