import React from 'react';
import css from './Loader.module.css';
import { LoaderCircle } from 'lucide-react';

const Loader = () => (
  <div className={css.flex}><LoaderCircle className={css.loader} size={56}/></div>
  // <div className={css.loader}></div>
);

export default Loader;