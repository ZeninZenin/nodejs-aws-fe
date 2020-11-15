import * as Yup from 'yup';

export type Product = {
  id: string;
  name: string;
  price: number;
  imgUrl?: string;
};

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required(),
  price: Yup.number().required(),
  imgUrl: Yup.string().url(),
  count: Yup.number().required(),
});
