import React from 'react'
import { connect } from 'react-redux'
import {toggleSearchType} from '../actions/searchActions';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {searchTypes} from '../types'
import {CompareSearch} from '../components/ComparableSearchField'
import {SingleSourceSearchField} from '../components/SingleSourceSearchField'

const SearchTypeSelector: React.FC = (props:any) => {
    const handleToggle = (searchType: number) => {
        props.toggleSearchType(searchType)
    }

    return (
        <Row>
            <Col lg={12}>
                <ul className="searchToggle__controller">
                    <li
                        onClick={() => handleToggle(searchTypes.singleSource)}
                        className={`${props.activeSearchField === searchTypes.singleSource && 'active__search'}`}>
                        
                        Browse available data
                    </li>
                    <li
                        onClick={() => handleToggle(searchTypes.compareSources)}
                        className={`${props.activeSearchField === searchTypes.compareSources && 'active__search'}`}>
                        
                        Compare two data sources
                    </li>
                </ul>
            </Col>

            {props.activeSearchField === searchTypes.compareSources 
                && <CompareSearch />
            }
            {props.activeSearchField === searchTypes.singleSource
                && <SingleSourceSearchField />
            }

        </Row>

    )
}

const mapStateToProps = (state: any) => {
    return {
        activeSearchField: state.searchTypeReducer.searchType
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        toggleSearchType: (_type: number) => {
            dispatch(toggleSearchType(_type))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTypeSelector)
