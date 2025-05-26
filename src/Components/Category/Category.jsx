// imorting react
import React from "react";

// importing data
import { categoryInfos } from "./categoryFullInfos";

// importing components
import CategoryCard from "./CategoryCard";

// importing css
import styles from "./category.module.css";



function Category() {


  return (
    <section className={styles.category__container}>
      {categoryInfos.map((infos) => (
        <CategoryCard key={infos.imgLink} data={infos} />
      ))}
    </section>
  );
}

export default Category;