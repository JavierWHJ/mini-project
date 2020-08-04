import React, {ReactElement} from 'react';
import { Dropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import classnames from 'classnames';

interface IProps {
    categories: string[],
    selectedCategory?: string,
}

const FilterCategoryComponent = (props: IProps) => {

    const router = useRouter()
    
    const unfilterItem = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        const queryParams = router.query;
        delete queryParams['category'];
        let pathname = '/'

        router.push({pathname: '/', query: queryParams})
    }

    const filterItem = (value: string) => {
        const queryParams = router.query;
        const pathname = value;
        
        if (queryParams['category']){
            delete queryParams['category'];
            shallowRouting(pathname, queryParams)
        } else {
            router.push({pathname: value, query: queryParams})
        }
    }

    const shallowRouting = (pathname: string, queryParams: ParsedUrlQuery) => {
        router.push({
            pathname: router.pathname ,
            query: queryParams,
        }, {
            pathname: '/' + pathname,
            query: queryParams,
        }, { shallow: true})
    }

    interface Options {
        children: ReactElement[],
        onClick?: Function
    }

    const CustomToggle = React.forwardRef(({ children, onClick }: Options, ref) => (
        <>
            <button
                ref={ref! as React.RefObject<HTMLButtonElement>}
                onClick={(e) => {
                    e.preventDefault();
                    if (onClick !== undefined) { onClick(e); }
                }}
                className={classnames("align-items-center")}>
                {(props.categories.find(item => item === props.selectedCategory)) ?
                    <>
                        <span onClick={unfilterItem}> Unfilter </span>
                        <span> { (props.categories.find(item => item === props.selectedCategory)!) } </span>
                    </>
                    :
                    <>
                        <span> Filter Category </span>
                    </>
                }
                <span className={classnames("text-nowrap", "d-none d-md-block")}> 
                {/* <IoIosArrowDown />  */}
                </span>
            </button>
        </>
    ));

    return (
        <Dropdown id={'dropdown-categories'}>
            <Dropdown.Toggle
                id={'dropdown-toggle-categories'}
                as={CustomToggle}
            >
            </Dropdown.Toggle>
            <Dropdown.Menu className={classnames("text-center")}>
                <div className={classnames("row")}>
                    {props.categories.map((item, index) => (
                        <div key={index}>
                            <Dropdown.Item
                                key={index}
                                onClick={() => {filterItem(item)}}
                                className={classnames("text-uppercase","d-flex", "align-items-center", "justify-content-center")}>
                                {item}
                            </Dropdown.Item>
                        </div>
                    ))}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    )

}

export default FilterCategoryComponent