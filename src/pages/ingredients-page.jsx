import AppHeader from '../components/app-header/app-header';
import IngredientDetails from '../components/ingredient-details/ingredient-details';

export function IngredientsPage() {
  return (
    <>
    <AppHeader />
    <div style={{marginTop: '100px',
         display: 'flex', 
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center'}}>
      <IngredientDetails />
    </div>
    </>
  );
} 