import {Product} from '../../../models/Product';

export interface ProductListProps {
  products: Product[];
  onProductPress: (productId: string) => void;
}
