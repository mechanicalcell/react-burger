import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { useSelector } from 'react-redux';
import { DropTargetMonitor, useDrop } from "react-dnd";
import { useDrag } from "react-dnd";
import { useDispatch } from 'react-redux';
import { useRef, FC, ReactNode, ReactElement, ReactHTMLElement, HTMLAttributes, Ref, JSXElementConstructor, RefObject, MutableRefObject } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { reorderBurgerConstructorAction } from "../../services/actions/copy-arr";
import { useHistory } from 'react-router-dom';
import { TingredientPropTypes } from '../utils/types';
import { TConstructorIngredientsProps,
         TingredientsHandleDrop,
         TBurgerConstructorProps,
         TonClick } from './burger-constructor-types';

const ConstructorIngredients: FC<TConstructorIngredientsProps> = ({item, index, deleteIngredient}) => {
const dispatch = useDispatch();

const { newArrBurgerConstructor } = useSelector((store: any) => store.isNewArr);
const [{ isDrag }, dragRef] = useDrag<{item: TingredientPropTypes; index: number}, void, { isDrag: boolean; }>({
  type: "ingredients",
  item: {item, index},
});

const copyNewArrBurgerConstructor = useMemo(() => [...newArrBurgerConstructor],[newArrBurgerConstructor]);

const hoverIndex = index;
const ingredientsHandleDrop = useCallback<TingredientsHandleDrop>((index) => {
  copyNewArrBurgerConstructor.splice(hoverIndex, 0, copyNewArrBurgerConstructor.splice(index, 1)[0])
  dispatch(reorderBurgerConstructorAction(copyNewArrBurgerConstructor))
}, 
[hoverIndex, dispatch, copyNewArrBurgerConstructor]
);

const [{isHoverIngredients}, ingredientsDropTarget] = useDrop<{item: TingredientPropTypes; index: number}, void, {isHoverIngredients: boolean}>({
  accept: "ingredients",
  drop({item, index}) { 
    ingredientsHandleDrop(index);
  },
  collect: (monitor: DropTargetMonitor) => ({ 
    isHoverIngredients: monitor.isOver(),
  })  
});    

const Ref = dragRef(ingredientsDropTarget(useRef<HTMLDivElement>(null)));
const ref = (Ref: any) => Ref
const borderColor = isHoverIngredients ? 'gray' : 'transparent';

return (
<div>
  {!isDrag && 
  (<div ref={ref(Ref)} 
        className={`${styles.main_list_container} mt-4`}
        style={{ border: '2px solid #4C4CFF', borderColor }}>  
    <div><DragIcon type="primary" /></div> 
    <ConstructorElement 
      text={item.name}
      price={item.price}
      thumbnail={item.image}
      handleClose={() => deleteIngredient(item, item.index)}
    /> 
  </div>)}
</div>     
) 
} 
  
const BurgerConstructor: FC<TBurgerConstructorProps> = ({ onOpen, 
                                                          deleteIngredient, 
                                                          totalPrice,
                                                          ingredientHandleDrop,
                                                          bunHandleDrop }) => {
const { newArrBurgerConstructor, newArrBun } = useSelector((store: any) => store.isNewArr);

const [{isHoverIngredient}, ingredientDropTarget] = useDrop<{item: TingredientPropTypes; index: number}, void, { isHoverIngredient: boolean; }>({
  accept: "ingredient",
  drop({item}) { 
    ingredientHandleDrop(item, item.index);
  },
  collect: (monitor: DropTargetMonitor) => ({ 
    isHoverIngredient: monitor.isOver(),
  })  
});    

const [{isHoverBun}, bunDropTarget] = useDrop<{item: TingredientPropTypes; index: number}, void, { isHoverBun: boolean; }>({
  accept: "bun",
  drop({item}) {
    bunHandleDrop(item, item.index); 
  },
  collect: (monitor: DropTargetMonitor) => ({
    isHoverBun: monitor.isOver(),
  })  
});

const borderColor = isHoverBun || isHoverIngredient ? 'gray' : 'transparent';

const history = useHistory()

const { getResult } = useSelector((store: any) => store.profile);  
const { loginResult } = useSelector((store: any) => store.login);  

const onClick = useCallback<TonClick>(() => {
  if (getResult.user.email === null && loginResult.success === null) { 
      history.replace("/login"); 
    } else {
      if (getResult.user.email || loginResult.success) {  
        onOpen()
      }
  }
}, [getResult, loginResult.success, history, onOpen]);  

return (
  <div className={`${styles.right_section} ml-10 pt-25`}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div ref={bunDropTarget} className='ml-10' style={{ border: '2px solid #4C4CFF',
                                                          height: '80px',
                                                          borderColor }}>
        {newArrBun.map((item: TingredientPropTypes) => item.type === 'bun' && 
        <ConstructorElement
          key={item._id}
          type="top"
          isLocked={true}
          text={`${item.name} (верх)`}
          price={item.price}
          thumbnail={item.image}
        />)} 
      </div>     
      <div ref={ingredientDropTarget} 
           style={{ borderColor }} 
           className={styles.over_flow_container_BC}>
        {newArrBurgerConstructor.map((item: TingredientPropTypes, index: number) => item.type !== 'bun' &&
        <ConstructorIngredients index={index} key={item.key} deleteIngredient={deleteIngredient} item={item} /> )}
      </div> 
      <div className='ml-10'> 
        {newArrBun.map((item: TingredientPropTypes) => item.type === 'bun' &&
        <ConstructorElement 
          key={item._id}
          type="bottom"
          isLocked={true}
          text={`${item.name} (низ)`}
          price={item.price}
          thumbnail={item.image}
        />)} 
      </div>
    </div>
    <div className={`${styles.order_container} mt-10 mb-2`} >
      <p className={`${styles.text_ingredient_container} text text_type_digits-medium mr-2`}>{totalPrice}</p>    
      <p className='mr-10'><CurrencyIcon type="primary" /></p>
      <Button onClick={onClick} type="primary" size="medium" >
        Оформить заказ 
      </Button>
    </div>
  </div>  
)
}

export default BurgerConstructor;
