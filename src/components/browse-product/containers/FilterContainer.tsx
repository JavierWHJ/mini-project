import React, {useState, useEffect} from 'react';
import FilterCategoryComponent from '../components/FilterCategoryComponent';
import { useRouter } from 'next/router';

interface IProps {
    categories: string[],
    selectedCategory?: string,
}

const FilterContainer = (props: IProps) => {

    const router = useRouter();
    const [category, setCategory] = useState<undefined | string>(props.selectedCategory)

    useEffect(() => {
        setCategory(router.query.category)
    }, [router.query.category, router.query.price])    

    return (
        <>
            <FilterCategoryComponent categories={props.categories} selectedCategory={category}/>
        </>
    );
}

export default FilterContainer;
