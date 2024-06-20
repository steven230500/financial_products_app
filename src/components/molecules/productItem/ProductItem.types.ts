import {Product} from '../../../models/Product';

export interface ProductItemProps {
  product: Product;
  onPress: () => void;
}
